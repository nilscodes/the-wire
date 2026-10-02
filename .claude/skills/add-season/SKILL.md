---
name: add-season
description: Add the next full season of HBO's The Wire to the case-board app in this repo (org charts, relationship web, promotion ladders, episode timeline and the cross-season Arcs view). Researches the season with parallel subagents, curates a spoiler-safe dataset, builds data/sN.js with the repo's tools, validates it against earlier seasons, checks every view in a browser and republishes the artifact. Use this whenever the user asks to add, research, build or extend a season of The Wire app ("add season 2", "do S3", "extend the board with the next season", "research season 4 for the app"), even if they don't name the skill.
argument-hint: "<season number>"
---

# Add a season to The Wire case board

This repo is a single-page app that lets someone explore who works for whom in *The Wire*: org charts (Board), a relationship network (Web), promotion ladders (Ladders), an episode timeline (Episodes) and one person's position across seasons (Arcs). An episode scrubber sets "as of episode N" everywhere, and a season switch sets "as of season N". All content is hardcoded, one file per season in `data/`.

Your job is to add **one complete season** so that it feels as if it had always been there: same views, same look, same depth as Season 1, and nothing that spoils a later season.

## What good looks like

- **Accurate before complete.** Every claim traces to a source. When sources disagree or are silent (who *ordered* a killing, a character's exact rank), leave it out or state the uncertainty in plain words. In Season 1 we dropped "Avon ordered Gant's murder" because no episode shows it. That was the right call.
- **No spoilers past the season you are adding.** `data/sN.js` may mention earlier seasons for context, but nothing that happens after season N's finale. The app hides later seasons until the viewer selects them, so this rule is what keeps the season switch honest.
- **UI unchanged.** The app is data-driven: new factions, relationship types, statuses, org charts and ladders are declared in data, and the views pick them up. Don't edit `app.js`, `styles.css` or `index.html` (the build tool maintains the season `<script>` block itself). If the season truly needs something the data contract can't express, stop and tell the user what and why before changing code.
- **Continuity across seasons.** Returning characters keep their Season 1 ids so the Arcs view can follow them. The dead stay dead. Ladder rung ids never change, and faction colors never change. `tools/validate.js` enforces all of this.
- **Full seasons only, in order.** Season N needs `data/s1.js` … `data/s(N-1).js` to exist. Never ship a partial season.

## Repo map

| Path | What it is |
|---|---|
| `index.html`, `styles.css`, `app.js` | The app. Don't edit for a season addition. |
| `schema.js` | Shared vocabulary: statuses, the 13 relationship types and their 6 groups, event types, reserved faction colors. Read it before curating. |
| `data/sN.js` | One season each, generated. `data/s1.js` was converted from the original hand-built Season 1 and is the reference for depth and tone. |
| `research/sN/` | Raw research JSON from subagents plus your hand-written `curation.js`. Kept so a season can be rebuilt. Season 1 has no research folder; never rebuild S1. |
| `tools/build-season.js` | research + curation → `data/sN.js`, then syncs the `<script>` tags in `index.html`. |
| `tools/validate.js` | Checks every season and cross-season continuity. `--ids` prints the id registry, free colors and ladders. `--spoilers` scans for later-season terms. |
| `tools/summarize-research.js` | Compact view of a research JSON, so you can review it without reading 100 KB. |
| `tools/make-artifact.js` | Builds the artifact page and prints the `files` map for publishing. |

References (read when you reach that step):
- `references/research-prompts.md`: the subagent plan and copy-ready prompt templates.
- `references/data-contract.md`: every field of the season file and of `curation.js`, with Season 1 examples.
- `references/curation-guide.md`: how to make the judgment calls (tiers, titles, statuses, ladders, charts, new organizations), plus the pitfalls we hit in Season 1.

## Workflow

Keep the user posted with one short line as each step starts; the whole run takes a while (S1 research took about 20 minutes of parallel agent time).

### 1. Check the starting point

```bash
node tools/validate.js          # must pass before you start
node tools/validate.js --ids    # id registry, free faction colors, ladder rung ids
```

Confirm `data/s(N-1).js` exists and `data/sN.js` does not. If N is not the next season, ask the user rather than skipping ahead: the cross-season checks assume an unbroken chain.

### 2. Scope the season (you, not a subagent; about 5 minutes)

Read the Wikipedia article "The Wire season N" (WebSearch/WebFetch; load them via ToolSearch) and note:
- episode count, first and last air dates, credited writers per episode
- the organizations and institutions that matter this season, especially **new** ones (the union in Season 2 is the textbook case)
- which returning characters carry over and in what role
- the new major characters

Turn that into 3–5 research domains. Season 1 used three: *Barksdale Organization + street*, *police + courts + politics*, *episodes*. A season with a new institution gets its own domain for it. Episodes are always their own domain.

Also write a **spoiler term list** to your scratchpad (not the repo): bare names of people, places and organizations that first appear *after* season N, from your own knowledge. Use names only, never events. It feeds the scan in step 6. Keep it out of the project and out of what you show the user, because the list is itself a spoiler.

### 3. Research with parallel subagents

Spawn one `general-purpose` subagent per domain **in a single message** so they run concurrently. Use the templates in `references/research-prompts.md`; fill in N, the episode count, the domain, the returning-character ids from `--ids`, and the suggested ids for new characters.

Why subagents: each domain is 50+ web pages of reading. Delegating keeps your context for curation, and parallel agents finish in the time of one. Each agent writes JSON to `research/sN/<domain>.json` and replies with only a short summary and its uncertainties.

While they run, don't duplicate their work. If you realize a rule was missing from the prompts (in S1 the user added "no spoilers" mid-run), send it to every running agent with SendMessage right away.

### 4. Review and reconcile

For each file, run `node tools/summarize-research.js research/sN/<file>.json` (then `characters`, `relationships`, `episodes`, `other`) rather than reading the raw JSON. Then reconcile:
- **Ids.** Agents in different domains sometimes give one person two ids, or two people one id. S1 had "Keisha" the dancer and Nakeesha Lyles the witness collide. Fix this with per-source `idMap` in the curation, not by editing the research.
- **Contradictions.** When one agent says "X ordered it" and another says no source names who ordered it, drop the claim.
- **Uncertainties.** Read every agent's list and resolve each one: drop the claim, soften it, or verify it yourself with one targeted fetch.

Write the decisions to `research/sN/notes.md` (a few lines each). It's the audit trail for the next season.

### 5. Curate

Write `research/sN/curation.js`. This is where the season gets its shape, and it deserves the most care. Follow `references/data-contract.md` for the format and `references/curation-guide.md` for the decisions:
- the character list (returning ids first), with tier, short name, a card title of 40 characters or fewer, status timeline, ladder position and moves, path notes and off-ladder notes
- factions: keep the existing ones and their colors and anchors; give new organizations a free reserved color from `--ids` and an anchor
- org charts for this season (reuse chart ids like `barksdale` and `bpd` when the organization persists; add charts for new organizations)
- ladders: reuse `game` and `job` with the same rung ids (you may add rungs, never rename or drop them); add a ladder for any new hierarchy
- relationship fixes: drop, dedupe, relabel, patch episodes, add missing ties
- new relationship types or statuses only when none of the existing ones fit, each mapped to one of the six fixed groups

### 6. Build and validate

```bash
node tools/build-season.js N --spoilers <scratchpad>/spoilers-sN.txt
node tools/validate.js --spoilers <scratchpad>/spoilers-sN.txt --season N
```

Fix every error. Read every warning and every spoiler hit by hand: surnames and first names repeat across seasons, so a hit is a prompt to look, not an automatic failure. Rebuild until both commands are clean.

### 7. Check it in a browser

Serve the repo with `python -m http.server 8765 --bind 127.0.0.1` (in the background) and open it with the Playwright tools. Browsers cache aggressively, so before each look run `fetch(f, {cache:'reload'})` on the changed files, then `location.reload()`.

Look at each of these, in Season N, and fix what you see:
1. `#sN~board-<each chart id>`: cards fit, nothing overlaps, stamps make sense at the finale and at episode 1.
2. `#sN~web`: new factions have their own region and legend entry; select a new character and check the labels.
3. `#sN~ladder.<someone who moves>`: rungs, occupants, "Open" vacancies, the move list.
4. `#sN~episodes`: epigraphs, credits, event chips.
5. `#sN~arcs.<returning character>`: columns for every season, connectors between seasons, the "Between seasons" diffs.
6. Switch to an earlier season and confirm season N disappears from every view, Arcs included.
7. Resize to 390×844 for one pass over Board and Web.
8. `browser_console_messages` shows no errors. A missing favicon is fine.

Then stop the server, close the browser, and delete the `.playwright-mcp/` folder Playwright leaves in the repo.

### 8. Publish

The app is published as a private artifact at https://claude.ai/artifact/Pi53rRqo3RNzVmYByt3sze. Update that same URL rather than creating a new one:
1. `node tools/make-artifact.js <scratchpad>/artifact` writes the page and prints the `files` map.
2. Call Artifact with `action: "read"` and that `url` first (required when the artifact was published in another conversation).
3. Publish with `url`, `file_path` = the printed page, and `files` = the printed map.
4. Commit the season (`data/sN.js`, `index.html`, `research/sN/`) and push to `main`. GitHub Pages republishes https://nilscodes.github.io/the-wire/ within a minute or two; check that `data/sN.js` loads there.

### 9. Report

Tell the user, briefly:
- what the season adds: counts, plus any new factions, charts, ladders, relationship types and statuses
- the judgment calls you made and the uncertainties you resolved by dropping or softening claims
- the validation and spoiler-scan results, and what you checked in the browser
- the artifact link, and that it's private until they share it

## When something doesn't fit

- **A character who died appears in a later season** (a flashback or a body): give the record `flashback: true` and explain it in the bio. The validator then allows it.
- **A ladder rung genuinely changes meaning:** add a new rung instead of renaming the old one, so earlier seasons still resolve.
- **More than four new factions:** the reserved colors run out. Add a token to `styles.css :root` and `schema.js FACTION_COLORS` that keeps the palette's lightness, and tell the user you touched the UI files and why.
- **The research comes back thin for a domain:** re-run that one agent with a narrower brief. Don't pad with unsourced detail.
