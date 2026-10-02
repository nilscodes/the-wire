/* Shared vocabulary for the case board.
   Loaded by the app (as window.WIRE_SCHEMA) and by the Node tools in tools/ (via require).
   Season files may add their own statuses and relationship types on top of these;
   they may not redefine relationship groups or event types (those drive fixed UI). */
(function (root) {
  'use strict';

  // Character status over time. `stamp` is the rubber stamp shown on board cards;
  // statuses without a stamp (active) show nothing.
  const STATUS = {
    active:       { label: 'Active' },
    dead:         { label: 'Deceased',     stamp: 'Deceased',    color: 'var(--blood)' },
    arrested:     { label: 'In custody',   stamp: 'In custody',  color: 'var(--sodium)' },
    convicted:    { label: 'Convicted',    stamp: 'Convicted',   color: 'var(--sodium)' },
    imprisoned:   { label: 'In prison',    stamp: 'In prison',   color: 'var(--sodium)' },
    cooperating:  { label: 'Cooperating',  stamp: 'Talking',     color: 'var(--fluoro)' },
    hospitalized: { label: 'Hospitalized', stamp: 'Shot',        color: 'var(--rose)' },
    injured:      { label: 'Injured',      stamp: 'Injured',     color: 'var(--rose)' },
    reassigned:   { label: 'Reassigned',   stamp: 'Reassigned',  color: 'var(--violet)' },
    demoted:      { label: 'Demoted',      stamp: 'Demoted',     color: 'var(--violet)' },
    retired:      { label: 'Retired',      stamp: 'Retired',     color: 'var(--stone)' },
    fugitive:     { label: 'In hiding',    stamp: 'In hiding',   color: 'var(--sodium)' },
    gone:         { label: 'Left town',    stamp: 'Left town',   color: 'var(--stone)' },
    promoted:     { label: 'Promoted',     stamp: 'Promoted',    color: 'var(--sage)' },
    passed:       { label: 'Passed over',  stamp: 'Passed over', color: 'var(--violet)' },
    desk:         { label: 'Desk duty',    stamp: 'Desk duty',   color: 'var(--violet)' },
    leave:        { label: 'On leave',     stamp: 'On leave',    color: 'var(--stone)' },
  };

  // Statuses that take someone out of play: used for "Open" rungs on the Ladders view.
  const OUT_OF_PLAY = ['dead', 'arrested', 'convicted', 'imprisoned', 'fugitive', 'gone', 'hospitalized', 'retired', 'leave'];

  // The six relationship groups are fixed: they are the Web view's filter chips and line styles.
  const GROUPS = {
    command:  { label: 'Chain of command',   color: 'var(--steel)' },
    wire:     { label: 'Informants & leaks', color: 'var(--paper)' },
    kin:      { label: 'Family & romance',   color: 'var(--pink)' },
    allies:   { label: 'Partners & allies',  color: 'var(--sage)' },
    violence: { label: 'Violence',           color: 'var(--blood)' },
    law:      { label: 'Law & politics',     color: 'var(--sky)' },
  };

  // Relationship types. g = group; out/in = how the tie reads from each side in the dossier;
  // edge = [label when the selected person is the source, label when they are the target] on the Web;
  // dist = preferred link length in the force layout; mark = arrowhead style (command | informant | killed).
  const REL = {
    command:      { g: 'command',  label: 'Chain of command', out: 'Answers to',  in: 'Gives orders to', edge: ['answers to', 'gives orders'], dist: 70, mark: 'command' },
    partner:      { g: 'allies',   label: 'Partners',         out: 'Partner',     in: 'Partner',          dist: 60 },
    alliance:     { g: 'allies',   label: 'Allies',           out: 'Ally',        in: 'Ally',             dist: 100 },
    business:     { g: 'allies',   label: 'Business',         out: 'Business',    in: 'Business',         dist: 100 },
    friendship:   { g: 'allies',   label: 'Friends',          out: 'Friend',      in: 'Friend',           dist: 75 },
    family:       { g: 'kin',      label: 'Family',           out: 'Family',      in: 'Family',           dist: 60 },
    romance:      { g: 'kin',      label: 'Romance',          out: 'Romance',     in: 'Romance',          dist: 60 },
    informant:    { g: 'wire',     label: 'Informant',        out: 'Informs to',  in: 'Their source',     edge: ['informs to', 'source'], dist: 130, mark: 'informant' },
    conflict:     { g: 'violence', label: 'Conflict',         out: 'Conflict',    in: 'Conflict',         dist: 140 },
    killed:       { g: 'violence', label: 'Killed',           out: 'Killed',      in: 'Killed by',        edge: ['killed', 'killed by'], dist: 110, mark: 'killed' },
    political:    { g: 'law',      label: 'Politics',         out: 'Politics',    in: 'Politics',         dist: 110 },
    legal:        { g: 'law',      label: 'Legal',            out: 'Legal',       in: 'Legal',            dist: 110 },
    investigates: { g: 'law',      label: 'Investigation',    out: 'On the case', in: 'Investigated by',  edge: ['on the case', 'investigated by'], dist: 140 },
  };

  // Episode event types and their tag colors on the Episodes view.
  const EVENT = {
    death: 'var(--blood)', shooting: 'var(--rose)', arrest: 'var(--sodium)', raid: 'var(--sodium)',
    seizure: 'var(--sodium)', promotion: 'var(--sage)', demotion: 'var(--violet)', transfer: 'var(--violet)',
    wiretap: 'var(--fluoro)', informant: 'var(--paper)', trial: 'var(--sky)', other: 'var(--dim)',
  };

  // Color tokens a faction or ladder may use (defined in styles.css :root).
  // The first five are taken by Season 1's factions; the rest are reserved for new organizations.
  const FACTION_COLORS = ['--sodium', '--rose', '--fluoro', '--violet', '--stone', '--harbor', '--orchid', '--mint', '--olive'];

  const MOVE_DIRS = ['up', 'down', 'side', 'out'];

  const SCHEMA = { STATUS, OUT_OF_PLAY, GROUPS, REL, EVENT, FACTION_COLORS, MOVE_DIRS };
  root.WIRE_SCHEMA = SCHEMA;
  if (typeof module !== 'undefined' && module.exports) module.exports = SCHEMA;
})(typeof window !== 'undefined' ? window : globalThis);
