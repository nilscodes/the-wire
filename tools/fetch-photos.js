#!/usr/bin/env node
// Find a free-licensed photo of each actor on Wikimedia Commons, save a thumbnail to img/actors/
// and write data/photos.js with the credit its license asks for.
//
//   node tools/fetch-photos.js [--refresh]
//
// Actors already in data/photos.js are kept; --refresh looks them up again. Hand edits to data/photos.js:
//   "Actor": null                        no photo, even with --refresh (a wrong match or a poor picture)
//   "Actor": {"file": "Some file.jpg"}   use this Commons file instead; the next run fetches it and its credit
//   "pos": "50% 20%"                     on any entry: a CSS object-position to move the crop (kept on --refresh)
// Matching is by exact English name on Wikidata, preferring people in The Wire's cast, then actors.
// The person's Wikidata image comes first, then the free lead image of their English Wikipedia article.
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const lib = require('./lib');

const { get, api, sleep } = lib;
const WIRE = 'Q478360';
const ACTOR_JOBS = ['Q33999', 'Q10798782', 'Q10800557', 'Q2259451', 'Q2405480'];
const FILE = path.join(lib.DATA_DIR, 'photos.js');
const IMG_DIR = path.join(lib.ROOT, 'img', 'actors');
const WIDTH = 330;

const refresh = process.argv.includes('--refresh');
const chunks = (a, n) => Array.from({ length: Math.ceil(a.length / n) }, (_, i) => a.slice(i * n, i * n + n));
const slug = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const text = html => String(html || '').replace(/<[^>]*>/g, '')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/\s+/g, ' ').trim();

function loadExisting() {
  if (!fs.existsSync(FILE)) return {};
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(FILE, 'utf8'), sandbox, { filename: FILE });
  return sandbox.window.WIRE_PHOTOS || {};
}

// name -> { file, article } or { miss: reason }
async function wikidata(names) {
  const job = ACTOR_JOBS.map(q => 'wd:' + q).join(' ');
  const query = `SELECT ?name ?p ?img ?article ?inWire ?isActor WHERE {
    VALUES ?name { ${names.map(n => JSON.stringify(n) + '@en').join(' ')} }
    { ?p rdfs:label ?name } UNION { ?p skos:altLabel ?name }
    ?p wdt:P31 wd:Q5.
    OPTIONAL { ?p wdt:P18 ?img }
    OPTIONAL { ?article schema:about ?p; schema:isPartOf <https://en.wikipedia.org/> }
    BIND(EXISTS { wd:${WIRE} wdt:P161 ?p } AS ?inWire)
    BIND(EXISTS { VALUES ?job { ${job} } ?p wdt:P106 ?job } AS ?isActor)
  }`;
  const res = await get('https://query.wikidata.org/sparql', {
    method: 'POST',
    headers: { Accept: 'application/sparql-results+json', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ query }),
  });
  const people = new Map();
  for (const b of (await res.json()).results.bindings) {
    const name = b.name.value, id = b.p.value;
    if (!people.has(name)) people.set(name, new Map());
    const m = people.get(name);
    if (!m.has(id)) m.set(id, {
      score: b.inWire.value === 'true' ? 2 : b.isActor.value === 'true' ? 1 : 0,
      file: b.img && decodeURIComponent(b.img.value.split('/Special:FilePath/')[1]),
      article: b.article && decodeURIComponent(b.article.value.split('/wiki/')[1]).replace(/_/g, ' '),
    });
  }
  const out = new Map();
  for (const name of names) {
    const cands = [...(people.get(name) || new Map()).values()];
    const best = Math.max(-1, ...cands.map(c => c.score));
    const top = cands.filter(c => c.score === best);
    if (!cands.length) out.set(name, { miss: 'not on Wikidata' });
    else if (best === 0) out.set(name, { miss: 'no actor of that name on Wikidata' });
    else if (top.length > 1) out.set(name, { miss: `${top.length} actors of that name on Wikidata` });
    else out.set(name, top[0]);
  }
  return out;
}

// English Wikipedia article title -> free lead image file name
async function leadImages(titles) {
  const out = new Map();
  for (const batch of chunks(titles, 50)) {
    const r = await api('https://en.wikipedia.org/w/api.php', { action: 'query', prop: 'pageimages', piprop: 'name', pilicense: 'free', redirects: '1', titles: batch.join('|') });
    const back = new Map();
    for (const x of [...(r.query.normalized || []), ...(r.query.redirects || [])]) back.set(x.to, back.get(x.from) || x.from);
    for (const p of r.query.pages || []) if (p.pageimage) out.set(back.get(p.title) || p.title, p.pageimage.replace(/_/g, ' '));
  }
  return out;
}

// file name -> { thumb, source, author, license, licenseUrl }, from Commons or (for a few free files) English Wikipedia
async function fileInfo(host, files) {
  const out = new Map();
  for (const batch of chunks(files, 50)) {
    const r = await api(`https://${host}/w/api.php`, {
      action: 'query', prop: 'imageinfo', iiprop: 'url|extmetadata', iiurlwidth: String(WIDTH),
      iiextmetadatafilter: 'Artist|LicenseShortName|LicenseUrl', iiextmetadatalanguage: 'en',
      titles: batch.map(f => 'File:' + f).join('|'),
    });
    const back = new Map((r.query.normalized || []).map(x => [x.to, x.from]));
    for (const p of r.query.pages || []) {
      const ii = p.imageinfo && p.imageinfo[0];
      if (!ii) continue;
      const md = ii.extmetadata || {};
      out.set((back.get(p.title) || p.title).replace(/^File:/, ''), {
        thumb: ii.thumburl || ii.url,
        source: ii.descriptionurl,
        author: text(md.Artist && md.Artist.value) || null,
        license: text(md.LicenseShortName && md.LicenseShortName.value) || null,
        licenseUrl: (md.LicenseUrl && md.LicenseUrl.value) || null,
      });
    }
  }
  return out;
}

(async () => {
  const actors = [];
  for (const S of lib.loadAllSeasons()) for (const c of S.characters) if (c.actor && !actors.includes(c.actor)) actors.push(c.actor);
  const old = loadExisting();
  const pick = a => old[a] && old[a].file;
  const todo = actors.filter(a => old[a] !== null && (refresh || !old[a] || !old[a].src));
  console.log(`${actors.length} actors, ${todo.length} to look up`);

  const found = new Map(), misses = new Map();
  if (todo.length) {
    const search = todo.filter(a => !pick(a));
    const wd = search.length ? await wikidata(search) : new Map();
    const needLead = search.filter(a => wd.get(a).article && !wd.get(a).file);
    const lead = await leadImages(needLead.map(a => wd.get(a).article));
    for (const a of todo) {
      const w = wd.get(a) || {};
      const file = pick(a) || w.file || (w.article && lead.get(w.article));
      if (file) found.set(a, file); else misses.set(a, w.miss || 'no free photo');
    }
    const files = [...new Set(found.values())];
    const info = await fileInfo('commons.wikimedia.org', files);
    const local = await fileInfo('en.wikipedia.org', files.filter(f => !info.has(f)));
    local.forEach((v, k) => info.set(k, v));
    fs.mkdirSync(IMG_DIR, { recursive: true });
    for (const [a, file] of found) {
      const i = info.get(file);
      if (!i || !i.thumb) { found.delete(a); misses.set(a, `image ${file} not found`); continue; }
      const ext = (path.extname(new URL(i.thumb).pathname) || '.jpg').toLowerCase().replace('.jpeg', '.jpg');
      const name = slug(a) + ext;
      fs.writeFileSync(path.join(IMG_DIR, name), Buffer.from(await (await get(i.thumb)).arrayBuffer()));
      const hand = old[a] ? { file: old[a].file, pos: old[a].pos } : {};
      found.set(a, { file: hand.file, src: `img/actors/${name}`, author: i.author, license: i.license, licenseUrl: i.licenseUrl, source: i.source, pos: hand.pos });
      await sleep(250);
    }
  }

  const photos = {};
  for (const a of actors) {
    if (found.has(a)) photos[a] = found.get(a);
    else if (old[a] === null || pick(a) || (!refresh && old[a] && old[a].src)) photos[a] = old[a];
  }
  const lines = Object.entries(photos).map(([a, p]) => `  ${JSON.stringify(a)}: ${JSON.stringify(p)},`);
  fs.writeFileSync(FILE, [
    '/* The Wire: actor photos for the dossier and Arcs headers. These are free-licensed pictures of the actors from',
    '   Wikimedia Commons, not stills from the show, each with the credit its license asks for.',
    '   Generated by tools/fetch-photos.js; see the top of that file for hand edits. */',
    'window.WIRE_PHOTOS = {', ...lines, '};', '',
  ].join('\n'));

  const have = Object.values(photos).filter(Boolean).length;
  console.log(`${have} of ${actors.length} actors have a photo; wrote ${path.relative(lib.ROOT, FILE)}`);
  if (misses.size) console.log('no photo:\n' + [...misses].map(([a, m]) => `  ${a}: ${m}`).join('\n'));
})().catch(e => { console.error('error: ' + e.message); process.exit(1); });
