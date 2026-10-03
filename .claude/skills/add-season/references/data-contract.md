# Data contract

The two files you produce, field by field: **`research/sN/curation.js`**, which you write, and **`data/sN.js`**, which `tools/build-season.js` generates from it. The examples are real Season 1 records; `data/s1.js` has the full set.

## Contents
1. Season file (`data/sN.js`)
2. Characters
3. Relationships
4. Factions, relationship types, statuses
5. Charts (Board view)
6. Ladders (Ladders and Arcs views)
7. Episodes
8. Copy overrides and quick picks
9. The curation file (`research/sN/curation.js`)
10. Shared vocabulary (from `schema.js`)

## 1. Season file

`data/sN.js` is a browser script that pushes one object onto `window.WIRE_SEASONS`:

```js
(window.WIRE_SEASONS = window.WIRE_SEASONS || []).push({
  season: 2, label: 'Season two', year: 2003,
  copy: { … },                 // optional view text overrides
  factions: { … },             // every faction used this season, old and new
  relTypes: { … },             // optional: relationship types new this season
  statuses: { … },             // optional: statuses new this season
  quickPicks: [ids],           // suggestions on the Ladders view
  characters: [ … ],
  relationships: [ … ],
  charts: [ … ],
  ladders: [ … ],
  episodes: [ … ],
});
```

Everything is self-contained per season: a returning character gets a fresh record describing *this* season, under the same id.

## 2. Characters

```json
{
  "id": "bodie", "name": "Bodie Broadus", "full": "Preston Broadus", "short": "Bodie",
  "actor": "J. D. Williams", "faction": "barksdale", "unit": "The Pit", "tier": 1,
  "title": "Pit dealer",
  "role": "Teenage dealer in the Pit; the most aggressive of D'Angelo's young crew",
  "roleEnd": "Moved up to run trade in the towers",
  "reportsTo": "dangelo", "firstEp": 1,
  "status": [
    { "ep": 3, "s": "arrested", "note": "Punched Det. Mahon in the raid; juvenile detention" },
    { "ep": 4, "s": "active", "note": "Walked out of juvenile detention" },
    { "ep": 13, "s": "promoted", "note": "Runs trade in the towers" }
  ],
  "bio": "A hot-tempered teenager raised by his grandmother …",
  "moments": [{ "ep": 1, "text": "Leads the beating of Johnny Weeks over counterfeit money." }],
  "ladder": { "track": "game", "rung": "dealers", "moves": [
    { "ep": 3, "dir": "out", "text": "Arrested after punching Det. Mahon during the Pit raid." },
    { "ep": 13, "dir": "up", "to": "crewchief", "text": "Runs trade in the towers after holding the Pit against a rival crew." }
  ]},
  "pathNote": "Arrested twice and never demoted. The move up comes right after he does what Stringer asks."
}
```

| Field | Required | Meaning |
|---|---|---|
| `id` | yes | Stable across seasons. Lowercase letters, digits, `_`. |
| `name` | yes | As commonly known ("Bodie Broadus", "Stringer Bell"). No nickname in quotes. |
| `full` | no | Full legal name when it differs and is stated on screen. Carried over from earlier seasons by the build. |
| `alias` | no | Nickname shown in quotes in the dossier ("Prop Joe", "Fitz"). Carried over like `full`; `alias: null` in curation drops it. |
| `short` | yes | Label on Web nodes, chips and chains ("Bodie", "McNulty"). |
| `initials` | no | Override when the derived initials read badly ("BU" for Bubbles). Carried over like `full`. |
| `actor` | yes, or `null` | `null` shows "Not seen on screen" (characters who are only named). |
| `faction` | yes | Key in this season's `factions`. Sets the color everywhere. |
| `unit` | yes | Sub-group or posting this season ("The Pit", "Homicide", "The detail"). |
| `tier` | yes | 1 main (about 15–20 per season), 2 supporting, 3 minor. Sets node size and default labels. |
| `title` | yes | Card subtitle, **40 characters or fewer** ("Lieutenant; runs the detail"). |
| `role` | yes | Start-of-season role, one line. |
| `roleEnd` | no | Finale role or fate. Shown when it differs from `role`. |
| `reportsTo` | yes, or `null` | Direct in-universe superior this season, for the dossier's chain of command. |
| `firstEp` | yes | First episode this season. Before it, the card shows "From ep N" and the Web hides the node. |
| `status` | yes, may be `[]` | Timeline of `{ep, s, note}` in episode order; the latest entry with `ep ≤ current` applies. `ep: 0` means true from the start of the season (already in prison, already dead before the season). |
| `bio` | yes | 2–3 sentences on this season. Earlier seasons only as brief context. |
| `moments` | yes, may be `[]` | `{ep, text}`, 2–5 for major characters. |
| `ladder` | no | `{track, rung, moves}`: ladder id, starting rung id, and moves `{ep, dir, text, to?}`. `dir` is up, down, side or out; `to` (a rung id) only when the rung changes. |
| `pathNote` | no | One or two sentences on what their path says, shown on the Ladders path card. |
| `offLadder` | no | For people on no ladder: why (shown on the Ladders and Arcs views). |
| `flashback` | no | `true` lets someone who died earlier appear again; explain it in the bio. |

## 3. Relationships

```json
{ "s": "stringer", "t": "avon", "type": "command", "label": "Second-in-command", "ep": 1 }
```

- `s` and `t` are character ids. Direction matters for `command` (s answers to t), `informant` (s informs to t), `killed` (s killed t) and `investigates` (s investigates t). The other types read the same both ways.
- `label` is a short phrase that reads correctly from either person's file ("Avon is D'Angelo's uncle", "Brother and sister").
- `ep` is the first episode where the tie is visible; the Web hides it before then. Omit `ep` for ties that predate the season.
- Several ties between the same two people are fine (Burrell and Daniels have four political ties at different episodes); the Web fans them out.

## 4. Factions, relationship types, statuses

```js
factions: {
  barksdale: { label: 'Barksdale Organization', short: 'Barksdale', color: '--sodium', anchor: [-480, 10] },
  civilian:  { label: 'Family & Civilians', short: 'Civilian', color: '--stone', anchor: [230, 210], loose: true },
}
```
- `color` is a token from `schema.js FACTION_COLORS` (or a hex). Keep existing factions' colors. New organizations take a free one; `node tools/validate.js --ids` lists them.
- `anchor` is where the faction's cluster sits on the Web, in layout units. Season 1's run from x −480 to 430 and y −200 to 210; put new factions in open space (e.g. [−150, −230] or [430, 230]). It's flipped automatically on portrait screens.
- `loose: true` makes the cluster's pull weak, for groups that should drift toward whoever they're tied to (family, civilians).
- Always keep a `civilian` faction; it's the fallback color.

```js
relTypes: { patronage: { g: 'law', label: 'Patronage', out: 'Protected by', in: 'Protects', edge: ['protected by', 'protects'], dist: 110 } }
statuses: { suspended: { label: 'Suspended', stamp: 'Suspended', color: 'var(--violet)' } }
```
- New relationship types must map to one of the six groups (`g`), because the groups are the Web view's filter chips. `out` and `in` are how the tie reads in the dossier from each side. `edge` is optional, the Web labels from each side. `dist` is the preferred link length (70–140), and `mark` (command, informant or killed) borrows an arrowhead.
- New statuses need a `label`; give them a `stamp` (the rubber stamp on cards) and a `color` if they should show on the board.

## 5. Charts (Board view)

```json
{ "id": "bpd", "tab": "Police", "faction": "police",
  "kicker": "Baltimore Police Department", "title": "Chain of Command",
  "blurb": "Where everyone sat when the season began. Dotted lines are informal: people reporting to someone outside their own chain.",
  "roots": ["frazier"],
  "units": { "_pawn": { "label": "Pawn Shop Unit" } },
  "edges": [["burrell", "frazier"], ["rawls", "burrell"], ["cantrell", "burrell", "dotted"], ["_pawn", "burrell", "dotted"], ["freamon", "_pawn"]],
  "roles": { "cantrell": "Lieutenant; unit not named on screen" },
  "extra": [["carver", "burrell", "leaks to Burrell"], ["santangelo", "rawls", "reports on McNulty"]] }
```
- `id`: lowercase letters and digits only (it goes in the URL). Reuse ids for organizations that persist (`barksdale`, `bpd`, `detail`, `informants`, `street`, `law`).
- `edges` are `[child, parent]` or `[child, parent, "dotted"]` (an informal or uncertain line). Each person appears at most once per chart, and the edges must form a tree under `roots` (several roots make a forest).
- `units` are label cards (ids start with `_`) for grouping, e.g. "From Narcotics" on the detail chart.
- `roles` overrides the card subtitle on this chart only. `extra` draws labelled dotted curves between two people already on the chart.
- Layout: 2–3 leaf reports hang in one column and 4+ stack in two columns, so wide flat teams stay compact. Split a team of 12 into unit groups rather than one long stack.
- Aim for 5–7 charts per season: the main organizations, the police chain, the season's task force, informants, the street, law and politics, and one per new institution.

## 6. Ladders (Ladders and Arcs views)

```json
{ "id": "job", "title": "The Job", "org": "Baltimore Police Department", "color": "--fluoro",
  "blurb": "Nine ranks from patrol officer to commissioner. …",
  "rungs": [
    { "id": "deputy", "title": "Deputy Commissioner", "aka": "Operations", "blurb": "Runs day-to-day policing. …" },
    { "id": "colonel", "title": "Colonel", "blurb": "Senior command rank above major.", "none": "None on screen in Season 1" }
  ],
  "levers": [{ "b": "The list can be reordered.", "text": "Herc scores higher on the sergeant's exam. Carver, who has been informing to Burrell, gets the stripes." }] }
```
- Rungs run **top to bottom**. Rung ids are permanent: copy `game` and `job` from the previous season and keep every rung id. You may add rungs and rewrite blurbs and levers for the new season.
- `none` is the note shown when nobody holds a rung. Update it to the new season or remove it if someone now holds the rank.
- `levers` are 3–5 one-line truths about how people move in this hierarchy *this season*, each anchored to an on-screen example.
- A new hierarchy (Season 2's union, say) gets its own ladder with its organization's faction color.

## 7. Episodes

```json
{ "n": 13, "title": "Sentencing", "epigraph": "All in the game.", "speaker": "Traditional West Baltimore",
  "air": "2002-09-08", "writer": "David Simon & Ed Burns", "director": "Tim Van Patten",
  "summary": "…",
  "events": [{ "type": "arrest", "text": "…", "who": ["kima", "herc", "ronniemo"] }] }
```
- `n` runs 1..count with no gaps. `air` is YYYY-MM-DD. `writer` is the teleplay credit (the builder extracts it from "Story: …; Teleplay: …").
- `speaker` is the on-screen credit of the epigraph, which can differ from who speaks the line.
- Event `type` must be one of the fixed event types (section 10). `death`, `shooting`, `arrest` and `raid` draw the tick marks on the scrubber.
- `who` may include ids that aren't characters (one-scene victims); they render as text without a chip.

## 8. Copy overrides and quick picks

```js
copy: {
  ladders: { kicker: 'The game & the job', blurb: 'Two hierarchies, same logic. …' },
  episodes: { kicker: 'Thirteen hours, June to September 2002' },   // default: derived from count and air dates
  web: { blurb: '…' },
}
quickPicks: ['wallace', 'poot', 'bodie', 'dangelo', 'stringer', 'carver', 'herc', 'prez', 'daniels', 'santangelo', 'freamon']
```
Quick picks are 8–12 people whose ladder paths tell the season's story, from both or all hierarchies. Lead with the ones who move.

## 9. The curation file

`research/sN/curation.js` is plain CommonJS. `tools/build-season.js` merges it with the research JSON.

```js
module.exports = {
  label: 'Season two', year: 2003,
  copy: { … }, factions: { … }, relTypes: { … }, statuses: { … }, quickPicks: [ … ],

  // research files, in priority order (the first file that has an id wins for that character)
  sources: [
    { file: 'barksdale.json', idMap: { keisha: 'nakeesha' } },   // idMap renames ids from that file
    { file: 'police.json' },
  ],
  episodes: { file: 'episodes.json', idMap: {}, speakers: { mcnulty: 'McNulty' } },  // speakers: display name for epigraphSpeakerId
  factionMap: { bpd: 'police' },   // research faction → app faction (bpd/fbi → police and legal/politics → law are built in)

  // the season's cast, in display order; overrides win over research
  characters: [
    ['bodie', { tier: 1, short: 'Bodie', title: 'Pit dealer', name: 'Bodie Broadus', full: 'Preston Broadus',
                status: [S(3, 'arrested', 'Punched Det. Mahon in the raid')],
                ladder: L('game', 'dealers', [M(13, 'up', 'Runs trade in the towers …', 'crewchief')]),
                pathNote: '…' }],
    // any research field can be overridden: name, actor, faction, unit, role, roleEnd, reportsTo (null clears it), firstEp, bio, moments
  ],

  relationships: {
    drop:   ['avon>gant>conflict'],                 // s>t>type, drops every match
    dropEp: ['avon>orlando>conflict>10'],           // s>t>type>ep, drops one
    dedupe: ['bubbles>kima>informant'],             // keep only the first match (two agents reported the same tie)
    label:  { 'dangelo>avon>family': "Avon is D'Angelo's uncle" },
    patch:  { 'weebey>nakeesha>killed': { ep: 13 }, 'dangelo>pooh>killed': { ep: null } },  // null deletes the field
    add:    [['bunk', 'gant', 'investigates', 'Primary on the Gant murder', 1]],
  },

  charts: [ … ],    // section 5, written out in full
  ladders: [ … ],   // section 6, written out in full
};
```

Helpers that keep the character list readable (define them at the top of the file):
```js
const S = (ep, s, note) => (note ? { ep, s, note } : { ep, s });
const L = (track, rung, moves = []) => ({ track, rung, moves });
const M = (ep, dir, text, to) => (to ? { ep, dir, to, text } : { ep, dir, text });
```

What the builder derives when you don't override it:
- `name` comes from the research name with any quoted nickname removed.
- `role` comes from `roleStart`, else `rankStart` plus `assignmentStart`; `roleEnd` likewise from the end fields.
- `faction` comes from `factionMap[research.faction]`, else the research value.
- `moments` come from `keyMoments`.
- A `reportsTo` that points outside the season is dropped, with a warning.

## 10. Shared vocabulary (`schema.js`)

- **Statuses:** active, dead, arrested, convicted, imprisoned, cooperating, hospitalized, injured, reassigned, demoted, retired, fugitive, gone, promoted, passed, desk, leave
- **Out of play** (shown as vacancies on the Ladders view): dead, arrested, convicted, imprisoned, fugitive, gone, hospitalized, retired, leave
- **Relationship types and their groups:**
  - command → command
  - partner, alliance, business, friendship → allies
  - family, romance → kin
  - informant → wire
  - conflict, killed → violence
  - political, legal, investigates → law
- **Groups (fixed):** command, wire, kin, allies, violence, law
- **Event types (fixed):** death, shooting, arrest, raid, seizure, promotion, demotion, transfer, wiretap, informant, trial, other
- **Faction colors:**
  - used in Season 1: --sodium, --rose, --fluoro, --violet, --stone
  - reserved for new organizations: --harbor, --orchid, --mint, --olive
- **Move directions:** up, down, side, out
