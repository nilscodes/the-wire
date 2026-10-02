/* The Wire Case Board: application logic.
   Content lives in data/sN.js, one file per season, each pushing onto window.WIRE_SEASONS.
   Shared vocabulary (statuses, relationship types, groups) lives in schema.js.
   d3 handles force layout, zoom and drag. */
(() => {
  'use strict';

  const SCHEMA = window.WIRE_SCHEMA;
  const SEASONS = (window.WIRE_SEASONS || []).slice().sort((a, b) => a.season - b.season);
  if (!SCHEMA || !SEASONS.length || !window.d3) {
    document.body.insertAdjacentHTML('beforeend',
      '<p style="position:fixed;inset:auto 16px 16px;padding:16px;background:#121a24;color:#ede7da;font:14px system-ui;border-radius:10px;z-index:999">' +
      'The case data or the d3 library did not load. Check your connection and reload the page.</p>');
    return;
  }

  /* ------------------------------------------------------------------
     Helpers & constants
     ------------------------------------------------------------------ */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const push = (map, k, v) => { if (!map.has(k)) map.set(k, []); map.get(k).push(v); };
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = () => RM.matches;
  const narrow = () => window.innerWidth <= 760;
  const colorOf = v => (!v ? 'var(--stone)' : v.startsWith('--') ? `var(${v})` : v);
  const NUM = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen'];
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage blocked */ } },
  };

  const VIEWS = ['board', 'web', 'ladder', 'episodes', 'arcs'];
  const GROUPS = SCHEMA.GROUPS;
  const GROUP_ORDER = Object.keys(GROUPS);
  const EVENT = SCHEMA.EVENT;
  const OUT_OF_PLAY = new Set(SCHEMA.OUT_OF_PLAY);

  /* ------------------------------------------------------------------
     Season contexts: every index the views need, built once per season
     ------------------------------------------------------------------ */
  const CTX_CACHE = new Map();
  function ctxOf(S) {
    if (CTX_CACHE.has(S.season)) return CTX_CACHE.get(S.season);
    const ctx = {
      S, n: S.season, maxEp: S.episodes.length,
      STATUS: { ...SCHEMA.STATUS, ...Object.fromEntries(Object.entries(S.statuses || {}).map(([k, d]) => [k, { ...d, color: d.color ? colorOf(d.color) : undefined }])) },
      REL: { ...SCHEMA.REL, ...(S.relTypes || {}) },
      factions: S.factions,
      C: new Map(S.characters.map((c, i) => [c.id, Object.assign(c, { idx: i })])),
      relIndex: new Map(), directReports: new Map(), CHARTS: new Map(),
      LADDERS: new Map((S.ladders || []).map(l => [l.id, l])),
    };
    S.relationships.forEach((r, i) => {
      r.i = i;
      push(ctx.relIndex, r.s, { r, other: r.t, out: true });
      push(ctx.relIndex, r.t, { r, other: r.s, out: false });
    });
    S.characters.forEach(c => { if (c.reportsTo && ctx.C.has(c.reportsTo)) push(ctx.directReports, c.reportsTo, c.id); });
    (S.charts || []).forEach(ch => {
      const children = new Map(), parent = new Map(), dotted = new Set();
      for (const [c, p, style] of ch.edges) { push(children, p, c); parent.set(c, p); if (style === 'dotted') dotted.add(c); }
      const members = new Set([...ch.roots, ...parent.keys()].filter(id => !id.startsWith('_')));
      ctx.CHARTS.set(ch.id, Object.assign({}, ch, { children, parent, dotted, members }));
    });
    CTX_CACHE.set(S.season, ctx);
    return ctx;
  }

  // The active season. These are reassigned by useSeason(); every view reads them at call time.
  let CTX, D, MAX_EP, STATUS, REL, C, relIndex, directReports, CHARTS, LADDERS;
  function useSeason(n) {
    const S = SEASONS.find(s => s.season === n) || SEASONS[0];
    CTX = ctxOf(S);
    ({ maxEp: MAX_EP, STATUS, REL, C, relIndex, directReports, CHARTS, LADDERS } = CTX);
    D = S;
  }
  const seasonLabel = S => S.label || `Season ${NUM[S.season] || S.season}`;

  const facOf = (f, ctx = CTX) => ctx.factions[f] || ctx.factions.civilian || { label: f, short: f, color: '--stone' };
  const fColor = (f, ctx) => colorOf(facOf(f, ctx).color);
  const fLabel = (f, ctx) => facOf(f, ctx).label;
  const fShort = (f, ctx) => facOf(f, ctx).short || facOf(f, ctx).label;

  function initials(c) {
    if (c.initials) return c.initials;
    const parts = c.name.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  const shortName = c => c.short || c.name.split(' ')[0];
  const cardName = c => c.card || c.name;
  const avatar = (c, cls = '', ctx) =>
    `<span class="avatar ${cls}" style="--fc:${fColor(c.faction, ctx)}" aria-hidden="true">${esc(initials(c))}</span>`;

  function statusAt(c, ep) {
    let cur = { s: 'active', ep: 0 };
    for (const st of c.status || []) if (st.ep <= ep) cur = st;
    return cur;
  }
  const seen = (c, ep) => (c.firstEp ?? 1) <= ep;

  function chainOf(id, ctx = CTX) {
    const out = [];
    const guard = new Set([id]);
    let cur = ctx.C.get(id)?.reportsTo;
    while (cur && ctx.C.has(cur) && !guard.has(cur)) { out.unshift(cur); guard.add(cur); cur = ctx.C.get(cur).reportsTo; }
    return out;
  }
  const chartsFor = id => [...CHARTS.values()].filter(ch => ch.members.has(id));

  function rungAt(c, ep) {
    if (!c.ladder) return null;
    let r = c.ladder.rung;
    for (const m of c.ladder.moves || []) if (m.ep <= ep && m.to) r = m.to;
    return r;
  }
  const ladderColor = L => colorOf(L.color || (L.id === 'job' ? '--fluoro' : '--sodium'));

  /* ------------------------------------------------------------------
     State & routing
     ------------------------------------------------------------------ */
  const state = {
    season: null,
    view: 'board',
    chart: null,
    sel: null,
    arcSel: null,
    ep: 1,
    groups: new Set(GROUP_ORDER),
  };

  function token() {
    let t = `s${state.season}~${state.view}`;
    if (state.view === 'board') t += '-' + state.chart;
    const sel = state.view === 'arcs' ? state.arcSel : state.sel;
    if (sel) t += '.' + sel;
    return t;
  }
  function writeHash(replace) {
    const t = '#' + token();
    if (location.hash === t) return;
    try { history[replace ? 'replaceState' : 'pushState'](null, '', t); } catch (e) { /* sandboxed frame */ }
  }
  function parseHash() {
    const m = location.hash.slice(1).match(/^(?:s(\d+)~)?([a-z]+)(?:-([a-z0-9]+))?(?:\.([a-z0-9_]+))?$/);
    if (!m) return { view: 'board' };
    return { season: m[1] ? +m[1] : null, view: VIEWS.includes(m[2]) ? m[2] : 'board', chart: m[3], sel: m[4] };
  }
  function applyHash() {
    const r = parseHash();
    if (r.season && r.season !== state.season && SEASONS.some(S => S.season === r.season)) setSeason(r.season, { write: false, rerender: false });
    if (r.chart && CHARTS.has(r.chart)) state.chart = r.chart;
    if (r.view === 'arcs') {
      if (r.sel) state.arcSel = r.sel;
      select(null, { write: false });
      setView('arcs', { write: false });
    } else {
      setView(r.view, { write: false });
      select(r.sel && C.has(r.sel) ? r.sel : null, { write: false });
    }
  }

  /* ------------------------------------------------------------------
     Shared: tabs, season switch, view copy
     ------------------------------------------------------------------ */
  const tabs = $$('.tab');
  const ink = $('.tab-ink');
  function moveInk() {
    const t = tabs.find(b => b.dataset.view === state.view);
    if (!t) return;
    ink.style.width = t.offsetWidth + 'px';
    ink.style.transform = `translateX(${t.offsetLeft}px)`;
  }
  tabs.forEach(b => b.addEventListener('click', () => setView(b.dataset.view)));

  const seasonSwitch = $('#seasonSwitch');
  seasonSwitch.addEventListener('click', e => {
    const b = e.target.closest('button[data-season]');
    if (b) setSeason(+b.dataset.season);
  });
  function renderSeasonUI() {
    seasonSwitch.hidden = SEASONS.length < 2;
    seasonSwitch.innerHTML = '<span class="label">Season</span>' + SEASONS.map(S =>
      `<button type="button" data-season="${S.season}" aria-pressed="${S.season === state.season}" title="${esc(seasonLabel(S))} · ${S.year}">${S.season}</button>`).join('');
    $('#brandSub').textContent = `Case board · ${seasonLabel(D)} · ${D.year}`;
    document.title = SEASONS.length > 1 ? `The Wire Case Board · ${cap(seasonLabel(D))}` : 'The Wire Case Board';
  }

  function applyCopy() {
    const copy = D.copy || {};
    const first = new Date(D.episodes[0].air + 'T12:00:00'), last = new Date(D.episodes[MAX_EP - 1].air + 'T12:00:00');
    const month = d => d.toLocaleDateString('en-US', { month: 'long' });
    const span = first.getFullYear() === last.getFullYear()
      ? `${month(first)} to ${month(last)} ${last.getFullYear()}`
      : `${month(first)} ${first.getFullYear()} to ${month(last)} ${last.getFullYear()}`;
    $('#epsKicker').textContent = (copy.episodes && copy.episodes.kicker) || `${cap(NUM[MAX_EP] || String(MAX_EP))} hours, ${span}`;
    const ladders = D.ladders || [];
    const names = ladders.map(l => l.title.toLowerCase());
    $('#ladderKicker').textContent = (copy.ladders && copy.ladders.kicker) ||
      cap(names.length > 1 ? `${names.slice(0, -1).join(', ')} & ${names[names.length - 1]}` : names.join(''));
    $('#ladderBlurb').textContent = (copy.ladders && copy.ladders.blurb) ||
      `${cap(NUM[ladders.length] || String(ladders.length))} hierarchies, same logic. Pick anyone to see where they stand, who is in their way, and how they moved during the season.`;
    if (copy.web && copy.web.blurb) $('#webBlurb').textContent = copy.web.blurb;
  }

  function dossierInset() {
    return state.sel && !narrow() ? Math.min(400, window.innerWidth) : 0;
  }
  function overlayBottom(view) {
    const o = $(`#view-${view} .overlay-top`);
    return o ? o.offsetTop + o.offsetHeight + 14 : 20;
  }

  /* ------------------------------------------------------------------
     BOARD: org charts
     ------------------------------------------------------------------ */
  const Board = (() => {
    const canvas = $('#boardCanvas');
    const stage = $('#boardStage');
    const svg = $('#boardLinks');
    const cardsEl = $('#boardCards');
    const sw = $('#chartSwitch');
    const CW = 220, CH = 70, UH = 34, GX = 24, GY = 70, RG = 14, PAD = 40, IND = 22;
    let chart = null, layout = null, started = false, dirty = false;

    const zoom = d3.zoom()
      .scaleExtent([0.18, 2.2])
      .on('zoom', e => {
        const t = e.transform;
        stage.style.transform = `translate(${t.x}px,${t.y}px) scale(${t.k})`;
      });
    d3.select(canvas).call(zoom).on('dblclick.zoom', null);

    cardsEl.addEventListener('animationend', e => { if (e.animationName === 'card-in') e.target.classList.remove('enter'); });

    canvas.addEventListener('click', e => {
      const card = e.target.closest('.card[data-id]');
      if (card) { select(card.dataset.id); return; }
      if (!e.target.closest('.card') && state.sel) select(null);
    });

    sw.addEventListener('click', e => {
      const b = e.target.closest('button[data-chart]');
      if (!b || b.dataset.chart === state.chart) return;
      state.chart = b.dataset.chart;
      show(true);
      writeHash(true);
    });

    function reset() {
      sw.innerHTML = D.charts.map(ch =>
        `<button type="button" data-chart="${ch.id}" aria-pressed="false" style="--fc:${fColor(ch.faction)}"><span class="dot"></span>${esc(ch.tab)}</button>`).join('');
      chart = null; layout = null; started = false; dirty = false;
      cardsEl.innerHTML = '';
      svg.innerHTML = '';
    }

    function elbow(x1, y1, x2, y2) {
      if (Math.abs(x1 - x2) < 1) return `M${x1},${y1} V${y2}`;
      const my = (y1 + y2) / 2;
      const r = Math.min(10, Math.abs(x2 - x1) / 2, (y2 - y1) / 4);
      const s = x2 > x1 ? 1 : -1;
      return `M${x1},${y1} V${my - r} Q${x1},${my} ${x1 + s * r},${my} H${x2 - s * r} Q${x2},${my} ${x2},${my + r} V${y2}`;
    }

    function doLayout(ch) {
      const pos = new Map();
      const links = [];
      let cursor = 0, maxY = 0;
      const kids = id => ch.children.get(id) || [];
      const hOf = id => (id.startsWith('_') ? UH : CH);

      function place(id, y, depth) {
        const h = hOf(id);
        maxY = Math.max(maxY, y + h);
        const ks = kids(id);
        if (!ks.length) {
          const x = cursor + CW / 2;
          cursor += CW + GX;
          pos.set(id, { x, y, depth });
          return x;
        }
        // two or three leaf reports: one indented column hanging off a spine
        if (ks.length >= 2 && ks.length <= 3 && ks.every(k => !kids(k).length)) {
          const left = cursor;
          const kx = left + IND + CW / 2;
          const spine = left + 8;
          const top = y + h + GY * 0.6;
          const bus = top - 16;
          ks.forEach((k, i) => {
            const ky = top + i * (CH + RG);
            const my = ky + CH / 2;
            pos.set(k, { x: kx, y: ky, depth: depth + 1 + i * 0.35 });
            maxY = Math.max(maxY, ky + CH);
            links.push({ p: id, c: k, d: `M${kx},${y + h} V${bus - 8} Q${kx},${bus} ${kx - 8},${bus} H${spine + 8} Q${spine},${bus} ${spine},${bus + 8} V${my - 8} Q${spine},${my} ${spine + 8},${my} H${kx - CW / 2}` });
          });
          cursor += IND + CW + GX;
          pos.set(id, { x: kx, y, depth });
          return kx;
        }
        // four or more leaf reports: stack them in two columns around a spine
        if (ks.length >= 4 && ks.every(k => !kids(k).length)) {
          const left = cursor;
          const spine = left + CW + GX / 2;
          const top = y + h + GY * 0.6;
          ks.forEach((k, i) => {
            const col = i % 2, row = Math.floor(i / 2);
            const kx = col === 0 ? left + CW / 2 : left + CW + GX + CW / 2;
            const ky = top + row * (CH + RG);
            const my = ky + CH / 2;
            pos.set(k, { x: kx, y: ky, depth: depth + 1 + row * 0.35 });
            maxY = Math.max(maxY, ky + CH);
            const edge = col === 0 ? kx + CW / 2 : kx - CW / 2;
            const s = col === 0 ? -1 : 1;
            links.push({ p: id, c: k, d: `M${spine},${y + h} V${my - 8} Q${spine},${my} ${spine + s * 8},${my} H${edge}` });
          });
          cursor += 2 * CW + 2 * GX;
          pos.set(id, { x: spine, y, depth });
          return spine;
        }
        const cy = y + h + GY;
        const xs = ks.map(k => place(k, cy, depth + 1));
        const px = (xs[0] + xs[xs.length - 1]) / 2;
        pos.set(id, { x: px, y, depth });
        ks.forEach((k, i) => links.push({ p: id, c: k, d: elbow(px, y + h, xs[i], cy) }));
        return px;
      }

      ch.roots.forEach((r, i) => { if (i) cursor += GX * 2; place(r, 0, 0); });
      return { pos, links, width: Math.max(cursor - GX, CW), height: maxY };
    }

    function extraPath(a, b) {
      // informal line: right edge of a to right edge of b, bowed outward
      const sx = a.x + CW / 2, sy = a.y + CH / 2, tx = b.x + CW / 2, ty = b.y + CH / 2;
      const bow = 70 + Math.abs(ty - sy) * 0.12;
      const c1x = sx + bow, c2x = tx + bow;
      const mx = 0.125 * sx + 0.375 * c1x + 0.375 * c2x + 0.125 * tx;
      const my = (sy + ty) / 2;
      return { d: `M${sx},${sy} C${c1x},${sy} ${c2x},${ty} ${tx},${ty}`, mx, my };
    }

    function cardHTML(ch, id, p) {
      const delay = Math.round(p.depth * 110 + (p.x / 30));
      const left = p.x - CW / 2 + PAD, top = p.y + PAD;
      if (id.startsWith('_')) {
        const u = (ch.units && ch.units[id]) || { label: id };
        return `<div class="card unit-card enter" style="left:${left}px;top:${top}px;--d:${delay}ms" title="${esc(u.note || '')}"><div class="card-body"><div class="card-name">${esc(u.label)}</div></div></div>`;
      }
      const c = C.get(id);
      if (!c) return '';
      const role = (ch.roles && ch.roles[id]) || c.title || c.role;
      const tag = ch.tags && ch.tags[id];
      return `<button type="button" class="card enter" data-id="${id}" style="left:${left}px;top:${top}px;--fc:${fColor(c.faction)};--d:${delay}ms" title="${esc(c.name)}">
        ${avatar(c)}
        <span class="card-body">
          <span class="card-name">${esc(cardName(c))}</span>
          <span class="card-role">${esc(role)}</span>
          ${tag ? `<span class="card-tag">${esc(tag)}</span>` : ''}
        </span>
        <span class="stamp-slot"></span>
      </button>`;
    }

    function renderLegend(ch) {
      const facs = [...new Set([...ch.members].map(id => C.get(id)?.faction).filter(Boolean))];
      const items = facs.map(f => `<span class="legend-item"><span class="legend-swatch" style="--fc:${fColor(f)}"></span>${esc(fLabel(f))}</span>`);
      if (ch.dotted.size || (ch.extra && ch.extra.length)) items.push(`<span class="legend-item"><svg width="22" height="6" aria-hidden="true"><path d="M1 3H21" stroke="var(--sodium)" stroke-width="1.6" stroke-dasharray="2 4" stroke-linecap="round"/></svg>Unofficial line</span>`);
      $('#boardLegend').innerHTML = items.join('');
    }

    function show(anim) {
      chart = CHARTS.get(state.chart) || CHARTS.values().next().value;
      state.chart = chart.id;
      $('#boardKicker').textContent = chart.kicker;
      $('#boardTitle').textContent = chart.title;
      $('#boardBlurb').textContent = chart.blurb;
      $$('button', sw).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.chart === chart.id)));
      renderLegend(chart);

      layout = doLayout(chart);
      const W = layout.width + PAD * 2, H = layout.height + PAD * 2;
      stage.style.width = W + 'px';
      stage.style.height = H + 'px';
      svg.setAttribute('width', W);
      svg.setAttribute('height', H);

      const paths = layout.links.map(l =>
        `<path class="${chart.dotted.has(l.c) ? 'dotted' : ''}" data-p="${l.p}" data-c="${l.c}" d="${l.d}"/>`).join('');
      const extras = (chart.extra || []).map(([a, b, label]) => {
        const pa = layout.pos.get(a), pb = layout.pos.get(b);
        if (!pa || !pb) return '';
        const e = extraPath(pa, pb);
        return `<path class="dotted extra" data-p="${b}" data-c="${a}" d="${e.d}" style="stroke:var(--sodium);opacity:.75"/>` +
          `<text x="${e.mx + 6}" y="${e.my}" style="font:500 10px var(--f-mono);fill:var(--sodium);letter-spacing:.06em" dominant-baseline="middle">${esc(label)}</text>`;
      }).join('');
      svg.innerHTML = `<g transform="translate(${PAD},${PAD})">${paths}${extras}</g><g class="pulses" transform="translate(${PAD},${PAD})"></g>`;
      cardsEl.innerHTML = [...layout.pos].map(([id, p]) => cardHTML(chart, id, p)).join('');

      if (anim && !reduced()) {
        $$('path', svg).forEach(p => {
          if (p.classList.contains('extra')) return;
          const len = Math.ceil(p.getTotalLength());
          const c = layout.pos.get(p.dataset.c);
          p.style.setProperty('--len', len);
          p.style.animationDelay = `${Math.round((c ? c.depth : 1) * 110 - 40)}ms`;
          p.classList.add('draw');
          p.addEventListener('animationend', () => { p.classList.remove('draw'); p.style.removeProperty('--len'); }, { once: true });
        });
      } else {
        $$('.card', cardsEl).forEach(c => c.classList.remove('enter'));
      }
      statusPass(null);
      highlight();
      if (state.sel && chart.members.has(state.sel)) focus(state.sel, true);
      else fit(anim ? 650 : 0);
      started = true;
      dirty = false;
    }

    function transformFor(W, H) {
      const vw = canvas.clientWidth, vh = canvas.clientHeight;
      const top = overlayBottom('board');
      const bottom = narrow() ? 64 : 70;
      const left = 16, right = 16 + dossierInset();
      const aw = Math.max(120, vw - left - right), ah = Math.max(120, vh - top - bottom);
      const k = clamp(Math.min(aw / W, ah / H), 0.18, 1.05);
      return d3.zoomIdentity.translate(left + (aw - W * k) / 2, top + (ah - H * k) / 2).scale(k);
    }

    function fit(ms = 600) {
      if (!layout) return;
      const t = transformFor(layout.width + PAD * 2, layout.height + PAD * 2);
      const sel = d3.select(canvas);
      (ms && !reduced() ? sel.transition().duration(ms).ease(d3.easeCubicOut) : sel).call(zoom.transform, t);
    }

    function focus(id, force) {
      const p = layout && layout.pos.get(id);
      if (!p) return;
      const t = d3.zoomTransform(canvas);
      const k = Math.max(t.k, narrow() ? 0.6 : 0.7);
      const vw = canvas.clientWidth, vh = canvas.clientHeight;
      const cx = p.x + PAD, cy = p.y + PAD + CH / 2;
      const sx = t.x + cx * t.k, sy = t.y + cy * t.k;
      const availR = vw - dossierInset();
      const visTop = narrow() && state.sel ? 8 : overlayBottom('board');
      const visBottom = narrow() && state.sel ? vh * 0.3 : vh - 70;
      const inView = sx > 110 && sx < availR - 110 && sy > visTop + 20 && sy < visBottom - 20;
      if (inView && k === t.k && !force) return;
      const targetX = availR / 2;
      const targetY = (visTop + visBottom) / 2;
      const nt = d3.zoomIdentity.translate(targetX - cx * k, targetY - cy * k).scale(k);
      const sel = d3.select(canvas);
      (reduced() ? sel : sel.transition().duration(700).ease(d3.easeCubicInOut)).call(zoom.transform, nt);
    }

    function highlight() {
      if (!chart) return;
      const sel = state.sel && chart.members.has(state.sel) ? state.sel : null;
      const chain = new Set();
      let cur = sel;
      while (cur && chart.parent.has(cur)) { cur = chart.parent.get(cur); chain.add(cur); }
      const reports = new Set(sel ? (chart.children.get(sel) || []) : []);
      cardsEl.classList.toggle('has-sel', !!sel);
      svg.classList.toggle('has-sel', !!sel);
      $$('.card[data-id]', cardsEl).forEach(el => {
        const id = el.dataset.id;
        el.classList.toggle('is-sel', id === sel);
        el.classList.toggle('in-chain', chain.has(id));
        el.classList.toggle('is-report', reports.has(id));
      });
      const litKids = new Set(sel ? [sel, ...chain] : []);
      const pulses = svg.querySelector('.pulses');
      if (!pulses) return;
      pulses.innerHTML = '';
      $$('path[data-c]', svg).forEach(p => {
        const lit = !p.classList.contains('extra') && litKids.has(p.dataset.c) && chart.parent.get(p.dataset.c) === p.dataset.p;
        p.classList.toggle('lit', lit);
        if (lit && !reduced()) {
          const q = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          q.setAttribute('d', p.getAttribute('d'));
          q.setAttribute('class', 'pulse');
          pulses.appendChild(q);
        }
      });
    }

    function statusPass(slamAfter) {
      $$('.card[data-id]', cardsEl).forEach(el => {
        const c = C.get(el.dataset.id);
        const st = statusAt(c, state.ep);
        const unseen = !seen(c, state.ep);
        el.classList.toggle('is-dead', st.s === 'dead' && !unseen);
        el.classList.toggle('unseen', unseen);
        const def = STATUS[st.s];
        let html = '';
        if (unseen) html = `<span class="stamp" style="--st:var(--dim)">From ep ${c.firstEp}</span>`;
        else if (def && def.stamp) {
          const slam = slamAfter != null && st.ep > slamAfter && !reduced();
          html = `<span class="stamp${slam ? ' slam' : ''}" style="--st:${def.color}">${def.stamp}</span>`;
        }
        const slot = el.querySelector('.stamp-slot');
        if (slot.innerHTML !== html) slot.innerHTML = html;
      });
    }

    return {
      reset,
      ensure() {
        if (!started || !chart || state.chart !== chart.id) show(true);
        else if (dirty) { statusPass(null); highlight(); dirty = false; }
      },
      showChart(id) { state.chart = id; show(true); },
      onEp(prev) { if (state.view === 'board' && started) statusPass(state.ep > prev ? prev : null); else dirty = true; },
      onSelect(focusIt) {
        if (!started) return;
        const onBoard = state.view === 'board';
        if (focusIt && onBoard && state.sel && !chart.members.has(state.sel)) {
          const alt = chartsFor(state.sel)[0];
          if (alt) { state.chart = alt.id; show(true); return; }
        }
        highlight();
        if (focusIt && onBoard && state.sel) focus(state.sel);
      },
      fit,
      zoomBy(f) { const s = d3.select(canvas); (reduced() ? s : s.transition().duration(300)).call(zoom.scaleBy, f); },
      get started() { return started; },
    };
  })();

  /* ------------------------------------------------------------------
     WEB: force-directed network
     ------------------------------------------------------------------ */
  const Web = (() => {
    const canvas = $('#webCanvas');
    const svgEl = $('#webSvg');
    const svg = d3.select(svgEl);
    svg.html(`<defs>
      <marker id="mk-command" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" style="fill:var(--steel)"/></marker>
      <marker id="mk-informant" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" style="fill:var(--paper)"/></marker>
      <marker id="mk-killed" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M1.5,1.5 L8.5,8.5 M8.5,1.5 L1.5,8.5" style="stroke:var(--blood);stroke-width:2.2;stroke-linecap:round;fill:none"/></marker>
    </defs>`);
    const root = svg.append('g');
    const gLinks = root.append('g');
    const gLabels = root.append('g');
    const gNodes = root.append('g');
    const markOf = type => { const m = REL[type] && REL[type].mark; return m ? `url(#mk-${m})` : null; };
    const RADIUS = [0, 22, 16, 12];

    let started = false, entering = false, dirty = false, vNodes = [], vLinks = [], linkSel = null, nodeSel = null, labelSel = null;
    let nodes = [], nodeById = new Map(), allLinks = [], sim = null, entryTimer = null, ANCHOR = {}, LOOSE = new Set(), SX = 0.1, SY = 0.2;

    const zoom = d3.zoom()
      .scaleExtent([0.15, 3.5])
      .on('zoom', e => {
        root.attr('transform', e.transform);
        svgEl.classList.toggle('zoomed', e.transform.k > 1.35);
      });
    d3.select(canvas).call(zoom).on('dblclick.zoom', null);
    canvas.addEventListener('click', e => { if (!e.target.closest('.web-node') && state.sel) select(null); });

    // seeded jitter so the layout is the same on every load
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

    const drag = d3.drag()
      .on('start', (e, d) => { if (!e.active) sim.alphaTarget(0.15).restart(); d.fx = d.x; d.fy = d.y; })
      .on('drag', (e, d) => { d.fx = e.x; d.fy = e.y; })
      .on('end', (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; });

    // filter chips (the six groups are fixed across seasons)
    const chipSvg = g => {
      const col = GROUPS[g].color;
      const dash = { command: '', wire: '1.5 4', kin: '', allies: '7 3', violence: '5 3', law: '9 2 2 2' }[g];
      return `<svg viewBox="0 0 22 8" aria-hidden="true"><path d="M1 4H21" stroke="${col}" stroke-width="2" stroke-linecap="round" ${dash ? `stroke-dasharray="${dash}"` : ''}/></svg>`;
    };
    const filters = $('#webFilters');
    filters.innerHTML = GROUP_ORDER.map(g =>
      `<button type="button" class="chip" data-g="${g}" aria-pressed="true">${chipSvg(g)}${esc(GROUPS[g].label)}</button>`).join('');
    filters.addEventListener('click', e => {
      const b = e.target.closest('.chip');
      if (!b) return;
      const g = b.dataset.g;
      if (state.groups.has(g)) state.groups.delete(g); else state.groups.add(g);
      b.setAttribute('aria-pressed', String(state.groups.has(g)));
      update();
    });

    // Factions sit side by side on wide screens and stacked on tall ones.
    // Season files give each faction an anchor; any without one are spread around an ellipse.
    function computeAnchors() {
      const portrait = canvas.clientHeight > canvas.clientWidth * 1.1;
      const ids = Object.keys(D.factions);
      const auto = ids.filter(f => !D.factions[f].anchor);
      ANCHOR = {};
      LOOSE = new Set(ids.filter(f => D.factions[f].loose));
      ids.forEach(f => {
        let a = D.factions[f].anchor;
        if (!a) {
          const i = auto.indexOf(f), ang = -Math.PI / 2 + (i / auto.length) * Math.PI * 2;
          a = [Math.cos(ang) * 470, Math.sin(ang) * 220];
        }
        ANCHOR[f] = portrait ? [a[1] * 0.8, a[0] * 0.9] : a;
      });
      SX = portrait ? 0.2 : 0.1; SY = portrait ? 0.1 : 0.2;
    }

    function reset() {
      if (sim) sim.stop();
      if (entryTimer) entryTimer.stop();
      gLinks.selectAll('*').remove(); gLabels.selectAll('*').remove(); gNodes.selectAll('*').remove();
      linkSel = nodeSel = labelSel = null;
      started = entering = dirty = false;
      computeAnchors();
      seed = 7;
      nodes = D.characters.map(c => {
        const a = ANCHOR[c.faction] || [0, 0];
        return { id: c.id, c, r: RADIUS[c.tier || 3], x: a[0] + (rand() - 0.5) * 160, y: a[1] + (rand() - 0.5) * 160 };
      });
      nodeById = new Map(nodes.map(n => [n.id, n]));
      allLinks = D.relationships
        .filter(r => nodeById.has(r.s) && nodeById.has(r.t) && REL[r.type])
        .map(r => ({ r, source: nodeById.get(r.s), target: nodeById.get(r.t), g: REL[r.type].g }));
      // spread parallel links between the same two people
      const pairs = new Map();
      allLinks.forEach(l => push(pairs, [l.r.s, l.r.t].sort().join('|'), l));
      pairs.forEach(list => list.forEach((l, i) => {
        const n = list.length;
        let cv = n === 1 ? 0.08 : (i - (n - 1) / 2) * 0.3 + 0.04;
        if (l.r.s > l.r.t) cv = -cv;
        l.curve = cv;
      }));
      const anchorStrength = (d, s) => (LOOSE.has(d.c.faction) ? s * 0.35 : s);
      sim = d3.forceSimulation(nodes)
        .randomSource(rand)
        .force('link', d3.forceLink([]).id(d => d.id)
          .distance(l => ((REL[l.r.type] && REL[l.r.type].dist) || 90) + l.source.r + l.target.r)
          .strength(l => (l.source.c.faction === l.target.c.faction ? 0.32 : 0.04)))
        .force('charge', d3.forceManyBody().strength(d => -230 - d.r * 12).distanceMax(420))
        .force('collide', d3.forceCollide(d => d.r + 22).iterations(2))
        .force('x', d3.forceX(d => (ANCHOR[d.c.faction] || [0])[0]).strength(d => anchorStrength(d, SX)))
        .force('y', d3.forceY(d => (ANCHOR[d.c.faction] || [0, 0])[1]).strength(d => anchorStrength(d, SY)))
        .stop();
      sim.on('tick', draw);
      $('#webLegend').innerHTML = Object.keys(D.factions).map(f =>
        `<span class="legend-item"><span class="legend-swatch" style="--fc:${fColor(f)}"></span>${esc(D.factions[f].label)}</span>`).join('') +
        `<span class="legend-item"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="var(--dim)" stroke-width="1.6" stroke-dasharray="2.5 2.5"/></svg>Dead</span>`;
    }

    function computeVisible() {
      vNodes = nodes.filter(n => seen(n.c, state.ep));
      const ids = new Set(vNodes.map(n => n.id));
      vLinks = allLinks.filter(l => state.groups.has(l.g) && ids.has(l.source.id) && ids.has(l.target.id) && (l.r.ep || 0) <= state.ep);
    }

    const shorten = (n, cx, cy, d) => {
      const vx = cx - n.x, vy = cy - n.y, L = Math.hypot(vx, vy) || 1;
      return [n.x + (vx / L) * d, n.y + (vy / L) * d];
    };
    function geom(l) {
      const s = l.source, t = l.target;
      const dx = t.x - s.x, dy = t.y - s.y, len = Math.hypot(dx, dy) || 1;
      const off = l.curve * len;
      const cx = (s.x + t.x) / 2 - (dy / len) * off, cy = (s.y + t.y) / 2 + (dx / len) * off;
      const a = shorten(s, cx, cy, s.r + 3);
      const b = shorten(t, cx, cy, t.r + (markOf(l.r.type) ? 6 : 3));
      return { a, b, cx, cy };
    }
    function draw() {
      if (!linkSel) return;
      linkSel.attr('d', l => { const g = geom(l); return `M${g.a[0]},${g.a[1]}Q${g.cx},${g.cy} ${g.b[0]},${g.b[1]}`; });
      nodeSel.attr('transform', d => `translate(${d.x},${d.y})`);
      if (labelSel) labelSel.each(function (d) {
        // sit the label out toward the neighbor so labels fan out around the selected person
        const g = geom(d.l), t = d.fromSel ? 0.66 : 0.34, u = 1 - t;
        this.setAttribute('x', u * u * g.a[0] + 2 * u * t * g.cx + t * t * g.b[0]);
        this.setAttribute('y', u * u * g.a[1] + 2 * u * t * g.cy + t * t * g.b[1] - 5);
      });
    }

    function join() {
      linkSel = gLinks.selectAll('path.web-link').data(vLinks, l => l.r.i).join(
        enter => enter.append('path')
          .attr('class', l => `web-link g-${l.g} t-${l.r.type}`)
          .attr('marker-end', l => markOf(l.r.type))
          .call(p => { if (started && !reduced()) p.style('animation', l => l.g === 'wire' ? null : 'fade-in .6s both'); }),
        update => update,
        exit => exit.remove());

      nodeSel = gNodes.selectAll('g.web-node').data(vNodes, d => d.id).join(
        enter => {
          const g = enter.append('g')
            .attr('class', d => `web-node${d.c.tier >= 3 ? ' minor' : ''}`)
            .attr('tabindex', 0)
            .attr('role', 'button')
            .attr('aria-label', d => `${d.c.name}, ${d.c.title}`)
            .style('--fc', d => fColor(d.c.faction));
          g.append('circle').attr('class', 'glow').attr('r', d => d.r + 7);
          g.append('circle').attr('class', 'ring').attr('r', d => d.r);
          g.append('text').attr('class', 'ini').style('font-size', d => Math.round(d.r * 0.74) + 'px').text(d => initials(d.c));
          g.append('text').attr('class', 'name').attr('y', d => d.r + 15).text(d => shortName(d.c));
          g.append('path').attr('class', 'x').attr('d', d => { const o = d.r * 0.72, s = 3.5; return `M${o - s},${-o - s}L${o + s},${-o + s}M${o + s},${-o - s}L${o - s},${-o + s}`; });
          g.on('click', (e, d) => { e.stopPropagation(); select(d.id); })
            .on('keydown', (e, d) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(d.id); } })
            .call(drag);
          if (started && !reduced()) g.style('animation', 'fade-in .6s both');
          return g;
        },
        update => update,
        exit => exit.remove());
      statusPass();
    }

    function statusPass() {
      if (!nodeSel) return;
      nodeSel.classed('is-dead', d => statusAt(d.c, state.ep).s === 'dead');
      nodeSel.select('path.x').style('display', d => (statusAt(d.c, state.ep).s === 'dead' ? null : 'none'));
    }

    function linkLabel(l, sel) {
      if (l.r.tag) return l.r.tag;
      const def = REL[l.r.type];
      if (def.edge) return l.source.id === sel ? def.edge[0] : def.edge[1];
      return def.label.toLowerCase();
    }

    function highlight() {
      if (!nodeSel) return;
      const sel = state.sel && vNodes.some(n => n.id === state.sel) ? state.sel : null;
      svgEl.classList.toggle('has-sel', !!sel);
      const near = new Set(sel ? [sel] : []);
      const hot = [];
      if (sel) vLinks.forEach(l => {
        if (l.source.id === sel || l.target.id === sel) { hot.push(l); near.add(l.source.id); near.add(l.target.id); }
      });
      nodeSel.classed('is-sel', d => d.id === sel).classed('near', d => near.has(d.id));
      linkSel.classed('hot', l => hot.includes(l));
      if (sel) nodeSel.filter(d => near.has(d.id)).raise();
      // one label per neighbor, combining every tie to that person
      const byOther = new Map();
      hot.forEach(l => push(byOther, l.source.id === sel ? l.target.id : l.source.id, l));
      const labels = [...byOther].map(([other, ls]) => ({
        other, l: ls[0], fromSel: ls[0].source.id === sel,
        text: [...new Set(ls.map(x => linkLabel(x, sel)))].join(' · '),
      }));
      labelSel = gLabels.selectAll('text').data(labels, d => d.other).join('text')
        .attr('class', 'web-label')
        .text(d => d.text);
      draw();
      return near;
    }

    function fitTo(list, ms = 700, maxK = 1.6) {
      if (!list.length) return;
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      list.forEach(n => { x0 = Math.min(x0, n.x - n.r); y0 = Math.min(y0, n.y - n.r); x1 = Math.max(x1, n.x + n.r); y1 = Math.max(y1, n.y + n.r + 18); });
      const pad = 40;
      x0 -= pad; y0 -= pad; x1 += pad; y1 += pad;
      const vw = canvas.clientWidth, vh = canvas.clientHeight;
      const top = narrow() && state.sel ? 8 : overlayBottom('web');
      const bottom = narrow() ? (state.sel ? vh * 0.7 : 60) : 70;
      const left = 16, right = 16 + dossierInset();
      const aw = Math.max(120, vw - left - right), ah = Math.max(100, vh - top - bottom);
      const k = clamp(Math.min(aw / (x1 - x0), ah / (y1 - y0)), 0.15, maxK);
      const t = d3.zoomIdentity.translate(left + aw / 2 - (k * (x0 + x1)) / 2, top + ah / 2 - (k * (y0 + y1)) / 2).scale(k);
      const s = d3.select(canvas);
      (ms && !reduced() ? s.transition().duration(ms).ease(d3.easeCubicInOut) : s).call(zoom.transform, t);
    }

    function start() {
      computeVisible();
      sim.nodes(vNodes);
      sim.force('link').links(vLinks);
      sim.alpha(1);
      for (let i = 0; i < 360; i++) sim.tick();
      join();
      fitTo(vNodes, 0, 1.4);
      started = true;
      if (reduced()) { draw(); highlight(); return; }
      // entrance: everyone flies out from their faction's corner to their settled spot
      const fin = new Map(vNodes.map(n => [n.id, [n.x, n.y]]));
      const order = [...vNodes].sort((a, b) => (a.c.tier - b.c.tier) || (a.c.idx - b.c.idx));
      order.forEach((n, i) => {
        const a = ANCHOR[n.c.faction] || [0, 0];
        n.sx = a[0] * 0.35; n.sy = a[1] * 0.35; n.delay = i * 9;
        n.x = n.sx; n.y = n.sy;
      });
      nodeSel.style('opacity', 0);
      linkSel.style('opacity', 0);
      entering = true;
      entryTimer = d3.timer(el => {
        let done = true;
        vNodes.forEach(n => {
          const p = clamp((el - n.delay) / 950, 0, 1);
          if (p < 1) done = false;
          const e = d3.easeCubicOut(p);
          const [fx, fy] = fin.get(n.id);
          n.x = n.sx + (fx - n.sx) * e;
          n.y = n.sy + (fy - n.sy) * e;
        });
        nodeSel.style('opacity', d => clamp((el - d.delay) / 300, 0, 1));
        linkSel.style('opacity', clamp((el - 500) / 700, 0, 1) * 0.5);
        draw();
        if (done) {
          entryTimer.stop();
          entryTimer = null;
          entering = false;
          nodeSel.style('opacity', null);
          linkSel.style('opacity', null);
          if (dirty) update();
          highlight();
          if (state.sel) focusSel();
        }
      });
    }

    function update() {
      if (!started || entering || state.view !== 'web') { dirty = true; return; }
      computeVisible();
      sim.nodes(vNodes);
      sim.force('link').links(vLinks);
      join();
      highlight();
      if (reduced()) { sim.alpha(0.5); for (let i = 0; i < 120; i++) sim.tick(); draw(); }
      else sim.alpha(0.45).restart();
      dirty = false;
    }

    function focusSel() {
      if (!state.sel || !nodeById.has(state.sel)) return;
      const near = highlight();
      const list = vNodes.filter(n => near && near.has(n.id));
      if (list.length) fitTo(list, 800, 1.5);
    }

    return {
      reset,
      ensure() {
        if (!started) start();
        else if (dirty) update();
      },
      onEp() { update(); },
      onSelect(focusIt) {
        if (!started || entering) return;
        highlight();
        if (focusIt && state.sel && state.view === 'web') focusSel();
      },
      fit() { fitTo(vNodes, 600, 1.4); },
      zoomBy(f) { const s = d3.select(canvas); (reduced() ? s : s.transition().duration(300)).call(zoom.scaleBy, f); },
      get started() { return started; },
    };
  })();

  /* ------------------------------------------------------------------
     LADDERS: promotion paths
     ------------------------------------------------------------------ */
  const Ladders = (() => {
    const el = $('#ladders');
    const pathEl = $('#pathCard');
    const picks = $('#quickPicks');
    let dirty = true;

    picks.addEventListener('click', e => { const b = e.target.closest('.pick'); if (b) select(b.dataset.id); });
    el.addEventListener('click', e => { const b = e.target.closest('.person'); if (b) select(b.dataset.id); });
    pathEl.addEventListener('click', e => { const b = e.target.closest('[data-id]'); if (b) select(b.dataset.id); });

    function reset() {
      picks.innerHTML = '<span class="label">Try</span>' + (D.quickPicks || []).filter(id => C.has(id)).map(id => {
        const c = C.get(id);
        return `<button type="button" class="pick" data-id="${id}" aria-pressed="false">${avatar(c, 'xs')}${esc(shortName(c))}</button>`;
      }).join('');
      dirty = true;
    }

    const occupants = (L, rung) => D.characters.filter(c =>
      c.ladder && c.ladder.track === L.id && rungAt(c, state.ep) === rung && seen(c, state.ep));
    const anyLadder = () => ((D.ladders || []).length === 2 ? 'either ladder' : 'any ladder');

    function personChip(c) {
      const st = statusAt(c, state.ep);
      const def = STATUS[st.s];
      const tag = def && def.stamp ? `<span class="st" style="--st:${def.color}">${esc(def.label)}</span>` : '';
      return `<button type="button" class="person${st.s === 'dead' ? ' is-dead' : ''}${state.sel === c.id ? ' is-sel' : ''}" data-id="${c.id}">${avatar(c, 'xs')}<span class="nm">${esc(shortName(c))}</span>${tag}</button>`;
    }

    function render() {
      const sel = state.sel && C.get(state.sel);
      el.innerHTML = (D.ladders || []).map(L => {
        const here = sel && sel.ladder && sel.ladder.track === L.id ? rungAt(sel, state.ep) : null;
        const hereIdx = here ? L.rungs.findIndex(r => r.id === here) : -1;
        const rungs = L.rungs.map((r, i) => {
          const occ = occupants(L, r.id);
          const cls = i === hereIdx ? ' is-here' : (hereIdx > -1 && i < hereIdx ? ' is-above' : '');
          return `<li class="rung${cls}" data-r="${r.id}">
            <span class="rung-node"></span>
            <div>
              <div class="rung-title">${esc(r.title)}${r.aka ? `<span class="label">${esc(r.aka)}</span>` : ''}</div>
              <p class="rung-blurb">${esc(r.blurb)}</p>
              <div class="rung-people">${occ.map(personChip).join('')}</div>${!occ.length && r.none ? `<div class="rung-none">${esc(r.none)}</div>` : ''}
            </div>
          </li>`;
        }).join('');
        return `<article class="ladder ${L.id}${hereIdx > -1 ? ' has-path' : ''}" data-l="${L.id}" style="--lc:${ladderColor(L)}">
          <header class="ladder-head">
            <div class="label">${esc(L.org)}</div>
            <h3>${esc(L.title)}</h3>
            <p>${esc(L.blurb)}</p>
          </header>
          <div class="rungs-wrap">
            <div class="rail"></div>
            <div class="rail-fill" style="opacity:0"></div>
            <ol class="rungs">${rungs}</ol>
          </div>
          <ul class="levers">${(L.levers || []).map(v => `<li><span><b>${esc(v.b)}</b> ${esc(v.text)}</span></li>`).join('')}</ul>
        </article>`;
      }).join('');
      $$('.pick', picks).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.id === state.sel)));
      renderPath(sel);
      requestAnimationFrame(rails);
    }

    function rails() {
      $$('.ladder', el).forEach(art => {
        const fill = $('.rail-fill', art);
        const here = $('.rung.is-here', art);
        const first = $('.rung', art);
        if (!here || !first) { fill.style.opacity = '0'; return; }
        const wrap = $('.rungs-wrap', art).getBoundingClientRect();
        const a = $('.rung-node', first).getBoundingClientRect();
        const b = $('.rung-node', here).getBoundingClientRect();
        const top = a.top + a.height / 2 - wrap.top;
        const bottom = b.top + b.height / 2 - wrap.top;
        fill.style.top = top + 'px';
        fill.style.height = Math.max(0, bottom - top) + 'px';
        fill.style.opacity = bottom - top > 1 ? '1' : '0';
      });
    }

    function renderPath(c) {
      if (!c) {
        pathEl.innerHTML = `<div class="path-card"><div>
          <h4>Pick someone to trace their path</h4>
          <p>Tap any name on ${anyLadder()}, or one of the suggestions above. You'll see their rung, every rung above it, who holds each one as of episode ${state.ep}, and every move they made during the season.</p>
        </div></div>`;
        return;
      }
      if (!c.ladder) {
        pathEl.innerHTML = `<div class="path-card" style="--lc:${fColor(c.faction)}">${avatar(c, 'lg')}<div>
          <div class="label">${esc(fLabel(c.faction))}</div>
          <h4>${esc(c.name)} is not on ${anyLadder()}</h4>
          <p>${esc(c.offLadder || c.role)}</p>
        </div></div>`;
        return;
      }
      const L = LADDERS.get(c.ladder.track);
      const r = rungAt(c, state.ep);
      const idx = L.rungs.findIndex(x => x.id === r);
      const above = L.rungs.slice(0, idx).reverse();
      const stepHTML = (rung, i, isHere) => {
        const occ = occupants(L, rung.id).filter(o => o.id !== c.id);
        const live = occ.filter(o => !OUT_OF_PLAY.has(statusAt(o, state.ep).s));
        let who, open = false;
        if (isHere) who = 'Current rung';
        else if (live.length) who = live.map(shortName).join(', ');
        else if (occ.length) {
          open = true;
          const gone = occ.filter(o => statusAt(o, state.ep).s !== 'dead').map(o => `${shortName(o)} ${STATUS[statusAt(o, state.ep).s].label.toLowerCase()}`);
          who = 'Open' + (gone.length ? ': ' + gone.join(', ') : '');
        } else who = rung.none || 'Open';
        return `<span class="path-step${isHere ? ' here' : ''}${open ? ' open' : ''}" style="--d:${i * 70}ms"><b>${esc(rung.title)}</b><span>${esc(who)}</span></span>`;
      };
      const steps = [stepHTML(L.rungs[idx], 0, true), ...above.map((rg, i) => `<span class="path-arrow" aria-hidden="true">&rarr;</span>` + stepHTML(rg, i + 1, false))].join('');
      const st = statusAt(c, state.ep);
      const blocked = above.length
        ? `${above.length} ${above.length === 1 ? 'rung' : 'rungs'} from the top. ${c.pathNote ? esc(c.pathNote) : ''}`
        : `Top of the ladder. ${c.pathNote ? esc(c.pathNote) : ''}`;
      const moves = (c.ladder.moves || []).map(m => {
        const sym = { up: '&uarr;', down: '&darr;', side: '&harr;', out: '&times;' }[m.dir] || '&middot;';
        const cls = m.dir === 'up' ? 'up' : (m.dir === 'down' || m.dir === 'out') ? 'down' : 'side';
        return `<li style="${m.ep > state.ep ? 'opacity:.45' : ''}"><span class="mv-ep">EP ${m.ep}</span><span class="dir ${cls}">${sym}</span><span>${esc(m.text)}</span></li>`;
      }).join('');
      pathEl.innerHTML = `<div class="path-card" style="--lc:${ladderColor(L)}">
        ${avatar(c, 'lg')}
        <div>
          <div class="label">${esc(L.title)} &middot; ${esc(L.org)}${st.s !== 'active' ? ` &middot; ${esc(STATUS[st.s].label)} as of ep ${state.ep}` : ''}</div>
          <h4>${esc(c.name)}: ${esc(L.rungs[idx].title)}</h4>
          <p>${blocked}</p>
        </div>
        <div class="path-steps">${steps}</div>
        ${moves ? `<ul class="moves">${moves}</ul>` : ''}
      </div>`;
    }

    return {
      reset,
      ensure() { if (dirty) { render(); dirty = false; } else rails(); },
      refresh() { if (state.view === 'ladder') render(); else dirty = true; },
      rails,
    };
  })();

  /* ------------------------------------------------------------------
     EPISODES
     ------------------------------------------------------------------ */
  function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso + 'T12:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  const Episodes = (() => {
    const list = $('#eps');
    list.addEventListener('click', e => {
      const who = e.target.closest('button[data-id]');
      if (who) { e.stopPropagation(); select(who.dataset.id); return; }
      const li = e.target.closest('.ep');
      if (li) setEp(+li.dataset.n);
    });
    list.addEventListener('keydown', e => {
      const li = e.target.closest('.ep');
      if (li && (e.key === 'Enter' || e.key === ' ') && e.target === li) { e.preventDefault(); setEp(+li.dataset.n); }
    });
    function reset() {
      list.innerHTML = D.episodes.map(ep => `
        <li class="ep" data-n="${ep.n}" tabindex="0" aria-label="Episode ${ep.n}: ${esc(ep.title)}">
          <div class="ep-top">
            <h2 class="ep-title">${esc(ep.title)}</h2>
            <div class="ep-meta">EP ${ep.n} &middot; ${esc(formatDate(ep.air))}${ep.writer ? ` &middot; Written by ${esc(ep.writer)}` : ''}${ep.director ? ` &middot; Directed by ${esc(ep.director)}` : ''}</div>
          </div>
          ${ep.epigraph ? `<p class="ep-quote">${esc(ep.epigraph)}<cite>${esc(ep.speaker || '')}</cite></p>` : ''}
          <p class="ep-summary">${esc(ep.summary)}</p>
          <ul class="ep-events">${(ep.events || []).map(ev => `
            <li><span class="ev-type" style="--tc:${EVENT[ev.type] || EVENT.other}">${esc(ev.type)}</span>
              <span>${esc(ev.text)}<span class="ev-who">${(ev.who || []).filter(id => C.has(id)).map(id => {
                const c = C.get(id);
                return `<button type="button" data-id="${id}" style="--fc:${fColor(c.faction)}">${esc(shortName(c))}</button>`;
              }).join('')}</span></span></li>`).join('')}
          </ul>
        </li>`).join('');
      refresh();
    }
    function refresh() {
      $$('.ep', list).forEach(li => {
        const n = +li.dataset.n;
        li.classList.toggle('is-current', n === state.ep);
        li.classList.toggle('is-future', n > state.ep);
      });
    }
    return {
      reset,
      refresh,
      ensure(scroll) {
        refresh();
        if (scroll) {
          const cur = $(`.ep[data-n="${state.ep}"]`, list);
          if (cur) cur.scrollIntoView({ block: 'center', behavior: reduced() ? 'auto' : 'smooth' });
        }
      },
    };
  })();

  /* ------------------------------------------------------------------
     ARCS: one person across every season up to the selected one
     ------------------------------------------------------------------ */
  const Arcs = (() => {
    const listEl = $('#arcsList');
    const detailEl = $('#arcDetail');
    const filterEl = $('#arcsFilter');
    const noteEl = $('#arcsNote');
    let dirty = true, people = [], filter = '';

    const visible = () => SEASONS.filter(S => S.season <= state.season).map(ctxOf);
    const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

    function buildPeople() {
      const byId = new Map();
      visible().forEach(ctx => ctx.S.characters.forEach(c => {
        if (!byId.has(c.id)) byId.set(c.id, { id: c.id, recs: [] });
        byId.get(c.id).recs.push({ ctx, c });
      }));
      people = [...byId.values()].map(p => ({
        ...p,
        last: p.recs[p.recs.length - 1],
        count: p.recs.length,
        tier: Math.min(...p.recs.map(r => r.c.tier || 3)),
        hay: norm(p.recs.map(r => [r.c.name, r.c.short, r.c.alias, r.c.full, r.c.actor].join(' ')).join(' ')),
      })).sort((a, b) => b.count - a.count || a.tier - b.tier || a.last.c.name.localeCompare(b.last.c.name));
    }
    const find = id => people.find(p => p.id === id);

    function pick() {
      if (state.arcSel && find(state.arcSel)) return find(state.arcSel);
      const qp = (D.quickPicks || []).map(find).filter(Boolean);
      return qp.find(p => p.count > 1) || people.find(p => p.count > 1 && p.tier === 1) || qp[0] || people[0];
    }

    function dots(p) {
      const has = new Map(p.recs.map(r => [r.ctx.n, r]));
      return visible().map(ctx => {
        const r = has.get(ctx.n);
        return r ? `<i class="on" style="--fc:${fColor(r.c.faction, r.ctx)}" title="Season ${ctx.n}"></i>` : `<i title="Not in Season ${ctx.n}"></i>`;
      }).join('');
    }

    function renderList(selId) {
      const many = visible().length > 1;
      const shown = people.filter(p => !filter || p.hay.includes(filter));
      const row = p => `<button type="button" class="arc-person${p.id === selId ? ' is-sel' : ''}" data-id="${p.id}">
          ${avatar(p.last.c, 'xs', p.last.ctx)}<span class="ap-name">${esc(p.last.c.name)}</span><span class="ap-dots">${dots(p)}</span></button>`;
      if (!shown.length) { listEl.innerHTML = `<p class="arcs-empty">Nobody matches that.</p>`; return; }
      if (!many) { listEl.innerHTML = shown.map(row).join(''); return; }
      const multi = shown.filter(p => p.count > 1), single = shown.filter(p => p.count === 1);
      listEl.innerHTML = (multi.length ? `<div class="label arcs-group">In more than one season</div>${multi.map(row).join('')}` : '') +
        (single.length ? `<div class="label arcs-group">One season only</div>${single.map(row).join('')}` : '');
    }

    // per-season facts for one record
    function factsOf(rec) {
      const { ctx, c } = rec;
      const L = c.ladder ? ctx.LADDERS.get(c.ladder.track) : null;
      const startId = c.ladder ? c.ladder.rung : null;
      const endId = c.ladder ? rungAt(c, ctx.maxEp) : null;
      const rungTitle = id => (L && L.rungs.find(r => r.id === id) || {}).title || null;
      const st = statusAt(c, ctx.maxEp);
      const chain = chainOf(c.id, ctx).map(id => ctx.C.get(id));
      return { ctx, c, L, startId, endId, start: rungTitle(startId), end: rungTitle(endId), st, stDef: ctx.STATUS[st.s] || {}, boss: chain[chain.length - 1] || null, chain };
    }

    function columnHTML(ctx, rec, i) {
      const head = `<div class="arc-col-head"><span class="label">Season ${ctx.n} &middot; ${ctx.S.year}</span>`;
      if (!rec) return `<div class="arc-col absent" data-n="${ctx.n}">${head}<b>Not in this season</b></div><div class="arc-off"><p>${esc(seasonLabel(ctx.S))} has no record of them.</p></div></div>`;
      const f = factsOf(rec);
      const fc = fColor(f.c.faction, ctx);
      const stamp = f.stDef.stamp ? `<span class="arc-stamp" style="--st:${f.stDef.color}">${esc(f.stDef.stamp)}${f.st.ep ? ` &middot; ep ${f.st.ep}` : ''}</span>` : `<span class="arc-stamp quiet">Active at the finale</span>`;
      if (!f.L) {
        return `<div class="arc-col off" data-n="${ctx.n}" style="--fc:${fc};--d:${i * 90}ms">${head}<b>Off the ladders</b><span class="sub">${esc(fLabel(f.c.faction, ctx))}</span></div>
          <div class="arc-off"><p class="arc-off-title">${esc(f.c.title)}</p><p>${esc(f.c.offLadder || f.c.role)}</p></div>
          <div class="arc-col-foot">${stamp}</div></div>`;
      }
      const dead = f.st.s === 'dead';
      const rungs = f.L.rungs.map(r => {
        const isS = r.id === f.startId, isE = r.id === f.endId;
        return `<li class="arc-rung${isS ? ' start' : ''}${isE ? ' end' : ''}${isE && dead ? ' dead' : ''}" data-r="${r.id}"><span>${esc(r.title)}</span><i class="arc-dot"></i></li>`;
      }).join('');
      return `<div class="arc-col" data-n="${ctx.n}" data-track="${f.L.id}" style="--fc:${fc};--lc:${ladderColor(f.L)};--d:${i * 90}ms">${head}<b>${esc(f.L.title)}</b><span class="sub">${esc(f.L.org)}</span></div>
        <ol class="arc-rungs">${rungs}</ol>
        <div class="arc-col-foot">${stamp}</div></div>`;
    }

    function cardHTML(rec) {
      const f = factsOf(rec);
      const { ctx, c } = f;
      const moments = (c.moments || []).slice(0, 3).map(m => `<li><span class="mv-ep">EP ${m.ep}</span><span>${esc(m.text)}</span></li>`).join('');
      const rung = f.L ? (f.start === f.end ? f.start : `${f.start} → ${f.end}`) : 'Off the ladders';
      return `<article class="arc-card" style="--fc:${fColor(c.faction, ctx)}">
        <div class="label">Season ${ctx.n} &middot; ${ctx.S.year} &middot; ${esc(fShort(c.faction, ctx))}</div>
        <h4>${esc(c.title)}</h4>
        <dl class="dz-roles">
          <dt>Start</dt><dd>${esc(c.role)}</dd>
          ${c.roleEnd && c.roleEnd !== c.role ? `<dt>Finale</dt><dd>${esc(c.roleEnd)}</dd>` : ''}
          <dt>Rung</dt><dd>${esc(rung)}</dd>
          ${f.boss ? `<dt>Answers to</dt><dd>${esc(f.chain.map(shortName).join(' › '))}</dd>` : ''}
        </dl>
        ${moments ? `<ul class="moves arc-moments">${moments}</ul>` : ''}
        <button type="button" class="btn" data-open="${ctx.n}" data-id="${c.id}">Open in Season ${ctx.n}</button>
      </article>`;
    }

    function changesHTML(p) {
      const recs = p.recs;
      if (recs.length < 2) return '';
      const rows = [];
      for (let i = 1; i < recs.length; i++) {
        const a = factsOf(recs[i - 1]), b = factsOf(recs[i]);
        const diffs = [];
        if (a.c.faction !== b.c.faction) diffs.push(['Side', fLabel(a.c.faction, a.ctx), fLabel(b.c.faction, b.ctx)]);
        if (a.L && b.L && a.L.id === b.L.id && a.end !== b.start) diffs.push(['Rung', a.end, b.start]);
        if ((a.L && a.L.id) !== (b.L && b.L.id)) diffs.push(['Ladder', a.L ? a.L.title : 'Off the ladders', b.L ? b.L.title : 'Off the ladders']);
        if (a.c.unit !== b.c.unit) diffs.push(['Unit', a.c.unit, b.c.unit]);
        if (a.c.title !== b.c.title) diffs.push(['Role', a.c.title, b.c.title]);
        const bn = x => (x.boss ? x.boss.name : 'No one');
        if (bn(a) !== bn(b)) diffs.push(['Answers to', bn(a), bn(b)]);
        const gap = b.ctx.n - a.ctx.n > 1 ? `<span class="arc-gap">Not seen in Season${b.ctx.n - a.ctx.n > 2 ? 's' : ''} ${Array.from({ length: b.ctx.n - a.ctx.n - 1 }, (_, k) => a.ctx.n + k + 1).join(', ')}</span>` : '';
        rows.push(`<li><div class="arc-step-label">Season ${a.ctx.n} <span aria-hidden="true">&rarr;</span> ${b.ctx.n}${gap}</div>
          ${diffs.length ? `<div class="arc-diffs">${diffs.map(([k, x, y]) => `<span class="arc-diff"><span class="label">${esc(k)}</span>${esc(x)} <span aria-hidden="true">&rarr;</span> <b>${esc(y)}</b></span>`).join('')}</div>`
          : '<div class="arc-diffs"><span class="arc-diff quiet">Same side, same rung, same boss.</span></div>'}</li>`);
      }
      return `<section class="arc-sec"><h5 class="label">Between seasons</h5><ol class="arc-changes">${rows.join('')}</ol></section>`;
    }

    function renderDetail(p) {
      if (!p) { detailEl.innerHTML = ''; return; }
      const ctxs = visible();
      const has = new Map(p.recs.map(r => [r.ctx.n, r]));
      const c = p.last.c, ctx = p.last.ctx;
      const seasonsTxt = p.count === 1 ? `Season ${p.recs[0].ctx.n} only` : `Seasons ${p.recs.map(r => r.ctx.n).join(', ')}`;
      const cols = ctxs.map((x, i) => columnHTML(x, has.get(x.n), i)).join('');
      detailEl.innerHTML = `
        <header class="arc-head" style="--fc:${fColor(c.faction, ctx)}">
          ${avatar(c, 'lg', ctx)}
          <div>
            <div class="label">${esc(seasonsTxt)}</div>
            <h2 class="dz-name">${esc(c.name)}</h2>
            <div class="dz-alias">${c.full ? `<i>${esc(c.full)}</i> &middot; ` : ''}${c.actor ? `Played by ${esc(c.actor)}` : 'Not seen on screen'}</div>
          </div>
        </header>
        <section class="arc-sec">
          <h5 class="label">Position by season <span class="arc-key"><i class="k-start"></i>season start <i class="k-end"></i>finale</span></h5>
          <div class="arc-map-scroll"><div class="arc-map" style="--cols:${ctxs.length}">${cols}<svg class="arc-lines" aria-hidden="true"></svg></div></div>
        </section>
        <section class="arc-sec"><h5 class="label">Season by season</h5><div class="arc-cards">${p.recs.map(cardHTML).join('')}</div></section>
        ${changesHTML(p)}`;
      requestAnimationFrame(drawLines);
    }

    // connectors: start→finale inside a season, finale→next start across seasons on the same ladder
    function drawLines() {
      const map = $('.arc-map', detailEl);
      const svg = map && $('.arc-lines', map);
      if (!svg) return;
      const box = map.getBoundingClientRect();
      svg.setAttribute('width', map.scrollWidth);
      svg.setAttribute('height', map.scrollHeight);
      const center = el => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2 - box.left, r.top + r.height / 2 - box.top]; };
      const paths = [];
      let prev = null;
      $$('.arc-col', map).forEach(col => {
        const s = $('.arc-rung.start .arc-dot', col), e = $('.arc-rung.end .arc-dot', col);
        if (!s || !e) { prev = null; return; }
        const a = center(s), b = center(e);
        // across seasons: leave the earlier column at its right edge, arrive at this season's start dot
        if (prev && prev.track === col.dataset.track) {
          const x0 = prev.right, y0 = prev.endY, x1 = a[0] - 7, mx = (x0 + x1) / 2;
          paths.push(`<path class="arc-link" d="M${x0},${y0} C${mx},${y0} ${mx},${a[1]} ${x1},${a[1]}"/>`);
        }
        // within the season: curve through the left margin from start to finale
        if (Math.abs(a[1] - b[1]) > 1) {
          const up = b[1] < a[1];
          const bx = a[0] - 22;
          paths.push(`<path class="arc-move ${up ? 'up' : 'down'}" d="M${a[0] - 6},${a[1]} C${bx},${a[1]} ${bx},${b[1]} ${b[0] - 6},${b[1]}"/>`);
        }
        prev = { track: col.dataset.track, right: col.getBoundingClientRect().right - box.left, endY: b[1] };
      });
      svg.innerHTML = paths.join('');
      if (!reduced()) $$('path', svg).forEach((p, i) => {
        const len = Math.ceil(p.getTotalLength());
        p.style.setProperty('--len', len);
        p.style.animationDelay = `${200 + i * 120}ms`;
        p.classList.add('draw');
      });
    }

    function render() {
      buildPeople();
      const shown = visible().length;
      noteEl.textContent = shown > 1
        ? `Showing Seasons 1 to ${state.season}. Later seasons stay hidden until you select them.`
        : SEASONS.length > 1
          ? `Showing Season ${state.season} only: where each person starts and finishes within it. Pick a later season at the top to extend the arcs; later seasons stay hidden until you do.`
          : `${cap(seasonLabel(D))} is the only season loaded, so this shows where each person starts and finishes within it. Every season you add extends the arc.`;
      const p = pick();
      if (p) state.arcSel = p.id;
      renderList(p && p.id);
      renderDetail(p);
      dirty = false;
    }

    filterEl.addEventListener('input', () => { filter = norm(filterEl.value.trim()); renderList(state.arcSel); });
    listEl.addEventListener('click', e => {
      const b = e.target.closest('.arc-person');
      if (!b) return;
      state.arcSel = b.dataset.id;
      renderList(state.arcSel);
      renderDetail(find(state.arcSel));
      writeHash(true);
      if (narrow()) detailEl.scrollIntoView({ block: 'start', behavior: reduced() ? 'auto' : 'smooth' });
    });
    detailEl.addEventListener('click', e => {
      const b = e.target.closest('[data-open]');
      if (!b) return;
      const n = +b.dataset.open, id = b.dataset.id;
      setSeason(n, { write: false, rerender: false });
      const ch = chartsFor(id)[0];
      if (ch) state.chart = ch.id;
      setView(ch ? 'board' : 'web', { write: false });
      select(id, { write: false });
      writeHash(false);
    });

    return {
      reset() { dirty = true; },
      ensure() { if (dirty) render(); else requestAnimationFrame(drawLines); },
      redraw() { if (state.view === 'arcs') requestAnimationFrame(drawLines); },
    };
  })();

  /* ------------------------------------------------------------------
     SCRUBBER
     ------------------------------------------------------------------ */
  const Scrubber = (() => {
    const track = $('#track'), ticks = $('#ticks'), handle = $('#handle'), fill = $('#trackFill');
    const marks = n => {
      const ev = (D.episodes[n - 1].events || []);
      const deaths = ev.filter(e => e.type === 'death').length;
      const shots = ev.filter(e => e.type === 'shooting').length;
      const arrests = ev.filter(e => e.type === 'arrest' || e.type === 'raid').length;
      return '<i></i>'.repeat(deaths) + '<i class="shot"></i>'.repeat(shots) + '<i class="arr"></i>'.repeat(Math.min(arrests, 3));
    };
    function reset() {
      ticks.innerHTML = D.episodes.map(ep =>
        `<button type="button" class="tick" data-n="${ep.n}" tabindex="-1" aria-label="Episode ${ep.n}: ${esc(ep.title)}" title="${ep.n}. ${esc(ep.title)}">
          <span class="tick-marks">${marks(ep.n)}</span><span class="tick-num">${ep.n}</span><span class="tick-dot"></span></button>`).join('');
      track.setAttribute('aria-valuemax', MAX_EP);
      render(false);
    }

    const pct = n => ((n - 1) / (MAX_EP - 1)) * 100;
    function epFromX(clientX) {
      const r = track.getBoundingClientRect();
      return clamp(Math.round(((clientX - r.left) / r.width) * (MAX_EP - 1)) + 1, 1, MAX_EP);
    }
    let dragging = false;
    track.addEventListener('pointerdown', e => {
      dragging = true;
      track.classList.add('dragging');
      track.setPointerCapture(e.pointerId);
      setEp(epFromX(e.clientX));
    });
    track.addEventListener('pointermove', e => { if (dragging) setEp(epFromX(e.clientX)); });
    const end = () => { dragging = false; track.classList.remove('dragging'); };
    track.addEventListener('pointerup', end);
    track.addEventListener('pointercancel', end);
    track.addEventListener('keydown', e => {
      const k = e.key;
      if (k === 'ArrowLeft' || k === 'ArrowDown') { e.preventDefault(); setEp(state.ep - 1); }
      else if (k === 'ArrowRight' || k === 'ArrowUp') { e.preventDefault(); setEp(state.ep + 1); }
      else if (k === 'Home') { e.preventDefault(); setEp(1); }
      else if (k === 'End') { e.preventDefault(); setEp(MAX_EP); }
    });

    function render(animateQuote) {
      const ep = D.episodes[state.ep - 1];
      handle.style.left = pct(state.ep) + '%';
      fill.style.width = pct(state.ep) + '%';
      $$('.tick', ticks).forEach(t => {
        const n = +t.dataset.n;
        t.classList.toggle('past', n <= state.ep);
        t.classList.toggle('current', n === state.ep);
      });
      track.setAttribute('aria-valuenow', state.ep);
      track.setAttribute('aria-valuetext', `Episode ${state.ep}, ${ep.title}`);
      $('#scrubLabel').textContent = state.ep === MAX_EP ? 'As of the finale' : `As of episode ${state.ep}`;
      $('#scrubTitle').innerHTML = `<span>${state.ep}</span>${esc(ep.title)}`;
      const q = $('#scrubQuote');
      q.innerHTML = ep.epigraph ? `&ldquo;${esc(ep.epigraph)}&rdquo;<cite>${esc(ep.speaker || '')}</cite>` : '';
      if (animateQuote && !reduced()) { q.classList.remove('swap'); void q.offsetWidth; q.classList.add('swap'); }
    }
    return { reset, render };
  })();

  /* ------------------------------------------------------------------
     DOSSIER
     ------------------------------------------------------------------ */
  const Dossier = (() => {
    const panel = $('#dossier');
    const body = $('#dossierBody');
    const app = $('#app');
    $('#dossierClose').addEventListener('click', () => select(null));

    body.addEventListener('click', e => {
      const t = e.target.closest('[data-go],[data-id],[data-ep]');
      if (!t) return;
      if (t.dataset.go) {
        const go = t.dataset.go;
        if (go.startsWith('board:')) {
          state.chart = go.slice(6);
          if (state.view !== 'board') setView('board');
          else { Board.ensure(); Board.onSelect(true); writeHash(true); }
        } else if (go === 'arcs') {
          state.arcSel = state.sel;
          Arcs.reset();
          select(null, { write: false });
          setView('arcs');
        } else setView(go);
        return;
      }
      if (t.dataset.ep) { setEp(+t.dataset.ep); return; }
      if (t.dataset.id && t.dataset.id !== state.sel) select(t.dataset.id);
    });

    // swipe down to close on phones
    let sy = null;
    panel.addEventListener('touchstart', e => { if (body.scrollTop <= 0) sy = e.touches[0].clientY; }, { passive: true });
    panel.addEventListener('touchmove', e => { if (sy != null && e.touches[0].clientY - sy > 90 && narrow()) { sy = null; select(null); } }, { passive: true });
    panel.addEventListener('touchend', () => { sy = null; });

    function relRows(id) {
      const rows = (relIndex.get(id) || []).slice().sort((a, b) =>
        GROUP_ORDER.indexOf(REL[a.r.type].g) - GROUP_ORDER.indexOf(REL[b.r.type].g) || (a.r.ep || 0) - (b.r.ep || 0));
      return rows.map(({ r, other, out }) => {
        const o = C.get(other);
        if (!o) return '';
        const def = REL[r.type];
        const dirLabel = out ? def.out : def.in;
        const future = (r.ep || 0) > state.ep || !seen(o, state.ep);
        return `<li class="rel" data-id="${other}" style="${future ? 'opacity:.45' : ''}">
          ${avatar(o, 'sm' + (statusAt(o, state.ep).s === 'dead' ? ' is-dead' : ''))}
          <span><div class="rel-name">${esc(o.name)}</div><div class="rel-label">${esc(r.label)}</div></span>
          <span class="rel-type" style="--tc:${GROUPS[def.g].color}">${esc(dirLabel)}${r.ep ? `<small>ep ${r.ep}</small>` : ''}</span>
        </li>`;
      }).join('');
    }

    function otherSeasons(id) {
      return SEASONS.filter(S => S.season <= state.season && S.season !== state.season && S.characters.some(c => c.id === id)).map(S => S.season);
    }

    function render(id) {
      const c = C.get(id);
      const st = statusAt(c, state.ep);
      const def = STATUS[st.s] || STATUS.active;
      const unseen = !seen(c, state.ep);
      const chain = chainOf(id);
      const reports = directReports.get(id) || [];
      const charts = chartsFor(id);
      const also = otherSeasons(id);
      const statusChip = unseen
        ? `<span class="fchip status" style="--st:var(--dim)">First seen ep ${c.firstEp}</span>`
        : `<span class="fchip status" style="--st:${def.color || 'var(--sage)'}">${esc(def.label)}${st.ep ? ` &middot; ep ${st.ep}` : ''}</span>`;

      const chainHTML = chain.length || reports.length ? `
        <section class="dz-sec">
          <h5 class="label">Chain of command</h5>
          <div class="chain">
            ${chain.map(x => { const o = C.get(x); return `<button type="button" class="chain-link" data-id="${x}">${avatar(o, 'xs')}${esc(shortName(o))}</button><span class="chain-sep" aria-hidden="true">&rsaquo;</span>`; }).join('')}
            <span class="chain-link me">${avatar(c, 'xs')}${esc(shortName(c))}</span>
          </div>
          ${reports.length ? `<div class="label" style="margin:12px 0 7px">Gives orders to</div><div class="chain">${reports.map(x => { const o = C.get(x); return `<button type="button" class="chain-link" data-id="${x}">${avatar(o, 'xs')}${esc(shortName(o))}</button>`; }).join('')}</div>` : ''}
        </section>` : '';

      const moments = (c.moments || []).map(m => `
        <li class="${m.ep > state.ep ? 'future' : ''}"><button type="button" data-ep="${m.ep}" aria-label="Jump to episode ${m.ep}">EP ${m.ep}</button><span>${esc(m.text)}</span></li>`).join('');

      const actions = [
        charts.length ? `<button type="button" class="btn" data-go="board:${(charts.find(ch => ch.id === state.chart) || charts[0]).id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="5" rx="1"/><rect x="3" y="16" width="6" height="5" rx="1"/><rect x="15" y="16" width="6" height="5" rx="1"/><path d="M12 8v4M6 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/></svg>On the board</button>` : '',
        `<button type="button" class="btn" data-go="web"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="5" cy="6" r="2.5"/><circle cx="19" cy="6" r="2.5"/><circle cx="12" cy="17" r="2.5"/><path d="M7 7.5l3.5 7.5M17 7.5l-3.5 7.5"/></svg>Connections</button>`,
        c.ladder ? `<button type="button" class="btn" data-go="ladder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 2v20M17 2v20M7 6h10M7 11h10M7 16h10"/></svg>Promotion path</button>` : '',
        `<button type="button" class="btn" data-go="arcs"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18h4v-5h5V8h5V4h4"/><circle cx="3" cy="18" r="1.5"/><circle cx="21" cy="4" r="1.5"/></svg>Across seasons</button>`,
      ].join('');

      body.innerHTML = `
        <header class="dz-head" style="--fc:${fColor(c.faction)}">
          <div class="label dz-file">${esc(fLabel(c.faction))}${c.unit ? ` &middot; ${esc(c.unit)}` : ''}</div>
          <div class="dz-id">
            ${avatar(c, 'lg' + (st.s === 'dead' && !unseen ? ' is-dead' : ''))}
            <div>
              <h2 class="dz-name">${esc(c.name)}</h2>
              <div class="dz-alias">${c.full ? `<i>${esc(c.full)}</i> &middot; ` : ''}${c.alias ? `<i>&ldquo;${esc(c.alias)}&rdquo;</i> &middot; ` : ''}${c.actor ? `Played by ${esc(c.actor)}` : 'Not seen on screen'}</div>
            </div>
          </div>
          <div class="dz-chips">
            <span class="fchip" style="--fc:${fColor(c.faction)}">${esc(fShort(c.faction))}</span>
            ${statusChip}
            ${!unseen && c.firstEp > 1 ? `<span class="fchip">From ep ${c.firstEp}</span>` : ''}
            ${also.length ? `<span class="fchip">Also in S${also.join(', S')}</span>` : ''}
          </div>
        </header>

        <section class="dz-sec">
          <dl class="dz-roles">
            <dt>Start</dt><dd>${esc(c.role)}</dd>
            ${c.roleEnd && c.roleEnd !== c.role ? `<dt>Finale</dt><dd>${esc(c.roleEnd)}</dd>` : ''}
            ${st.note && !unseen ? `<dt>As of ep ${state.ep}</dt><dd>${esc(st.note)}</dd>` : ''}
          </dl>
        </section>

        ${chainHTML}

        <section class="dz-sec">
          <h5 class="label">The file</h5>
          <p class="dz-bio">${esc(c.bio)}</p>
        </section>

        ${moments ? `<section class="dz-sec"><h5 class="label">Key moments</h5><ul class="moments">${moments}</ul></section>` : ''}

        <section class="dz-sec">
          <h5 class="label">Connections &middot; ${(relIndex.get(id) || []).length}</h5>
          <ul class="rels">${relRows(id)}</ul>
        </section>

        <div class="dz-actions">${actions}</div>`;
    }

    return {
      open(id, focusClose) {
        render(id);
        body.scrollTop = 0;
        panel.classList.add('open');
        panel.setAttribute('aria-hidden', 'false');
        app.classList.add('dossier-open');
        if (focusClose) $('#dossierClose').focus({ preventScroll: true });
      },
      close() {
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
        app.classList.remove('dossier-open');
      },
      refresh() { if (state.sel) { const s = body.scrollTop; render(state.sel); body.scrollTop = s; } },
    };
  })();

  /* ------------------------------------------------------------------
     SEARCH PALETTE
     ------------------------------------------------------------------ */
  const Palette = (() => {
    const box = $('#palette');
    const input = $('#paletteInput');
    const list = $('#paletteList');
    let results = [], active = 0, lastFocus = null, hay = [];

    const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, '');
    const buildHay = () => D.characters.map(c => ({
      c,
      name: norm(c.name), alias: norm([c.alias, c.full].join(' ')), short: norm(c.short),
      rest: norm([c.title, c.role, c.unit, c.actor, fLabel(c.faction)].join(' ')),
    }));

    function search(q) {
      q = norm(q).trim();
      if (!q) return D.characters.filter(c => c.tier === 1).concat(D.characters.filter(c => c.tier === 2)).slice(0, 12);
      const scored = [];
      for (const h of hay) {
        let s = 0;
        if (h.name.startsWith(q) || h.short.startsWith(q) || h.alias.startsWith(q)) s = 100;
        else if (h.name.split(' ').some(w => w.startsWith(q)) || h.alias.split(' ').some(w => w.startsWith(q))) s = 80;
        else if (h.name.includes(q) || h.alias.includes(q) || h.short.includes(q)) s = 60;
        else if (h.rest.includes(q)) s = 30;
        if (s) scored.push([s - (h.c.tier || 3), h.c]);
      }
      return scored.sort((a, b) => b[0] - a[0]).slice(0, 14).map(x => x[1]);
    }

    function render() {
      if (!results.length) { list.innerHTML = `<li class="palette-empty">Nobody in ${esc(seasonLabel(D))} matches that. Try a first name, a nickname like &ldquo;Bunk&rdquo;, or a role like &ldquo;detective&rdquo;.</li>`; return; }
      list.innerHTML = results.map((c, i) => `
        <li role="option" id="pal-${c.id}" data-id="${c.id}" aria-selected="${i === active}">
          ${avatar(c, 'sm')}
          <span><div class="p-name">${esc(c.name)}${c.alias ? ` <span style="color:var(--dim);font-weight:500">&ldquo;${esc(c.alias)}&rdquo;</span>` : ''}</div><div class="p-role">${esc(c.title)}</div></span>
          <span class="p-fac" style="--fc:${fColor(c.faction)}">${esc(fShort(c.faction))}</span>
        </li>`).join('');
      input.setAttribute('aria-activedescendant', results[active] ? `pal-${results[active].id}` : '');
      const a = list.children[active];
      if (a && a.scrollIntoView) a.scrollIntoView({ block: 'nearest' });
    }

    function open() {
      lastFocus = document.activeElement;
      hay = buildHay();
      box.hidden = false;
      input.value = '';
      results = search('');
      active = 0;
      render();
      setTimeout(() => input.focus(), 10);
    }
    function close() {
      box.hidden = true;
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }
    function choose(id) {
      close();
      if (state.view === 'arcs') setView('board', { write: false });
      select(id, { focusClose: true });
    }

    input.addEventListener('input', () => { results = search(input.value); active = 0; render(); });
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(results.length - 1, active + 1); render(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(0, active - 1); render(); }
      else if (e.key === 'Enter') { e.preventDefault(); if (results[active]) choose(results[active].id); }
      else if (e.key === 'Escape') { e.preventDefault(); close(); }
    });
    list.addEventListener('click', e => { const li = e.target.closest('li[data-id]'); if (li) choose(li.dataset.id); });
    box.addEventListener('click', e => { if (e.target === box) close(); });
    $('#searchBtn').addEventListener('click', open);

    return { open, close, get isOpen() { return !box.hidden; } };
  })();

  /* ------------------------------------------------------------------
     Controller
     ------------------------------------------------------------------ */
  function setView(view, { write = true } = {}) {
    if (!VIEWS.includes(view)) view = 'board';
    const changed = state.view !== view;
    state.view = view;
    $$('.view').forEach(v => v.classList.toggle('is-active', v.id === 'view-' + view));
    tabs.forEach(b => {
      b.setAttribute('aria-selected', String(b.dataset.view === view));
      b.tabIndex = b.dataset.view === view ? 0 : -1;
    });
    moveInk();
    if (view === 'board') { Board.ensure(); if (changed) Board.onSelect(true); }
    if (view === 'web') { const was = Web.started; Web.ensure(); if (changed && was) Web.onSelect(true); }
    if (view === 'ladder') Ladders.ensure();
    if (view === 'episodes') Episodes.ensure(changed);
    if (view === 'arcs') Arcs.ensure();
    if (write) writeHash(false);
  }

  function select(id, { write = true, focus = true, focusClose = false } = {}) {
    const next = id && C.has(id) ? id : null;
    const changed = next !== state.sel;
    state.sel = next;
    if (next) Dossier.open(next, focusClose); else Dossier.close();
    Board.onSelect(focus && changed);
    Web.onSelect(focus && changed);
    Ladders.refresh();
    if (write) writeHash(true);
  }

  function setEp(ep) {
    ep = clamp(ep, 1, MAX_EP);
    if (ep === state.ep) return;
    const prev = state.ep;
    state.ep = ep;
    Scrubber.render(true);
    Board.onEp(prev);
    Web.onEp();
    Ladders.refresh();
    Episodes.refresh();
    Dossier.refresh();
  }

  function rebuildAll() {
    renderSeasonUI();
    applyCopy();
    Board.reset();
    Web.reset();
    Ladders.reset();
    Episodes.reset();
    Scrubber.reset();
    Arcs.reset();
  }

  // Switching season = switching how far you've watched. The episode resets to that season's finale.
  function setSeason(n, { write = true, rerender = true } = {}) {
    if (!SEASONS.some(S => S.season === n) || n === state.season) return;
    useSeason(n);
    state.season = n;
    state.ep = MAX_EP;
    if (!CHARTS.has(state.chart)) state.chart = D.charts[0].id;
    if (state.sel && !C.has(state.sel)) state.sel = null;
    store.set('wire.season', String(n));
    rebuildAll();
    if (!rerender) return;
    if (state.sel) Dossier.open(state.sel); else Dossier.close();
    setView(state.view, { write: false });
    const active = $('.view.is-active');
    if (active && !reduced()) { active.classList.remove('swap-in'); void active.offsetWidth; active.classList.add('swap-in'); }
    if (write) writeHash(false);
  }

  // zoom buttons
  $('#boardZoom').addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.z === 'fit') Board.fit(); else Board.zoomBy(b.dataset.z === 'in' ? 1.3 : 1 / 1.3);
  });
  $('#webZoom').addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.z === 'fit') Web.fit(); else Web.zoomBy(b.dataset.z === 'in' ? 1.3 : 1 / 1.3);
  });

  // keyboard
  document.addEventListener('keydown', e => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || '');
    if (Palette.isOpen) return;
    if ((e.key === '/' && !typing) || (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey))) { e.preventDefault(); Palette.open(); return; }
    if (typing) return;
    if (e.key === 'Escape' && state.sel) { select(null); return; }
    if (document.activeElement === $('#track')) return;
    if (e.key === 'ArrowLeft' && !e.altKey) { setEp(state.ep - 1); }
    else if (e.key === 'ArrowRight' && !e.altKey) { setEp(state.ep + 1); }
  });

  // brand link resets to the default board of the current season
  $('.brand').addEventListener('click', e => {
    e.preventDefault();
    state.chart = D.charts[0].id;
    select(null, { write: false });
    setView('board');
  });

  let resizeT = null;
  window.addEventListener('resize', () => {
    moveInk();
    clearTimeout(resizeT);
    resizeT = setTimeout(() => {
      if (state.view === 'board' && Board.started) Board.fit(0);
      if (state.view === 'web' && Web.started) Web.fit();
      if (state.view === 'ladder') Ladders.rails();
      Arcs.redraw();
    }, 150);
  });
  window.addEventListener('popstate', applyHash);
  window.addEventListener('hashchange', applyHash);

  /* ------------------------------------------------------------------
     Boot: the season comes from the link, then the viewer's last choice, then Season 1
     ------------------------------------------------------------------ */
  const fromHash = parseHash().season;
  const remembered = +store.get('wire.season');
  const has = n => SEASONS.some(S => S.season === n);
  const initial = has(fromHash) ? fromHash : has(remembered) ? remembered : SEASONS[0].season;
  useSeason(initial);
  state.season = initial;
  state.ep = MAX_EP;
  state.chart = D.charts[0].id;
  rebuildAll();
  const boot = () => { applyHash(); requestAnimationFrame(moveInk); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(boot); else boot();
})();
