#!/usr/bin/env node
// Print a research JSON file compactly, so it can be reviewed without loading the whole file.
//
//   node tools/summarize-research.js research/s2/police.json [section]
//
// Sections: characters | relationships | episodes | other (default: an overview of everything).
'use strict';
const fs = require('fs');
const file = process.argv[2];
const section = process.argv[3];
if (!file) { console.error('usage: node tools/summarize-research.js <file.json> [characters|relationships|episodes|other]'); process.exit(2); }
const d = JSON.parse(fs.readFileSync(file, 'utf8'));
const cut = (s, n = 160) => { s = String(s ?? ''); return s.length > n ? s.slice(0, n - 1) + '…' : s; };

function characters() {
  for (const c of d.characters || []) {
    const rank = c.rankStart ? ` | rank ${c.rankStart} -> ${c.rankEnd}` : '';
    console.log(`\n## ${c.id} | ${c.name}${c.alias ? ` "${c.alias}"` : ''} | ${c.actor || '-'} | ${c.faction} / ${c.unit}${c.returning ? ' | returning' : ''}`);
    console.log(`   start: ${cut(c.roleStart || c.assignmentStart)}${rank}`);
    console.log(`   end:   ${cut(c.roleEnd || c.assignmentEnd)} | status ${c.statusEnd}@${c.statusEp} | first ep ${c.firstEp} | reportsTo ${c.reportsTo || '-'}`);
    console.log(`   bio:   ${cut(c.bio, 400)}`);
    (c.keyMoments || []).forEach(m => console.log(`   ep ${m.ep}: ${cut(m.text, 200)}`));
    (c.careerMoves || []).forEach(m => console.log(`   move ep ${m.ep} [${m.kind}${m.realized === false ? ', not realized' : ''}] ${cut(m.text, 180)}`));
  }
}
function relationships() {
  for (const r of d.relationships || []) console.log(`${r.source} -> ${r.target} [${r.type}] ${cut(r.label, 140)}${r.ep ? ` (ep ${r.ep})` : ''}`);
}
function episodes() {
  for (const e of d.episodes || []) {
    console.log(`\n## ${e.number}. ${e.title} | ${e.airDate} | "${e.epigraph}" (${e.epigraphSpeaker}${e.epigraphAttribution ? ' / ' + e.epigraphAttribution : ''}) | ${e.writer} | ${e.director}`);
    console.log(`   ${cut(e.summary, 400)}`);
    (e.events || []).forEach(v => console.log(`   [${v.type}] ${cut(v.text, 200)} {${(v.characters || []).join(', ')}}`));
  }
}
function other() {
  for (const [k, v] of Object.entries(d)) {
    if (['characters', 'relationships', 'episodes'].includes(k)) continue;
    console.log(`\n== ${k}`);
    if (Array.isArray(v)) v.forEach(x => console.log('  - ' + cut(typeof x === 'string' ? x : JSON.stringify(x), 400)));
    else console.log('  ' + cut(JSON.stringify(v), 4000));
  }
}

if (section === 'characters') characters();
else if (section === 'relationships') relationships();
else if (section === 'episodes') episodes();
else if (section === 'other') other();
else {
  console.log(`${file}`);
  for (const [k, v] of Object.entries(d)) console.log(`  ${k}: ${Array.isArray(v) ? v.length + ' items' : typeof v === 'object' && v ? Object.keys(v).join(', ') : typeof v}`);
  if (d.characters) console.log('  ids: ' + d.characters.map(c => c.id).join(' '));
  if (d.uncertainties) { console.log('\n  uncertainties:'); d.uncertainties.forEach(u => console.log('   - ' + cut(u, 300))); }
}
