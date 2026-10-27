/* Silicon: Moore's law under every rewind.
   Three log charts on one time axis, a year cursor that follows the Rewind dial,
   and a transistor cross-section that changes shape with the process node. */
(() => {
  "use strict";

  const D = window.MOORE;
  if (!D) return;

  const [Y0, Y1] = D.range;
  const XMAX = Y1 + 0.5;
  const BASE = 2250;            // Intel 4004, 1971: the first count every doubling starts from
  const ERA_YEARS = [2012, 2016, 2020, 2022, 2024, 2026];
  const CAREER = 2012.75;       // Oct 2012, first job in data
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  const STRUCT = {
    planar: { name: "Planar", note: "The gate sits on top of a flat channel." },
    finfet: { name: "FinFET", note: "The channel stands up as a fin; the gate wraps three sides." },
    gaa: { name: "Gate-all-around", note: "Stacked nanosheets; the gate surrounds every side." }
  };

  /* ---------- lookups and formatting ---------- */

  const at = (rows, y) => {
    let hit = null;
    for (const r of rows) { if (r[0] <= y) hit = r; else break; }
    return hit;
  };
  const structureOf = (y) => (y < 2012 ? "planar" : y < 2025 ? "finfet" : "gaa");

  const trim = (v) => {
    let s = v.toFixed(v >= 100 ? 0 : v >= 10 ? 1 : 2);
    if (s.includes(".")) s = s.replace(/0+$/, "").replace(/\.$/, "");
    return s;
  };
  const big = (n) => {
    if (n >= 1e12) return `${trim(n / 1e12)} trillion`;
    if (n >= 1e9) return `${trim(n / 1e9)} billion`;
    if (n >= 1e6) return `${trim(n / 1e6)} million`;
    return Math.round(n).toLocaleString("en-US");
  };
  const nmLabel = (v) => (v >= 1000 ? `${trim(v / 1000)} µm` : `${trim(v)} nm`);
  const mhzLabel = (v) => (v >= 1000 ? `${trim(v / 1000)} GHz` : `${trim(v)} MHz`);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function info(year) {
    const y = Math.round(year);
    const gpu = at(D.gpuRec, y);
    const cpu = at(D.cpuRec, y);
    const node = at(D.node, y);
    const dens = at(D.density, y);
    const clock = at(D.clock, y);
    const top = gpu && gpu[1] > cpu[1] ? gpu : cpu;
    const key = structureOf(y);
    return {
      year: y, gpu, cpu, top, dens, clock,
      node: nmLabel(node[1]), nodeNm: node[1], nodeChip: node[2],
      structure: { key, ...STRUCT[key] },
      doublings: Math.log2(top[1] / BASE)
    };
  }

  /* ---------- transistor cross-section ---------- */

  const XS = `<svg class="xs" viewBox="0 0 120 84" aria-hidden="true" focusable="false">
    <rect class="xs-sub" x="4" y="60" width="112" height="20" rx="1"/>
    <g class="xs-planar"><rect class="xs-gate" x="26" y="42" width="68" height="14"/><rect class="xs-ch" x="26" y="58" width="68" height="4"/></g>
    <g class="xs-fin"><path class="xs-gate" d="M40 60V16H80V60H72V24H48V60Z"/><rect class="xs-ch" x="50" y="26" width="20" height="34"/></g>
    <g class="xs-gaa"><rect class="xs-gate" x="36" y="10" width="48" height="50"/><rect class="xs-ch xs-sheet" x="45" y="17" width="30" height="8"/><rect class="xs-ch xs-sheet" x="45" y="31" width="30" height="8"/><rect class="xs-ch xs-sheet" x="45" y="45" width="30" height="8"/></g>
  </svg>`;

  // fins got taller and thinner from 22 nm (2012) to 3 nm (2024)
  function shapeXs(svg, y) {
    const s = structureOf(y);
    svg.dataset.s = s;
    const t = Math.min(1, Math.max(0, (y - 2012) / 12));
    svg.style.setProperty("--fx", String(1.15 - 0.4 * t));
    svg.style.setProperty("--fy", String(0.72 + 0.28 * t));
  }

  const xsSlots = Array.from(document.querySelectorAll("[data-xs]"));
  xsSlots.forEach((slot) => { slot.innerHTML = XS; });
  const xsAll = () => xsSlots.map((s) => s.firstElementChild).filter(Boolean);

  /* ---------- hero spec row, updated on every rewind ---------- */

  const siliconRow = document.querySelector("[data-silicon]");
  function setSiliconRow(year) {
    const m = info(year);
    if (siliconRow) siliconRow.textContent = `${m.node} ${m.structure.key === "finfet" ? "FinFET" : m.structure.name.toLowerCase()} · ${big(m.top[1])} transistors on the biggest chip`;
    xsSlots.forEach((slot) => { if (!slot.closest(".moore")) shapeXs(slot.firstElementChild, m.year); });
  }

  /* ---------- figures ---------- */

  const wrap = document.getElementById("mooreFigs");
  const range = document.getElementById("mooreYear");
  const read = document.getElementById("mooreRead");
  const api = { info, big, nmLabel, setYear: setSiliconRow };
  window.MooreLaw = api;

  const eraNow = () => Number(document.documentElement.dataset.era) || Y1;
  setSiliconRow(eraNow());
  if (!wrap || !range || !read) return;

  const out = {};
  read.querySelectorAll("[data-m]").forEach((n) => { out[n.dataset.m] = n; });
  const bootBtn = read.querySelector("[data-goto-era]");
  const readXs = read.querySelector(".xs");

  let geo = null;          // scales from the last layout
  let shown = Y0;          // cursor year on screen (float while gliding)
  let target = eraNow();   // the year Rewind asked for
  let visible = false;
  let raf = 0;
  let settle = 0;
  let parts = {};

  function layout(W) {
    const L = W < 520 ? 46 : 60;
    const R = 14;
    const h1 = Math.round(Math.min(300, Math.max(190, W * 0.34)));
    const h2 = 128;
    const h3 = 96;
    const gap = 46;
    const f1 = { top: 30, h: h1, lo: 3, hi: 12 };
    const f2 = { top: f1.top + h1 + gap, h: h2, lo: 0, hi: 4 };
    const f3 = { top: f2.top + h2 + gap, h: h3, lo: -0.4, hi: 3.85 };
    const H = f3.top + h3 + 30;
    const x = (y) => L + ((y - Y0) / (XMAX - Y0)) * (W - L - R);
    const yOf = (f) => (v) => f.top + f.h - ((Math.log10(v) - f.lo) / (f.hi - f.lo)) * f.h;
    return { W, H, L, R, x, f1, f2, f3, y1: yOf(f1), y2: yOf(f2), y3: yOf(f3) };
  }

  function stepPath(rows, x, y, endYear) {
    let d = "";
    rows.forEach((r, i) => {
      d += i === 0 ? `M${x(r[0]).toFixed(1)} ${y(r[1]).toFixed(1)}` : `H${x(r[0]).toFixed(1)}V${y(r[1]).toFixed(1)}`;
    });
    return `${d}H${x(endYear).toFixed(1)}`;
  }

  function draw() {
    const W = Math.max(300, Math.round(wrap.clientWidth));
    const g = layout(W);
    geo = g;
    const { x, f1, f2, f3, y1, y2, y3, L, H } = g;
    const right = x(XMAX);
    const tick = (f, y, vals, fmt) => vals.map((v) => {
      const yy = y(v).toFixed(1);
      return `<line class="m-grid" x1="${L}" x2="${right}" y1="${yy}" y2="${yy}"/><text class="m-tick" x="${L - 8}" y="${yy}" dy=".32em" text-anchor="end">${fmt(v)}</text>`;
    }).join("");
    const frame = (f) => `<rect class="m-frame" x="${L}" y="${f.top}" width="${(right - L).toFixed(1)}" height="${f.h}"/>`;
    const decades = [1980, 1990, 2000, 2010, 2020];
    const vgrid = (f) => decades.map((d) => `<line class="m-grid m-grid-v" x1="${x(d).toFixed(1)}" x2="${x(d).toFixed(1)}" y1="${f.top}" y2="${f.top + f.h}"/>`).join("");

    // structure bands behind the node chart
    const band = (a, b, cls) => `<rect class="m-band ${cls}" x="${x(a).toFixed(1)}" y="${f2.top}" width="${(x(b) - x(a)).toFixed(1)}" height="${f2.h}"/>`;
    const bands = band(Y0, 2012, "m-band-planar") + band(2012, 2025, "m-band-fin") + band(2025, XMAX, "m-band-gaa")
      + `<text class="m-band-label" x="${(x(Y0) + 8).toFixed(1)}" y="${f2.top + 16}">Planar</text>`
      + `<text class="m-band-label" x="${(x(2012) + 6).toFixed(1)}" y="${f2.top + 16}">FinFET</text>`
      + `<text class="m-band-label" x="${(x(2025) - 5).toFixed(1)}" y="${f2.top + 16}" text-anchor="end">${W < 640 ? "GAA" : "Gate-all-around from 2025"} →</text>`;

    // series, drawn twice: ghosted (the future) and solid up to the cursor (the past)
    const ideal = `<path class="m-ideal" d="M${x(Y0).toFixed(1)} ${y1(BASE).toFixed(1)}L${right.toFixed(1)} ${y1(BASE * 2 ** ((XMAX - Y0) / 2)).toFixed(1)}"/>`;
    const dots = D.cpu.map((p) => `<circle class="m-dot" cx="${x(p[0] + 0.5).toFixed(1)}" cy="${y1(p[1]).toFixed(1)}" r="2.1"/>`).join("");
    const cpuLine = `<path class="m-cpu" d="${stepPath(D.cpuRec, x, y1, XMAX)}"/>`;
    const gpuLine = `<path class="m-gpu" d="${stepPath(D.gpuRec, x, y1, XMAX)}"/>`;
    const nodeLine = `<path class="m-node" d="${stepPath(D.node, x, y2, XMAX)}"/>`;
    const clockLine = `<path class="m-clock" d="M${D.clock.map((p) => `${x(p[0] + 0.5).toFixed(1)} ${y3(p[1]).toFixed(1)}`).join("L")}"/>`;
    const series = ideal + dots + cpuLine + gpuLine + nodeLine + clockLine;

    const me = `<rect class="m-me" x="${x(CAREER).toFixed(1)}" y="${f1.top}" width="${(right - x(CAREER)).toFixed(1)}" height="${(f3.top + f3.h - f1.top).toFixed(1)}"/>`
      + `<text class="m-me-label" x="${(x(CAREER) + 5).toFixed(1)}" y="${(f1.top + f1.h - 9).toFixed(1)}">My 14 years</text>`;

    const dennard = x(2005);
    const notes = `<line class="m-note-line" x1="${dennard.toFixed(1)}" x2="${dennard.toFixed(1)}" y1="${f3.top}" y2="${f3.top + f3.h}"/>`
      + `<text class="m-note" x="${(dennard - 6).toFixed(1)}" y="${f3.top + f3.h - 10}" text-anchor="end">Clocks stall, ~2005</text>`;

    const titles = `<text class="m-title" x="${L}" y="${f1.top - 12}">Fig. 1 · Transistors on one chip</text>`
      + `<text class="m-title" x="${L}" y="${f2.top - 12}">Fig. 2 · MOSFET scaling: smallest node in a shipping CPU</text>`
      + `<text class="m-title" x="${L}" y="${f3.top - 12}">Fig. 3 · Top clock speed</text>`;

    const axis = decades.map((d) => `<text class="m-tick" x="${x(d).toFixed(1)}" y="${H - 8}" text-anchor="middle">${d}</text>`).join("")
      + `<text class="m-tick" x="${x(Y0).toFixed(1)}" y="${H - 8}" text-anchor="start">${Y0}</text>`;

    const t1 = tick(f1, y1, [1e3, 1e6, 1e9, 1e12], (v) => ({ 1e3: "1K", 1e6: "1M", 1e9: "1B", 1e12: "1T" }[v]));
    const t2 = tick(f2, y2, [1, 10, 100, 1000, 10000], nmLabel);
    const t3 = tick(f3, y3, [1, 10, 100, 1000], mhzLabel);
    const markers = ["gpu", "cpu", "node", "clock"].map((k) => `<circle class="m-mark m-mark-${k}" r="4.5" cx="-20" cy="-20"/>`).join("");

    wrap.innerHTML = `<svg class="moore-svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="mooreSvgTitle mooreSvgDesc">
      <title id="mooreSvgTitle">Moore's law, ${Y0} to ${Y1}</title>
      <desc id="mooreSvgDesc">Three charts on one time axis. Transistors on the largest chip rise from thousands to hundreds of billions, close to a doubling every two years. The smallest process node in a shipping CPU falls from 10 micrometres to 2 nanometres, moving from planar to FinFET in 2012 and gate-all-around in 2025. Top clock speed rises until about 2005, then stays flat between 3 and 5 gigahertz.</desc>
      <defs><clipPath id="mooreClip"><rect x="0" y="0" width="0" height="${H}"/></clipPath></defs>
      ${me}${bands}${vgrid(f1)}${vgrid(f2)}${vgrid(f3)}${t1}${t2}${t3}${frame(f1)}${frame(f2)}${frame(f3)}${notes}${titles}${axis}
      <g class="m-ghost">${series}</g>
      <g clip-path="url(#mooreClip)">${series}</g>
      <line class="m-cursor" x1="0" x2="0" y1="${f1.top - 4}" y2="${f3.top + f3.h}"/>
      ${markers}
      <g class="m-pill"><rect x="-23" y="${f1.top - 4}" width="46" height="20" rx="3"/><text x="0" y="${f1.top + 10}" text-anchor="middle"></text></g>
    </svg>`;
    const svg = wrap.firstElementChild;
    parts = {
      svg,
      clip: svg.querySelector("#mooreClip rect"),
      cursor: svg.querySelector(".m-cursor"),
      pill: svg.querySelector(".m-pill"),
      pillText: svg.querySelector(".m-pill text"),
      mark: {
        gpu: svg.querySelector(".m-mark-gpu"), cpu: svg.querySelector(".m-mark-cpu"),
        node: svg.querySelector(".m-mark-node"), clock: svg.querySelector(".m-mark-clock")
      }
    };
    bindPointer(svg);
    render(shown);
  }

  function place(mark, cx, cy) {
    if (cy == null) { mark.setAttribute("cx", "-20"); mark.setAttribute("cy", "-20"); return; }
    mark.setAttribute("cx", cx.toFixed(1));
    mark.setAttribute("cy", cy.toFixed(1));
  }

  let lastRead = null;
  function render(year) {
    if (!geo || !parts.svg) return;
    const { x, y1, y2, y3, W, R } = geo;
    const cx = x(year + 0.5);
    parts.clip.setAttribute("width", (cx + 3).toFixed(1));
    parts.cursor.setAttribute("x1", cx.toFixed(1));
    parts.cursor.setAttribute("x2", cx.toFixed(1));
    const px = Math.min(Math.max(cx, geo.L + 23), W - R - 23);
    parts.pill.setAttribute("transform", `translate(${px.toFixed(1)} 0)`);
    const m = info(year);
    parts.pillText.textContent = String(m.year);
    place(parts.mark.gpu, cx, m.gpu ? y1(m.gpu[1]) : null);
    place(parts.mark.cpu, cx, y1(m.cpu[1]));
    place(parts.mark.node, cx, y2(m.nodeNm));
    place(parts.mark.clock, cx, m.year <= D.clock[D.clock.length - 1][0] ? y3(m.clock[1]) : null);
    if (lastRead !== m.year) readout(m);
  }

  function readout(m) {
    lastRead = m.year;
    out.year.textContent = String(m.year);
    out.gpu.textContent = m.gpu ? `${big(m.gpu[1])} · ${m.gpu[2]} (${m.gpu[0]})` : "No GPUs yet";
    out.cpu.textContent = `${big(m.cpu[1])} · ${m.cpu[2]} (${m.cpu[0]})`;
    out.node.textContent = `${m.node} · ${m.nodeChip}`;
    out.struct.textContent = m.structure.name;
    out.structNote.textContent = m.structure.note;
    out.dens.textContent = `${big(m.dens[1])} per mm²`;
    const lastClock = D.clock[D.clock.length - 1];
    out.clock.textContent = m.year <= lastClock[0] ? mhzLabel(m.clock[1]) : `${mhzLabel(lastClock[1])} (data ends ${lastClock[0]})`;
    out.dbl.textContent = m.doublings.toFixed(1);
    if (readXs) shapeXs(readXs, m.year);
    range.value = String(m.year);
    range.setAttribute("aria-valuetext", `${m.year}: ${m.node} ${m.structure.name}, biggest chip ${big(m.top[1])} transistors`);
    const era = eraNow();
    const bootable = ERA_YEARS.includes(m.year) && m.year !== era;
    bootBtn.hidden = !bootable;
    if (bootable) { bootBtn.dataset.gotoEra = String(m.year); bootBtn.textContent = `Boot the ${m.year} edition`; }
  }

  /* ---------- motion: glide the cursor to the rewound year ---------- */

  function glide(to) {
    cancelAnimationFrame(raf);
    clearTimeout(settle);
    const from = shown;
    const dist = Math.abs(to - from);
    if (reduce.matches || dist < 0.5 || document.hidden) { shown = to; render(shown); return; }
    const ms = Math.min(1600, 300 + dist * 40);
    // frames can be throttled (background tab): a timer guarantees the cursor lands
    settle = setTimeout(() => { cancelAnimationFrame(raf); shown = to; render(shown); }, ms + 150);
    const start = performance.now();
    const ease = (p) => 1 - Math.pow(2, -10 * p);   // expo out
    const step = (now) => {
      const p = Math.min(1, (now - start) / ms);
      shown = from + (to - from) * (p >= 1 ? 1 : ease(p));
      render(shown);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  }

  function jump(y) {
    cancelAnimationFrame(raf);
    clearTimeout(settle);
    shown = Math.min(Y1, Math.max(Y0, Math.round(y)));
    render(shown);
  }
  // a visitor's own scrub becomes the resting year until the next rewind
  const scrub = (y) => { jump(y); target = shown; };

  /* ---------- input: drag the charts, or use the slider ---------- */

  function bindPointer(svg) {
    let dragging = false;
    const toYear = (ev) => {
      const r = svg.getBoundingClientRect();
      const px = ((ev.clientX - r.left) / r.width) * geo.W;
      return Y0 + ((px - geo.L) / (geo.W - geo.L - geo.R)) * (XMAX - Y0) - 0.5;
    };
    svg.addEventListener("pointerdown", (ev) => {
      if (ev.button !== 0) return;
      dragging = true;
      svg.setPointerCapture(ev.pointerId);
      scrub(toYear(ev));
    });
    svg.addEventListener("pointermove", (ev) => { if (dragging) scrub(toYear(ev)); });
    const end = () => { dragging = false; };
    svg.addEventListener("pointerup", end);
    svg.addEventListener("pointercancel", end);
  }
  range.min = String(Y0);
  range.max = String(Y1);
  range.addEventListener("input", () => scrub(Number(range.value)));

  /* ---------- wiring ---------- */

  api.setYear = (year) => {
    setSiliconRow(year);
    target = year;
    lastRead = null;   // the boot button depends on the edition, not only the cursor
    if (visible) glide(target);
    else render(shown);   // off screen: refresh the readout now, glide when it scrolls in
  };

  let resizeId = 0;
  new ResizeObserver(() => {
    cancelAnimationFrame(resizeId);
    resizeId = requestAnimationFrame(() => { if (!geo || Math.abs(geo.W - wrap.clientWidth) > 1) draw(); });
  }).observe(wrap);

  if ("IntersectionObserver" in window && !reduce.matches) {
    // first view: the history draws itself from the 4004 to the current edition
    new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting);
      if (visible && Math.round(shown) !== target) glide(target);
    }, { threshold: 0.35 }).observe(wrap);
  } else {
    visible = true;
    shown = target;
  }
  draw();
})();
