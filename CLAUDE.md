# The Wire Case Board

A single-page app for exploring who works for whom in HBO's *The Wire*, season by season. There's no build step and no npm: open `index.html` in a browser, or serve the folder with `python -m http.server`. It loads d3 and Google Fonts from CDNs.

## Layout

- `index.html`, `styles.css`, `app.js`: the app. Views: Board (org charts), Web (relationship network), Ladders (promotion paths), Episodes, Arcs (one person across seasons). The episode scrubber sets "as of episode N"; the season switch, which appears once there are two or more seasons, sets "as of season N".
- `schema.js`: shared vocabulary (statuses, relationship types and groups, event types, reserved colors), used by the app and the tools.
- `data/sN.js`: one hardcoded season per file. `data/s1.js` is the hand-curated Season 1 and the reference for depth and tone.
- `research/sN/`: research JSON and `curation.js` for seasons built with the pipeline. Season 1 predates it and has none.
- `tools/`: `build-season.js` (research + curation → `data/sN.js`), `validate.js` (all seasons and cross-season continuity), `summarize-research.js`, `make-artifact.js`.

## Rules

- **Spoilers:** nothing in `data/sN.js` may reveal anything after season N's finale. The app shows later seasons only when the viewer selects them.
- **Data-driven:** season content goes in data, not code. New factions, relationship types, statuses, charts and ladders are declared in the season file.
- **Validate:** run `node tools/validate.js` after any data change. It must report 0 errors.
- **Adding a season:** use the `add-season` skill (`.claude/skills/add-season/`). It covers research with parallel subagents, curation, build, validation, the browser check and publishing.
- **Published copy:** the app is published as a private artifact at https://claude.ai/artifact/Pi53rRqo3RNzVmYByt3sze. Update that URL rather than creating a new one; `tools/make-artifact.js` prepares the files.
- **Public site:** the repo is public at https://github.com/nilscodes/the-wire, and GitHub Pages serves `main` as-is (no build; `.nojekyll`) at https://nilscodes.github.io/the-wire/. Pushing to `main` republishes it. Commits use the GitHub noreply identity set in this repo's local git config.
