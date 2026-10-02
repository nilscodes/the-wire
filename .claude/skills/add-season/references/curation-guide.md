# Curation guide

`curation.js` is where the season gets its shape. The research is raw material: two to four hundred claims of uneven reliability. Your job is to pick the people and ties that explain *who works for whom and how people move*, and to keep every claim honest. This guide covers the decisions, then the mistakes we made or nearly made in Season 1.

## Who is in the season

- Include everyone who matters to a hierarchy or a relationship, including minor figures who explain a move (Season 1 kept Cass, the Pit lookout, because her skimming is how we see D'Angelo protect his crew). Leave out one-scene victims and walk-ons; event text can still name them.
- **Returning characters:** reuse their id and write a fresh record for this season. Their `role` is where they start *this* season, and their `bio` is about *this* season, with one clause of context at most ("After the Barksdale case, …").
- **Already gone:** someone in prison all season but on screen gets `status: [S(0, 'imprisoned', '…')]`. Someone dead before the season is left out, unless their death drives the plot and they're referenced throughout (Season 1 kept Deirdre Kresson with `S(0, 'dead')`).
- **Tiers:**
  - tier 1 is about 15–20 people the season is about
  - tier 2 is the supporting cast who carry storylines
  - tier 3 is everyone else
  
  Tier 1 nodes are big and always labelled on the Web, so too many of them makes it noisy.

## Names, titles and roles

- `name` is what viewers call them ("Bunk Moreland", not "William Moreland"); put the legal name in `full`. Nicknames that stand alone ("Bubbles", "Bird") are fine as the whole name.
- `title` is the card subtitle and must read at a glance: 40 characters or fewer, no full sentences ("Lieutenant; runs the detail", "Crew chief, the Pit"). Titles that run long get clipped on the cards.
- `role` and `roleEnd` carry the detail. Write them as one line each, and make `roleEnd` the finale state ("Sentenced to 20 years after backing out of a deal").

## Status timelines

- The status at the current episode drives the stamps on the Board, the dashed Web nodes, the "Open" vacancies on the Ladders view and the Arcs finale stamp. Add an entry each time the state changes, including the return to `active` (Bodie: arrested ep 3, active ep 4, arrested ep 5, active ep 6).
- Use `promoted` or `passed` at the episode where it happens, even when the rung change is also in `ladder.moves`; the stamp is what people notice.
- `note` explains the state in under 70 characters. It's shown as "As of ep N" in the dossier.

## Ladder positions

- Put everyone who sits in a hierarchy on its ladder, and give everyone else an `offLadder` sentence (Omar: "Omar robs the game instead of climbing it.").
- `ladder.rung` is the rung at the *start* of the season. Every change of rung is a move with `to`. Moves without `to` are events that matter to the path without changing rank: an arrest is `out`, a threat or a sideways transfer is `side`, a rebuke is `down`.
- A sideways move can still be a big move up or down: Freamon going from the Pawn Shop Unit to Homicide is the same rank and a clear "up". Use `dir` for the meaning and `to` only for the rank.
- `pathNote` is one or two sentences on what this person's path says about how the hierarchy works. It's the most-read sentence on the Ladders view, so make it specific and true ("Scored below Herc on the exam. Informing to the deputy commissioner put him first.").

## Org charts

- Charts answer "who works for whom" for one organization at the **start** of the season, with a few informal lines. Movement over the season is the Ladders and Arcs views' job.
- Show uncertainty in the chart itself: a dotted edge for an inferred or informal reporting line, and a unit card ("Unit not named on screen") rather than a guess.
- A detail or task force reads best grouped by where each member came from (unit cards like "From Narcotics", "Dumped on the detail"). That one choice explains its politics.
- An **Informants** chart (handlers as roots, sources as dotted children) is one of the most useful views in the app. Rebuild it every season.

## New organizations (the Season 2 union is the model case)

When a season introduces an institution, it should feel native in every view:
1. **Faction:** a new id, label and short name, a free reserved color, and an anchor in open space on the Web.
2. **Chart:** its own Board chart, structured as the show presents it (officers, stewards, rank-and-file, the people it does business with).
3. **Ladder:** if it has ranks people climb, give it a ladder with that faction's color, top to bottom, with levers grounded in this season's examples.
4. **Relationship types:** only if none of the 13 fit. A tie with its own logic that recurs across the season is a fair addition (map it to the closest group); "union brother" isn't, because that's `alliance` or `friendship` with a good label.
5. **Quick picks:** at least one person from the new organization.
6. **Copy:** if the Ladders kicker reads oddly with three ladders, set `copy.ladders`.

## Relationship hygiene

- **Cut "ordered by" claims unless an episode shows or states the order.** Season 1 dropped Avon→Gant, Stringer→Lyles and Avon→Orlando this way. Who pulled a trigger and who ordered it are separate ties; record the order only when it's shown.
- **Write labels to read from both sides.** "Uncle" breaks in Avon's own file; "Avon is D'Angelo's uncle" works in both.
- **Watch for duplicates.** Two agents often report the same tie (Bubbles informing to Kima came from both). Use `dedupe`, not `drop`, so one copy survives.
- **Use `ep` for when it becomes visible.** A killing revealed by a confession in episode 13 gets `ep: 13`, even if it happened earlier.
- **Give everyone at least one tie,** or they float alone on the Web. The validator warns about it.

## Pitfalls we hit in Season 1

| What happened | What to do |
|---|---|
| Two people named Keisha (a dancer and the trial witness Nakeesha Lyles) shared one id across agents. | Check for shared first names when reconciling, and fix them with `idMap`. |
| One agent asserted orders and motives the episodes never show. | Prefer the episode agent's conservative version, and drop the claim when sources only infer it. |
| Fandom pages were blocked to WebFetch. | Use the MediaWiki API URL in the prompt templates. |
| Agents described later fates in bios ("is later promoted…"). | Keep the spoiler paragraph in every prompt, run the spoiler scan, and grep for "later", "eventually" and "would go on". |
| Ages stated as fact ("about 23") came from fan sources. | Drop ages unless they're said on screen. |
| The Board looked wrong after a code change and it was the browser cache. | Reload with `fetch(f, {cache: 'reload'})` before every screenshot. |
| `.playwright-mcp/` screenshots ended up in the repo. | Delete the folder when the check is done. |

## Before you build: a last read

Read the curation top to bottom once, as a viewer who has just finished the season:
- Does every tier 1 title make sense on its own?
- Does every `pathNote` say something true and specific?
- Would anything surprise someone who has *only* seen up to this finale?
