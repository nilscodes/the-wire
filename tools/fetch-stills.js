#!/usr/bin/env node
// Fetch one still per on-screen character from The Wire Wiki (thewire.fandom.com): the image at the top of
// the character's wiki page. Saves a thumbnail to img/stills/<id> and writes data/stills.js.
//
//   node tools/fetch-stills.js [--refresh]
//
// The stills are HBO's and not free-licensed, so data/stills.js and img/stills/ stay out of git (.gitignore).
// Spoilers: the wiki does not say which season a picture is from. Check every new still (rank, uniform,
// clothes, setting) against the character's first season before keeping it.
// Characters already in data/stills.js are kept; --refresh looks them up again. Hand edits to data/stills.js:
//   "id": null                     no still, even with --refresh (a spoiler or a poor picture)
//   "id": {"page": "Wiki page"}    use the image of this wiki page (when the character's name finds no page)
//   "id": {"file": "Some.jpg"}     use this wiki file
//   "pos": "50% 20%"               on any entry: a CSS object-position to move the crop (kept on --refresh)
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const lib = require('./lib');
const { get, api, sleep } = lib;

const WIKI = 'https://thewire.fandom.com/api.php';
const FILE = path.join(lib.DATA_DIR, 'stills.js');
const IMG_DIR = path.join(lib.ROOT, 'img', 'stills');
const WIDTH = 330;
const EXT = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/gif': '.gif' };

const refresh = process.argv.includes('--refresh');
const chunks = (a, n) => Array.from({ length: Math.ceil(a.length / n) }, (_, i) => a.slice(i * n, i * n + n));

function loadExisting() {
  if (!fs.existsSync(FILE)) return {};
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(FILE, 'utf8'), sandbox, { filename: FILE });
  return sandbox.window.WIRE_STILLS || {};
}

// wiki page title -> its lead image file name
async function pageImages(titles) {
  const out = new Map();
  for (const batch of chunks([...new Set(titles)], 50)) {
    const r = await api(WIKI, { action: 'query', prop: 'pageimages', piprop: 'name', redirects: '1', titles: batch.join('|') });
    const back = new Map();
    for (const x of [...(r.query.normalized || []), ...(r.query.redirects || [])]) back.set(x.to, back.get(x.from) || x.from);
    for (const p of r.query.pages || []) if (p.pageimage) out.set(back.get(p.title) || p.title, p.pageimage.replace(/_/g, ' '));
  }
  return out;
}

// wiki file name -> { thumb, source }
async function fileInfo(files) {
  const out = new Map();
  for (const batch of chunks(files, 50)) {
    const r = await api(WIKI, { action: 'query', prop: 'imageinfo', iiprop: 'url', iiurlwidth: String(WIDTH), titles: batch.map(f => 'File:' + f).join('|') });
    const back = new Map((r.query.normalized || []).map(x => [x.to, x.from]));
    for (const p of r.query.pages || []) {
      const ii = p.imageinfo && p.imageinfo[0];
      if (ii) out.set((back.get(p.title) || p.title).replace(/^File:/, ''), { thumb: ii.thumburl || ii.url, source: ii.descriptionurl });
    }
  }
  return out;
}

(async () => {
  const chars = new Map();
  for (const S of lib.loadAllSeasons()) for (const c of S.characters) if (c.actor && !chars.has(c.id)) chars.set(c.id, c);
  const old = loadExisting();
  const hand = id => old[id] || {};
  const todo = [...chars.keys()].filter(id => old[id] !== null && (refresh || !old[id] || !old[id].src));
  console.log(`${chars.size} characters on screen, ${todo.length} to look up`);

  const found = new Map(), misses = new Map();
  if (todo.length) {
    const titles = id => hand(id).page ? [hand(id).page] : [...new Set([chars.get(id).full, chars.get(id).name].filter(Boolean))];
    const lead = await pageImages(todo.filter(id => !hand(id).file).flatMap(titles));
    for (const id of todo) {
      const page = titles(id).find(t => lead.has(t));
      const file = hand(id).file || (page && lead.get(page));
      if (file) found.set(id, { page: hand(id).file ? hand(id).page : page, file });
      else misses.set(id, `no wiki page image for ${titles(id).join(' / ')}`);
    }
    const info = await fileInfo([...new Set([...found.values()].map(f => f.file))]);
    fs.mkdirSync(IMG_DIR, { recursive: true });
    for (const [id, f] of found) {
      const i = info.get(f.file);
      if (!i || !i.thumb) { found.delete(id); misses.set(id, `wiki file ${f.file} not found`); continue; }
      const res = await get(i.thumb);
      const ext = EXT[(res.headers.get('content-type') || '').split(';')[0]] || path.extname(f.file).toLowerCase() || '.jpg';
      fs.readdirSync(IMG_DIR).filter(x => path.parse(x).name === id).forEach(x => fs.unlinkSync(path.join(IMG_DIR, x)));
      fs.writeFileSync(path.join(IMG_DIR, id + ext), Buffer.from(await res.arrayBuffer()));
      found.set(id, { page: f.page, file: f.file, src: `img/stills/${id}${ext}`, source: i.source, pos: hand(id).pos });
      await sleep(250);
    }
  }

  const stills = {};
  for (const id of chars.keys()) {
    if (found.has(id)) stills[id] = found.get(id);
    else if (old[id] === null || hand(id).page || hand(id).file || (!refresh && hand(id).src)) stills[id] = old[id];
  }
  const lines = Object.entries(stills).map(([id, s]) => `  ${JSON.stringify(id)}: ${JSON.stringify(s)},`);
  fs.writeFileSync(FILE, [
    '/* The Wire: one still per character (by id) for the dossier and Arcs headers, from The Wire Wiki (thewire.fandom.com).',
    '   The pictures are HBO\'s and not free-licensed, so this file and img/stills/ stay out of git (see .gitignore).',
    '   Generated by tools/fetch-stills.js; see the top of that file for hand edits and the spoiler check. */',
    'window.WIRE_STILLS = {', ...lines, '};', '',
  ].join('\n'));

  const have = Object.values(stills).filter(s => s && s.src).length;
  console.log(`${have} of ${chars.size} characters have a still; wrote ${path.relative(lib.ROOT, FILE)}`);
  if (misses.size) console.log('no still:\n' + [...misses].map(([id, m]) => `  ${id}: ${m}`).join('\n'));
})().catch(e => { console.error('error: ' + e.message); process.exit(1); });
