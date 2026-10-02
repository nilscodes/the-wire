#!/usr/bin/env node
// Prepare the page for publishing as a claude.ai Artifact.
//
//   node tools/make-artifact.js <outDir>
//
// The Artifact host supplies its own <!doctype>/<html>/<head>/<body> wrapper, so this writes
// <outDir>/index.html without them and prints the `files` map for the Artifact publish call.
'use strict';
const fs = require('fs');
const path = require('path');
const lib = require('./lib');

const out = process.argv[2];
if (!out) { console.error('usage: node tools/make-artifact.js <outDir>'); process.exit(2); }
fs.mkdirSync(out, { recursive: true });

const html = fs.readFileSync(lib.INDEX, 'utf8');
const head = html.split('<head>')[1].split('</head>')[0].split(/\r?\n/)
  .filter(l => !/<meta charset|<meta name="viewport"/.test(l)).join('\n').trim();
const body = html.split('<body>')[1].split('</body>')[0].trim();
const page = path.join(out, 'index.html');
fs.writeFileSync(page, head + '\n' + body + '\n');

const rel = f => path.join(lib.ROOT, f).replace(/\\/g, '/');
const files = { 'styles.css': rel('styles.css'), 'schema.js': rel('schema.js'), 'app.js': rel('app.js') };
lib.seasonFiles().forEach(({ n }) => { files[`data/s${n}.js`] = rel(`data/s${n}.js`); });
console.log('page: ' + page.replace(/\\/g, '/'));
console.log('files: ' + JSON.stringify(files, null, 2));
