#!/usr/bin/env node
// Build data/sN.js from research/sN/: the subagents' research JSON plus the hand-written curation.js.
//
//   node tools/build-season.js <N> [--spoilers <terms.txt>] [--dry-run]
//
// research/sN/curation.js decides everything the research can't: who is in the season, tiers,
// short card titles, status timelines, ladder positions, org charts, ladders, colors, and which
// research claims to drop or relabel. See .claude/skills/add-season/references/data-contract.md.
'use strict';
const fs = require('fs');
const path = require('path');
const lib = require('./lib');

const args = process.argv.slice(2);
const n = +args[0];
if (!n) { console.error('usage: node tools/build-season.js <season number> [--spoilers terms.txt] [--dry-run]'); process.exit(2); }
const flag = name => { const i = args.indexOf(name); return i > -1 ? (args[i + 1] || true) : null; };
const dryRun = args.includes('--dry-run');
const spoilerFile = flag('--spoilers');

const dir = path.join(lib.RESEARCH_DIR, `s${n}`);
const curFile = path.join(dir, 'curation.js');
if (!fs.existsSync(curFile)) { console.error(`missing ${path.relative(lib.ROOT, curFile)}`); process.exit(2); }
const cur = require(curFile);
const readJson = f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));

const errors = [];
const warn = [];
const err = m => errors.push(m);

// ------------------------------------------------------------ research sources
const factionMap = Object.assign({ bpd: 'police', fbi: 'police', legal: 'law', politics: 'law' }, cur.factionMap || {});
const sources = (cur.sources || []).map(s => ({ ...s, data: readJson(s.file), mapId: id => (id && (s.idMap || {})[id]) || id }));
const research = new Map(); // first source wins
for (const s of sources) for (const c of s.data.characters || []) {
  const id = s.mapId(c.id);
  if (!research.has(id)) research.set(id, { ...c, id, _src: s });
}

// ------------------------------------------------------------ characters
const cleanName = name => String(name || '').replace(/\s*["“][^"”]*["”]\s*/g, ' ').replace(/\s+/g, ' ').trim();
const characters = (cur.characters || []).map(([id, o]) => {
  const r = research.get(id) || {};
  if (!research.has(id) && !o.name) err(`character ${id}: no research record and no name in curation`);
  const mapRef = ref => (ref && r._src ? r._src.mapId(ref) : ref) || null;
  const c = {
    id,
    name: o.name || cleanName(r.name),
    full: o.full || null,
    alias: o.alias !== undefined ? o.alias : null,
    short: o.short,
    initials: o.initials,
    actor: o.actor !== undefined ? o.actor : (r.actor || null),
    faction: o.faction || factionMap[r.faction] || r.faction,
    unit: o.unit || r.unit,
    tier: o.tier,
    title: o.title,
    role: o.role || r.roleStart || [r.rankStart, r.assignmentStart].filter(Boolean).join(', '),
    roleEnd: o.roleEnd || r.roleEnd || [r.rankEnd, r.assignmentEnd].filter(Boolean).join(', ') || null,
    reportsTo: o.reportsTo !== undefined ? o.reportsTo : mapRef(r.reportsTo),
    firstEp: o.firstEp || r.firstEp || 1,
    status: o.status || [],
    bio: o.bio || r.bio,
    moments: o.moments || (r.keyMoments || []).map(m => ({ ep: m.ep, text: m.text })),
  };
  for (const k of ['ladder', 'pathNote', 'offLadder', 'card']) if (o[k] !== undefined) c[k] = o[k];
  for (const k of ['initials', 'full', 'alias']) if (!c[k]) delete c[k];
  return c;
});
const ids = new Set(characters.map(c => c.id));
if (ids.size !== characters.length) err('duplicate character ids in curation.characters');
characters.forEach(c => { if (c.reportsTo && !ids.has(c.reportsTo)) { warn.push(`${c.id}: reportsTo ${c.reportsTo} is not in this season, dropped`); c.reportsTo = null; } });

// ------------------------------------------------------------ relationships
const R = cur.relationships || {};
const key = r => `${r.s}>${r.t}>${r.type}`;
let rels = [];
for (const s of sources) for (const r of s.data.relationships || []) {
  rels.push({ s: s.mapId(r.source), t: s.mapId(r.target), type: r.type, label: r.label, ep: r.ep });
}
const drop = new Set(R.drop || []), dropEp = new Set(R.dropEp || []), dedupe = new Set(R.dedupe || []);
const seenKeys = new Set();
rels = rels.filter(r => {
  if (!ids.has(r.s) || !ids.has(r.t)) return false;
  if (drop.has(key(r)) || dropEp.has(`${key(r)}>${r.ep}`)) return false;
  if (dedupe.has(key(r))) { if (seenKeys.has(key(r))) return false; seenKeys.add(key(r)); }
  return true;
});
rels.forEach(r => {
  if (R.label && R.label[key(r)]) r.label = R.label[key(r)];
  const p = R.patch && R.patch[key(r)];
  if (p) Object.entries(p).forEach(([k, v]) => { if (v === null) delete r[k]; else r[k] = v; });
});
(R.add || []).forEach(([s, t, type, label, ep]) => rels.push({ s, t, type, label, ep }));
const relTypes = { ...lib.SCHEMA.REL, ...(cur.relTypes || {}) };
rels.forEach(r => {
  if (!relTypes[r.type]) err(`relationship ${key(r)}: unknown type "${r.type}" (add it to curation.relTypes)`);
  if (!ids.has(r.s) || !ids.has(r.t)) err(`relationship ${key(r)}: unknown person`);
  if (!r.ep) delete r.ep;
});

// ------------------------------------------------------------ episodes
let episodes = [];
if (cur.episodes) {
  const E = cur.episodes;
  const data = readJson(E.file);
  const mapId = id => (E.idMap || {})[id] || id;
  const teleplay = w => { if (!w) return null; const m = String(w).match(/Teleplay:\s*(.+)$/); return m ? m[1].trim() : String(w).replace(/^Written by\s*/, '').trim(); };
  episodes = data.episodes.map(e => ({
    n: e.number,
    title: e.title,
    epigraph: e.epigraph,
    speaker: e.epigraphAttribution || (E.speakers || {})[e.epigraphSpeakerId] || e.epigraphSpeaker,
    air: e.airDate,
    writer: teleplay(e.writer),
    director: e.director,
    summary: e.summary,
    events: (e.events || []).map(v => ({ type: v.type, text: v.text, who: (v.characters || []).map(mapId) })),
  }));
}

// ------------------------------------------------------------ assemble
const S = {
  season: n,
  label: cur.label,
  year: cur.year,
  copy: cur.copy,
  factions: cur.factions,
  relTypes: cur.relTypes,
  statuses: cur.statuses,
  quickPicks: cur.quickPicks || [],
  characters,
  relationships: rels,
  charts: cur.charts || [],
  ladders: cur.ladders || [],
  episodes,
};
for (const k of Object.keys(S)) if (S[k] === undefined) delete S[k];

// quick structural checks; tools/validate.js does the full cross-season pass
if (!S.label || !S.year) err('curation needs label and year');
if (!S.factions) err('curation needs factions');
characters.forEach(c => {
  if (!c.short || !c.title || !c.tier) err(`character ${c.id}: short, title and tier are required`);
  if (S.factions && !S.factions[c.faction]) err(`character ${c.id}: faction "${c.faction}" is not in curation.factions`);
  if (!c.bio) err(`character ${c.id}: no bio`);
});
if (!episodes.length) err('no episodes (curation.episodes.file)');

if (spoilerFile) {
  const terms = fs.readFileSync(spoilerFile, 'utf8').split(/\r?\n/).map(t => t.trim()).filter(t => t && !t.startsWith('#'));
  const hits = [];
  const walk = (o, p) => {
    if (typeof o === 'string') { for (const t of terms) if (o.toLowerCase().includes(t.toLowerCase())) hits.push(`${p}: "${t}" in ${o.slice(0, 140)}`); }
    else if (o && typeof o === 'object') for (const k in o) walk(o[k], `${p}.${k}`);
  };
  walk(S, `s${n}`);
  console.log(`spoiler scan: ${terms.length} terms, ${hits.length} hits`);
  hits.forEach(h => console.log('  ' + h));
}

warn.forEach(w => console.log('warn: ' + w));
if (errors.length) { errors.forEach(e => console.error('error: ' + e)); console.error(`\n${errors.length} errors, nothing written`); process.exit(1); }

console.log(`season ${n}: ${characters.length} characters, ${rels.length} relationships, ${S.charts.length} charts, ${S.ladders.length} ladders, ${episodes.length} episodes`);
if (dryRun) { console.log('dry run: nothing written'); process.exit(0); }
const file = lib.writeSeasonFile(S);
console.log(`wrote ${path.relative(lib.ROOT, file)} (${fs.statSync(file).size} bytes)`);
console.log('index.html seasons:', lib.syncIndexScripts().join(', '));
console.log('next: node tools/validate.js');
