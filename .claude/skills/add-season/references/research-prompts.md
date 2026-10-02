# Research: subagent plan and prompt templates

## Contents
1. The plan
2. Common preamble (paste into every prompt)
3. Template A: an organization or institution
4. Template B: police, courts and politics (careers and ranks)
5. Template C: episodes
6. Messages to send mid-run
7. What came back in Season 1 (calibration)

## 1. The plan

- One `general-purpose` subagent per domain, all launched **in one message** so they run in parallel. They inherit your model; don't downgrade them, because accuracy is the point.
- Typical split: one agent per criminal organization or new institution that season, one for police, courts and politics, one for episodes. That's 3 to 5 agents. Season 1 used three:
  - *Barksdale Organization and the street*: Barksdale, Omar's crew, addicts and informants, Prop Joe
  - *Baltimore Police, FBI, prosecutors, judges, politicians and police families*
  - *Episode timeline*: epigraphs, credits, events, deaths, arrests, wiretap steps, the finale state
- Each agent writes its file into `research/sN/` (e.g. `research/s2/police.json`) and replies with a **short** summary: counts, key findings, uncertainties. The raw JSON never passes through your context; you review it with `tools/summarize-research.js`.
- Every agent gets the id registry for the characters in its domain. Paste the matching rows from `node tools/validate.js --ids`, so returning characters keep their ids.
- Expect 15 to 25 minutes and about 300k tokens per agent.

## 2. Common preamble

Fill in the `{…}` placeholders. Keep the spoiler paragraph exactly as is, because it was the most important correction in Season 1.

```
Research HBO's "The Wire" SEASON {N} ONLY ({EPISODE_COUNT} episodes, {YEAR}). The data will be hardcoded into an interactive app that shows who works for whom, how each hierarchy works and how people move up and down it. Accuracy matters more than volume.

SPOILER RULE: the app must contain nothing that happens after the season {N} finale. Keep every bio, moment, role, label and description to what is shown or stated by the end of season {N} episode {EPISODE_COUNT}. You may mention earlier seasons briefly for context ("released from prison after Season {N-1}"), but never later events, fates, ranks or characters, not even in passing ("later becomes…").

SOURCES: verify facts on the web. Load WebSearch and WebFetch via ToolSearch ("select:WebSearch,WebFetch"). Good sources are Wikipedia ("The Wire season {N}", "List of The Wire characters", each episode article, character articles) and thewire.fandom.com. WebFetch on fandom pages is often blocked; use the MediaWiki API instead: https://thewire.fandom.com/api.php?action=parse&page=<Page_Title>&prop=wikitext&format=json
Cross-check anything you're unsure of, and don't invent anything. If you can't verify a detail, set it to null or put it in "uncertainties". Don't claim who ORDERED an act unless an episode shows or states it.

IDS: lowercase letters/digits/underscore. Reuse these ids exactly for returning characters (id, name, actor, faction, last known role):
{REGISTRY_ROWS}
For new characters use the suggested ids below, or the same style. Don't give two people the same id; watch for shared first names.
```

## 3. Template A: an organization or institution

Use one per criminal organization or institution that matters this season (for Season 2, the union is one).

```
{COMMON PREAMBLE}

Your area is {DOMAIN: e.g. "the Barksdale Organization and the street", or the season's new institution}.

CHARACTERS TO COVER (suggested ids): {id (Name), …}. Add other named characters who matter in season {N}, in the same id style. Leave out anyone who doesn't appear in season {N}.

FOR EACH CHARACTER, return:
- id, name (no nickname in quotes), alias (nickname or null), full (full legal name if stated on screen, else null), actor
- faction: proposed short id for the organization they belong to this season, e.g. "barksdale", "street"
- unit: their sub-group or posting, e.g. "The Pit", "Muscle"
- returning: true if they appeared in an earlier season
- roleStart: role at the start of season {N}; roleEnd: role/status at the end of season {N}
- reportsTo: id of their direct in-universe superior this season, or null
- statusEnd: one of active, arrested, convicted, imprisoned, dead, fugitive, gone, cooperating, hospitalized, injured, retired; statusEp: the episode where that status began (0 if it was already true when the season opened)
- firstEp: their first episode this season
- bio: 2-3 sentences about season {N} only (earlier seasons only as brief context)
- keyMoments: [{ep, text}], 2-5 for major characters
- careerMoves: [{ep, from, to, kind: promotion|demotion|transfer|assignment|arrest|release|death|exit|restructure, text}]

RELATIONSHIPS: an array of {source, target, type, label, ep}. type is one of: command (source answers to target), partner, alliance, business, friendship, family, romance, informant (source informs to target), conflict, killed (source killed target), political, legal, investigates (source investigates target). label is a short neutral phrase that reads correctly from either side, e.g. "Avon is D'Angelo's uncle". ep is the first episode where the tie is visible; omit it if the tie predates the season. Be thorough: every killing (who pulled the trigger, kept separate from who ordered it, and only if shown), family ties, romances, who works for whom, who supplies whom.

NEW RELATIONSHIP TYPES: if this season has ties none of the types above captures well, return newRelationshipTypes: [{type, meaning, examples: [{source, target}]}] and still use the closest existing type in the relationships array.

HIERARCHY: describe the organization's tiers from bottom to top as the show depicts them: [{id, title, description, members}]. Add howMovementWorks: [...] for how people move up, down or out this season, with episode numbers. If a tier already exists in an earlier season's ladder (here: {LADDER_RUNGS_FROM_--ids}), reuse its id.

OUTPUT: write everything as one valid JSON file to {REPO}/research/s{N}/{domain}.json with top-level keys {characters, relationships, hierarchy, howMovementWorks, newRelationshipTypes, uncertainties, sources}. Check that it parses (node -e "JSON.parse(require('fs').readFileSync('<file>','utf8'))"). Then reply with a SHORT summary: counts, key findings, and the uncertainties list. Don't paste the JSON into your reply.
```

## 4. Template B: police, courts and politics

Same as Template A, with these differences. The ranks are what make the Ladders view work.

```
{COMMON PREAMBLE}

Your area is the Baltimore Police Department, the FBI, prosecutors and judges, politicians, and the police characters' families and partners.

CHARACTERS TO COVER (suggested ids): {…}

FOR EACH CHARACTER, return everything listed for organizations, plus:
- faction: one of "bpd", "fbi", "legal" (prosecutors, judges, defense), "politics", "civilian"
- rankStart and rankEnd: exact BPD rank at the start and end of the season (Officer, Detective, Sergeant, Lieutenant, Captain, Major, Colonel, Deputy Commissioner, Commissioner), or the title for non-police
- assignmentStart and assignmentEnd: unit or posting at the start and end
- unofficialReportsTo and unofficialNote: any informal line, e.g. a mole informing to someone outside their chain
- careerMoves: [{ep, from, to, kind: promotion|demotion|transfer|assignment|passed-over|threatened|discipline|injury|retirement, realized: true|false, text}]. Include promotions dangled or denied (realized: false) and punitive transfers.

Also return:
- ladder: the BPD ranks bottom to top, each with a one-line description and the season-{N} holders at the start and the end (note any rank nobody holds on screen)
- orgStructure: who commands what this season (units, districts, task forces or details), with reporting lines marked as stated or inferred
- unitFormation and unitBreakup: if a task force or detail forms or breaks up this season, who contributed whom and why, and where each member ended up

OUTPUT keys: {characters, relationships, ladder, orgStructure, unitFormation, unitBreakup, newRelationshipTypes, uncertainties, sources} in {REPO}/research/s{N}/police.json.
```

## 5. Template C: episodes

```
{COMMON PREAMBLE}

Your area is the episode-by-episode timeline. The app has an episode scrubber: as the user moves through episodes 1-{EPISODE_COUNT}, characters get killed, arrested, promoted or reassigned.

Use these character ids in your events: {ALL IDS: the registry plus the new ids given to the other agents}. Add new ones in the same style if needed, and list them.

FOR EACH EPISODE, return:
- number, title
- epigraph: the exact opening quote; epigraphSpeaker: the character who says it; epigraphSpeakerId; epigraphAttribution if the on-screen credit differs (Season 1 finale: "Traditional West Baltimore")
- airDate (YYYY-MM-DD), writer (exactly as credited, e.g. "Story: David Simon & Ed Burns; Teleplay: George Pelecanos"), director
- summary: 2-3 sentences
- events: [{text, type, characters: [ids], primary}], where type is one of death, arrest, shooting, promotion, demotion, transfer, wiretap, raid, seizure, informant, trial, other. Give 4-8 of the most important plot beats per episode. Every death, arrest, shooting and career change in the season must appear in the right episode.

ALSO RETURN:
- deaths: [{victim, ep, killer, orderedBy, accomplices, how}]. Use ep 0 for deaths before the season that drive its plot. Set orderedBy to null unless an episode shows or states the order.
- arrests: [{who, ep, charge, context}]
- investigationTimeline: [{ep, text}] covering the season's case (surveillance, wiretaps, raids)
- finale: where every major character stands at the end of episode {EPISODE_COUNT}

OUTPUT keys: {episodes, deaths, arrests, investigationTimeline, finale, newIds, uncertainties, sources} in {REPO}/research/s{N}/episodes.json.
```

## 6. Messages to send mid-run

If you notice a gap after launching, message every affected agent at once with SendMessage. Lead with the rule in one sentence, then the specifics. Two examples:

```
Change of requirement: keep strictly to season {N}. Don't spend time researching later seasons; drop anything that happens after the season {N} finale from bios, moments, roles and labels.
```
```
Id clash: "{id}" is being used for two people. Use "{id_a}" for {person A} and "{id_b}" for {person B} everywhere in your file.
```

## 7. What came back in Season 1 (calibration)

- **Barksdale and street:** 35 characters and 104 relationships (14 of them killings). Also a 10-tier hierarchy, 30 movement events and 24 uncertainties.
- **Police, courts and politics:** 44 characters and 96 relationships, a 9-rank ladder, the detail's formation and breakup, and 26 uncertainties.
- **Episodes:** 13 episodes with 99 events, 16 deaths and 16 arrests, plus 56 finale entries and 24 uncertainties.
- **The curated season:** 74 characters and 216 relationships, 6 charts, 2 ladders and 13 episodes. Expect a later season to land in the same range; a season with a big new institution will run larger.
