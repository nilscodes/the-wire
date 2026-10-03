#!/usr/bin/env node
// Validate every data/sN.js on its own and against the other seasons.
//
//   node tools/validate.js [--spoilers <terms.txt> --season <N>] [--ids]
//
// Exit code 1 on errors. Warnings are printed but do not fail the run.
// --ids prints the cross-season id registry (id, name, actor, seasons, last status) to hand to research agents.
// --spoilers checks season N (default: the latest) for terms that must not appear in it.
'use strict';
const fs = require('fs');
const path = require('path');
const lib = require('./lib');
const { SCHEMA } = lib;

const args = process.argv.slice(2);
const flag = name => { const i = args.indexOf(name); return i > -1 ? (args[i + 1] || true) : null; };
const errors = [], warns = [];
const E = (where, m) => errors.push(`${where}: ${m}`);
const W = (where, m) => warns.push(`${where}: ${m}`);

let seasons;
try { seasons = lib.loadAllSeasons(); } catch (e) { console.error('error: ' + e.message); process.exit(1); }
if (!seasons.length) { console.error('error: no data/sN.js files'); process.exit(1); }

const css = fs.readFileSync(path.join(lib.ROOT, 'styles.css'), 'utf8');
const tokenDefined = t => new RegExp(`${t.replace(/[-]/g, '\\-')}\\s*:`).test(css);
const colorOk = v => typeof v === 'string' && (/^#[0-9a-f]{3,8}$/i.test(v) || (v.startsWith('--') && tokenDefined(v)));

// ------------------------------------------------------------ registry mode
if (args.includes('--ids')) {
  const reg = new Map();
  for (const S of seasons) for (const c of S.characters) {
    if (!reg.has(c.id)) reg.set(c.id, { id: c.id, name: c.name, actor: c.actor, seasons: [], last: null });
    const r = reg.get(c.id);
    r.seasons.push(S.season);
    const st = (c.status || []).slice(-1)[0];
    r.last = `S${S.season}: ${c.title}${st ? ` (${st.s}${st.ep ? ' ep ' + st.ep : ''})` : ''}`;
    r.faction = c.faction;
  }
  console.log('id\tname\tactor\tfaction\tseasons\tlast known');
  for (const r of reg.values()) console.log([r.id, r.name, r.actor || '-', r.faction, r.seasons.join(','), r.last].join('\t'));
  const facs = new Map();
  seasons.forEach(S => Object.entries(S.factions).forEach(([id, f]) => facs.set(id, `${f.label} (${f.color})`)));
  console.log('\nfactions: ' + [...facs].map(([id, l]) => `${id} = ${l}`).join('; '));
  const used = new Set([...facs.keys()].map(id => seasons.map(S => S.factions[id] && S.factions[id].color).find(Boolean)));
  console.log('free faction colors: ' + SCHEMA.FACTION_COLORS.filter(c => !used.has(c)).join(', '));
  const lad = new Map();
  seasons.forEach(S => (S.ladders || []).forEach(L => lad.set(L.id, `${L.title}: ${L.rungs.map(r => r.id).join(' > ')}`)));
  console.log('ladders: \n  ' + [...lad.values()].join('\n  '));
  process.exit(0);
}

// ------------------------------------------------------------ per season
for (const S of seasons) {
  const at = `s${S.season}`;
  const maxEp = (S.episodes || []).length;
  const STATUS = { ...SCHEMA.STATUS, ...(S.statuses || {}) };
  const REL = { ...SCHEMA.REL, ...(S.relTypes || {}) };
  if (!S.label) E(at, 'missing label');
  if (!S.year) E(at, 'missing year');
  if (!maxEp) E(at, 'no episodes');

  Object.entries(S.factions || {}).forEach(([id, f]) => {
    if (!f.label || !f.short) E(`${at}.factions.${id}`, 'needs label and short');
    if (!colorOk(f.color)) E(`${at}.factions.${id}`, `color ${f.color} is not a defined token or hex`);
    if (!Array.isArray(f.anchor)) W(`${at}.factions.${id}`, 'no anchor; the Web view will place it automatically');
  });
  if (!S.factions || !S.factions.civilian) W(at, 'no "civilian" faction; it is the fallback color for unknown factions');
  Object.entries(S.relTypes || {}).forEach(([id, d]) => {
    if (!SCHEMA.GROUPS[d.g]) E(`${at}.relTypes.${id}`, `group "${d.g}" must be one of ${Object.keys(SCHEMA.GROUPS).join(', ')}`);
    if (!d.label || !d.out || !d.in) E(`${at}.relTypes.${id}`, 'needs label, out and in');
  });
  Object.entries(S.statuses || {}).forEach(([id, d]) => { if (!d.label) E(`${at}.statuses.${id}`, 'needs a label'); });

  const ids = new Set();
  const ladders = new Map((S.ladders || []).map(L => [L.id, L]));
  for (const L of ladders.values()) {
    const rid = new Set();
    L.rungs.forEach(r => { if (rid.has(r.id)) E(`${at}.ladders.${L.id}`, `duplicate rung ${r.id}`); rid.add(r.id); if (!r.title || !r.blurb) E(`${at}.ladders.${L.id}.${r.id}`, 'needs title and blurb'); });
    if (L.color && !colorOk(L.color)) E(`${at}.ladders.${L.id}`, `color ${L.color} undefined`);
  }
  for (const c of S.characters) {
    const w = `${at}.${c.id}`;
    if (ids.has(c.id)) E(w, 'duplicate id');
    ids.add(c.id);
    if (!/^[a-z0-9_]+$/.test(c.id)) E(w, 'ids must be lowercase letters, digits or _');
    for (const k of ['name', 'short', 'title', 'role', 'bio', 'faction', 'unit']) if (!c[k]) E(w, `missing ${k}`);
    if (![1, 2, 3].includes(c.tier)) E(w, 'tier must be 1, 2 or 3');
    if (c.title && c.title.length > 40) W(w, `title is ${c.title.length} chars; cards fit about 40`);
    if (!S.factions[c.faction]) E(w, `unknown faction ${c.faction}`);
    if (c.firstEp < 1 || c.firstEp > maxEp) E(w, `firstEp ${c.firstEp} outside 1..${maxEp}`);
    let lastEp = -1;
    (c.status || []).forEach(st => {
      if (!STATUS[st.s]) E(w, `unknown status ${st.s}`);
      if (st.ep < 0 || st.ep > maxEp) E(w, `status ep ${st.ep} outside 0..${maxEp}`);
      if (st.ep < lastEp) E(w, 'status entries must be in episode order');
      lastEp = st.ep;
    });
    (c.moments || []).forEach(m => { if (m.ep < 1 || m.ep > maxEp) E(w, `moment ep ${m.ep} outside 1..${maxEp}`); });
    if (c.ladder) {
      const L = ladders.get(c.ladder.track);
      if (!L) E(w, `ladder track ${c.ladder.track} not defined`);
      else {
        const rid = new Set(L.rungs.map(r => r.id));
        if (!rid.has(c.ladder.rung)) E(w, `rung ${c.ladder.rung} not on ${L.id}`);
        (c.ladder.moves || []).forEach(m => {
          if (!SCHEMA.MOVE_DIRS.includes(m.dir)) E(w, `move dir ${m.dir}`);
          if (m.to && !rid.has(m.to)) E(w, `move to unknown rung ${m.to}`);
          if (m.ep < 1 || m.ep > maxEp) E(w, `move ep ${m.ep} outside 1..${maxEp}`);
        });
      }
    }
  }
  S.characters.forEach(c => { if (c.reportsTo && !ids.has(c.reportsTo)) E(`${at}.${c.id}`, `reportsTo ${c.reportsTo} not in season`); });

  const degree = new Map();
  (S.relationships || []).forEach((r, i) => {
    const w = `${at}.relationships[${i}] ${r.s}>${r.t}`;
    if (!ids.has(r.s) || !ids.has(r.t)) E(w, 'unknown person');
    if (!REL[r.type]) E(w, `unknown type ${r.type}`);
    if (!r.label) E(w, 'missing label');
    if (r.ep && (r.ep < 1 || r.ep > maxEp)) E(w, `ep ${r.ep} outside 1..${maxEp}`);
    degree.set(r.s, (degree.get(r.s) || 0) + 1); degree.set(r.t, (degree.get(r.t) || 0) + 1);
  });
  S.characters.forEach(c => { if (!degree.get(c.id)) W(`${at}.${c.id}`, 'has no relationships (floats alone on the Web)'); });

  (S.charts || []).forEach(ch => {
    const w = `${at}.charts.${ch.id}`;
    if (!/^[a-z0-9]+$/.test(ch.id)) E(w, 'chart ids must be lowercase letters and digits (they go in the URL)');
    for (const k of ['tab', 'title', 'kicker', 'blurb', 'faction']) if (!ch[k]) E(w, `missing ${k}`);
    if (ch.faction && !S.factions[ch.faction]) E(w, `unknown faction ${ch.faction}`);
    const parent = new Map();
    ch.edges.forEach(([c, p]) => {
      for (const id of [c, p]) {
        if (id.startsWith('_')) { if (!ch.units || !ch.units[id]) E(w, `unit ${id} not in units`); }
        else if (!ids.has(id)) E(w, `unknown person ${id}`);
      }
      if (parent.has(c)) E(w, `${c} has two parents`);
      parent.set(c, p);
    });
    ch.roots.forEach(r => { if (!r.startsWith('_') && !ids.has(r)) E(w, `unknown root ${r}`); if (parent.has(r)) E(w, `root ${r} also has a parent`); });
    for (const start of parent.keys()) { let x = start, hops = 0; while (parent.has(x) && hops < 50) { x = parent.get(x); hops++; } if (hops >= 50) E(w, `cycle through ${start}`); }
    const reach = new Set(ch.roots);
    let grew = true;
    while (grew) { grew = false; for (const [c, p] of parent) if (reach.has(p) && !reach.has(c)) { reach.add(c); grew = true; } }
    for (const c of parent.keys()) if (!reach.has(c)) E(w, `${c} is not connected to any root`);
    (ch.extra || []).forEach(([a, b]) => { if (!parent.has(a) && !ch.roots.includes(a)) E(w, `extra line from ${a}, who is not on the chart`); if (!parent.has(b) && !ch.roots.includes(b)) E(w, `extra line to ${b}, who is not on the chart`); });
  });
  if (!(S.charts || []).length) E(at, 'no charts');

  (S.episodes || []).forEach((ep, i) => {
    const w = `${at}.episodes[${i}]`;
    if (ep.n !== i + 1) E(w, `episode number ${ep.n}, expected ${i + 1}`);
    for (const k of ['title', 'air', 'summary']) if (!ep[k]) E(w, `missing ${k}`);
    if (ep.air && !/^\d{4}-\d{2}-\d{2}$/.test(ep.air)) E(w, 'air must be YYYY-MM-DD');
    (ep.events || []).forEach(ev => {
      if (!SCHEMA.EVENT[ev.type]) E(w, `event type ${ev.type} must be one of ${Object.keys(SCHEMA.EVENT).join(', ')}`);
      (ev.who || []).forEach(id => { if (!ids.has(id)) W(w, `event mentions ${id}, who is not a character this season (shown without a chip)`); });
    });
  });
  (S.quickPicks || []).forEach(id => { if (!ids.has(id)) E(`${at}.quickPicks`, `unknown ${id}`); });
}

// ------------------------------------------------------------ across seasons
const nums = seasons.map(S => S.season);
nums.forEach((n, i) => { if (n !== i + 1) E('seasons', `seasons must be consecutive from 1; found ${nums.join(', ')}`); });
const firstSeen = new Map();
const deadAt = new Map();
for (const S of seasons) {
  const maxEp = S.episodes.length;
  for (const c of S.characters) {
    const prev = firstSeen.get(c.id);
    if (prev) {
      if (prev.name !== c.name) W(`s${S.season}.${c.id}`, `name changed from "${prev.name}" (S${prev.season})`);
      if (prev.actor && c.actor && prev.actor !== c.actor) W(`s${S.season}.${c.id}`, `actor changed from ${prev.actor} (S${prev.season})`);
      for (const k of ['full', 'alias']) if (prev[k] && !c[k]) W(`s${S.season}.${c.id}`, `${k} "${prev[k]}" from S${prev.season} is missing`);
    } else firstSeen.set(c.id, { name: c.name, actor: c.actor, full: c.full, alias: c.alias, season: S.season });
    if (deadAt.has(c.id) && !c.flashback) E(`s${S.season}.${c.id}`, `died in Season ${deadAt.get(c.id)} but appears again (set flashback: true if that is right)`);
    const last = (c.status || []).filter(st => st.ep <= maxEp).slice(-1)[0];
    if (last && last.s === 'dead' && !deadAt.has(c.id)) deadAt.set(c.id, S.season);
  }
  Object.entries(S.factions).forEach(([id, f]) => {
    const earlier = seasons.find(x => x.season < S.season && x.factions[id]);
    if (earlier && earlier.factions[id].color !== f.color) W(`s${S.season}.factions.${id}`, `color changed from ${earlier.factions[id].color} in S${earlier.season}`);
  });
  (S.ladders || []).forEach(L => {
    const earlier = seasons.filter(x => x.season < S.season).map(x => (x.ladders || []).find(l => l.id === L.id)).filter(Boolean).pop();
    if (!earlier) return;
    const now = new Set(L.rungs.map(r => r.id));
    earlier.rungs.forEach(r => { if (!now.has(r.id)) E(`s${S.season}.ladders.${L.id}`, `rung ${r.id} from an earlier season is missing; keep rung ids stable so Arcs can compare seasons`); });
  });
}
// a faction color used by two different factions is confusing on the Web
const colorOwners = new Map();
seasons.forEach(S => Object.entries(S.factions).forEach(([id, f]) => {
  const o = colorOwners.get(f.color);
  if (o && o !== id) W(`s${S.season}.factions.${id}`, `shares color ${f.color} with ${o}`);
  else colorOwners.set(f.color, id);
}));

// ------------------------------------------------------------ pictures for the detail headers
// data/photos.js: actor photos by actor (tools/fetch-photos.js). data/stills.js: show stills by id, local only (tools/fetch-stills.js).
function checkPictures(file, name, dir, keys, credit) {
  const f = path.join(lib.DATA_DIR, file);
  if (!fs.existsSync(f)) return;
  const sandbox = { window: {} };
  require('vm').runInNewContext(fs.readFileSync(f, 'utf8'), sandbox, { filename: f });
  const used = new Set();
  Object.entries(sandbox.window[name] || {}).forEach(([k, p]) => {
    const w = `${file} ${k}`;
    if (!keys.has(k)) W(w, 'matches no on-screen character');
    if (!p) return;
    if (!p.src) { W(w, `has no image yet; run tools/fetch-${file}`); return; }
    used.add(p.src);
    if (!fs.existsSync(path.join(lib.ROOT, p.src))) E(w, `${p.src} does not exist`);
    credit.forEach(c => { if (!p[c]) E(w, `needs ${c} for the credit`); });
  });
  const abs = path.join(lib.ROOT, dir);
  if (fs.existsSync(abs)) fs.readdirSync(abs).forEach(x => { if (!used.has(`${dir}/${x}`)) W(`${dir}/${x}`, `not used by data/${file}`); });
}
const onScreen = seasons.flatMap(S => S.characters.filter(c => c.actor));
checkPictures('photos.js', 'WIRE_PHOTOS', 'img/actors', new Set(onScreen.map(c => c.actor)), ['source', 'license']);
checkPictures('stills.js', 'WIRE_STILLS', 'img/stills', new Set(onScreen.map(c => c.id)), ['source']);

// ------------------------------------------------------------ spoiler scan
const spoilerFile = flag('--spoilers');
if (spoilerFile) {
  const target = +(flag('--season') || nums[nums.length - 1]);
  const S = seasons.find(x => x.season === target);
  const terms = fs.readFileSync(spoilerFile, 'utf8').split(/\r?\n/).map(t => t.trim()).filter(t => t && !t.startsWith('#'));
  const hits = [];
  const walk = (o, p) => {
    if (typeof o === 'string') { for (const t of terms) if (o.toLowerCase().includes(t.toLowerCase())) hits.push(`${p}: "${t}" in "${o.slice(0, 120)}"`); }
    else if (o && typeof o === 'object') for (const k in o) walk(o[k], `${p}.${k}`);
  };
  walk(S, `s${target}`);
  console.log(`spoiler scan of season ${target}: ${terms.length} terms, ${hits.length} hits (review each one by hand; names can collide)`);
  hits.forEach(h => console.log('  ' + h));
}

// ------------------------------------------------------------ report
seasons.forEach(S => console.log(`s${S.season}: ${S.characters.length} characters, ${S.relationships.length} relationships, ${S.charts.length} charts, ${(S.ladders || []).length} ladders, ${S.episodes.length} episodes`));
warns.forEach(w => console.log('warn: ' + w));
errors.forEach(e => console.error('error: ' + e));
console.log(`\n${errors.length} errors, ${warns.length} warnings`);
process.exit(errors.length ? 1 : 0);
