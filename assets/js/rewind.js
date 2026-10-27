/* Rewind: boots the portfolio on the typical machine of a year,
   then re-skins the whole site as the web looked that year. */
(() => {
  "use strict";

  const ERAS = {
    2012: {
      role: "System Engineer, TCS Mumbai. SAP BusinessObjects and dashboards.",
      machine: "4 GB RAM · dual-core 2.5 GHz · 500 GB spinning disk · 3G",
      ai: "AlexNet wins ImageNet, trained on two gaming GPUs. Deep learning arrives.",
      could: "The new iPad had 1 GB of RAM. Every dashboard I shipped had to fit inside it.",
      built: "6 end-to-end SAP dashboards for iPad, a voice-enabled SAP Dashboard 4.0, and Crystal/WEBI reports for banking clients.",
      answer: "No results found for “shortlist best 5 candidates 200 resumes”. Did you mean: shortlist template xls?",
      label: "Keyword search, 2012. Nothing understood the question.",
      cps: 0,
      boot: { cpu: "Dual-core 2.5 GHz", ram: 4096, disk: "500 GB HDD · 5400 rpm", net: "3G mobile", gpu: null, ms: 3400 }
    },
    2016: {
      role: "Senior Consultant, IBM. Bengaluru, then Kuala Lumpur.",
      machine: "8 GB RAM · quad-core · 256 GB SSD · 4G",
      ai: "AlphaGo beats Lee Sedol at Go. Most chatbots are still decision trees.",
      could: "SSDs made laptops feel instant, but a central bank’s warehouse still loaded overnight.",
      built: "Architected a $5M+ data warehouse for Bank Negara Malaysia, led a 50+ member team, profiled 2,000+ objects.",
      answer: "Bot: Sorry, I didn’t understand that. Type 1 for HR, 2 for IT, or 0 to talk to a person.",
      label: "Rule-based chatbot, 2016.",
      cps: 0,
      boot: { cpu: "Quad-core 2.8 GHz", ram: 8192, disk: "256 GB SATA SSD", net: "4G LTE", gpu: null, ms: 2600 }
    },
    2020: {
      role: "Senior Consultant, EY Bengaluru, from home like everyone else.",
      machine: "16 GB RAM · 8-core · 1 TB NVMe SSD · home fibre",
      ai: "GPT-3: 175 billion parameters, behind a waitlisted API.",
      could: "A data-center GPU held 40 GB. A 175B-parameter model needed many of them.",
      built: "Migrated a 10+ year-old SQL/Oracle warehouse (400+ objects) to SAP HANA 2.0 and orchestrated 200+ BODS jobs.",
      answer: "Here are the 5 best candidates: 1. John Smith, 12 years at NASA. 2. Priya K., PhD in everything. 3. …",
      label: "Large language model, 2020. Fluent, and none of these people are in your files.",
      cps: 38,
      boot: { cpu: "8-core 3.6 GHz", ram: 16384, disk: "1 TB NVMe SSD", net: "Home fibre", gpu: "Data-center GPU: 40 GB", ms: 1800 }
    },
    2022: {
      role: "Lead Data Engineer, 3M. A 30+ person team.",
      machine: "16 GB laptop · the cloud as default · 5G",
      ai: "ChatGPT launches on 30 Nov 2022. Everyone tries it within a week.",
      could: "You could rent a hundred machines in a minute, and pay for all hundred.",
      built: "HANA NSE cut EC2 use by 50% ($1M a year), automation saved $10K+/month on Snowflake, and Firehose + Lambda streamed data into Snowflake.",
      answer: "I can’t open files, but here’s a 5-step framework for shortlisting: 1. Define must-have skills. 2. Create a scoring rubric. 3. …",
      label: "Chat assistant, late 2022. Helpful, but it never read a resume.",
      cps: 70,
      boot: { cpu: "10-core laptop", ram: 16384, disk: "512 GB NVMe · cloud storage", net: "5G", gpu: "Data-center GPU: 80 GB", ms: 1300 }
    },
    2024: {
      role: "Student again. Back to the beginning of AI, learning from scratch.",
      machine: "32 GB laptop runs an 8B open-weight model locally",
      ai: "Open-weight models run on a laptop. Context windows pass 128K tokens.",
      could: "My laptop could run a capable language model offline, something that needed a data center in 2020.",
      built: "Relearned the basics and learned the rest: tokenizers, attention, embeddings, RAG, evaluation. Got into IIT Jodhpur’s M.Tech in AI, starting January 2025.",
      answer: "I can fit about 120 of the 200 resumes in my context window. Here is a ranked table of those 120. Want me to try the rest in a second pass?",
      label: "Multimodal assistant, 2024. It reads, but only so much at once.",
      cps: 110,
      boot: { cpu: "12-core laptop with NPU", ram: 32768, disk: "1 TB NVMe", net: "5G", gpu: "Local 8B model · 4-bit", ms: 900 }
    },
    2026: {
      role: "AI Lead, 3M · final year of M.Tech AI, IIT Jodhpur",
      machine: "32 GB laptop · models as a service (Amazon Bedrock)",
      ai: "Agents that retrieve, reason and act",
      could: "Models stopped being the hard part. Retrieval, evaluation and trust became the job.",
      built: "RAG and agents over 8,000+ documents for 40,000+ users, an internal GPT for 60K+ people, and a Talent Navigator that shortlists 200+ resumes in under a minute.",
      answer: "Read 200 of 200 resumes through retrieval. Top 5 ranked, with evidence quoted from each file. Shortlist ready to sync to Workday, in under a minute.",
      label: "Agent, 2026. This is how the Talent Navigator I built works.",
      cps: 160,
      boot: { cpu: "Laptop + Amazon Bedrock", ram: 32768, disk: "Amazon S3", net: "Global CDN · AWS Amplify", gpu: "Serverless: no GPU to count", ms: 450 }
    }
  };
  const YEARS = Object.keys(ERAS).map(Number);
  const NOW = 2026;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  const dial = $("#dial");
  const radios = $$("button[data-year]", dial);
  const boot = $("#boot");
  const bootLog = $("#bootLog");
  const bootFill = $("#bootFill");
  const bootSkip = $("#bootSkip");
  const answer = $("#askAnswer");
  const label = $("#askLabel");
  const banner = $("#eraBanner");
  const bannerText = $("#eraBannerText");
  const chip = $("#rewindChip");
  const chipLabel = $(".rewind-chip-label", chip);
  const chipYear = $(".rewind-chip-year", chip);
  const chipIcon = $("use", chip);
  const heroJump = $("#heroJump");
  const machine = $(".machine");
  const behindBoot = ["#eraBanner", "header.bar", "main", "footer", ".prompt-2024"].map((s) => $(s)).filter(Boolean);

  const live = document.createElement("p");
  live.className = "vh";
  live.setAttribute("aria-live", "polite");
  document.body.appendChild(live);
  answer.removeAttribute("aria-live");
  $(".boot-screen").setAttribute("aria-live", "off");

  let current = NOW;
  let run = 0;           // increments to cancel an in-flight boot or typewriter
  let skipped = 0;       // equals run when the visitor skipped this boot
  let skipBoot = null;   // resolves the active boot phase early
  const halt = (token) => token !== run || skipped === token;

  const wait = (ms, token) => new Promise((res) => {
    if (halt(token)) { res(); return; }
    const t = setTimeout(res, ms);
    skipBoot = () => { clearTimeout(t); res(); };
  });

  // timer-driven so the boot never freezes when frames are throttled
  const animate = (ms, token, onProgress) => new Promise((res) => {
    const start = Date.now();
    let id = 0;
    const done = () => { clearTimeout(id); res(); };
    skipBoot = done;
    const tick = () => {
      if (halt(token)) { done(); return; }
      const p = Math.min(1, Math.max(0, (Date.now() - start) / ms));
      onProgress(p);
      if (p < 1) id = setTimeout(tick, 16); else done();
    };
    tick();
  });

  function apply(year) {
    const e = ERAS[year];
    root.dataset.era = String(year);
    current = year;
    $$("[data-era-year]").forEach((n) => { n.textContent = String(year); });
    $$("[data-field]").forEach((n) => { n.textContent = e[n.dataset.field]; });
    label.textContent = e.label;
    radios.forEach((r) => {
      const on = Number(r.dataset.year) === year;
      r.setAttribute("aria-pressed", String(on));
      r.tabIndex = on ? 0 : -1;
    });
    const past = year !== NOW;
    banner.hidden = !past;
    if (past) {
      bannerText.textContent = `You are viewing the ${year} edition: this site as it might have looked on the web of ${year}.`
        + (year === 2024 ? " The Ask box below is live." : "");
    }
    document.title = past
      ? `Mahantesh Hiremath · ${year} edition`
      : "Mahantesh Hiremath · Lead AI Engineer, student again";
    const prev = previousYear(year);
    chipYear.textContent = String(prev);
    if (year === YEARS[0]) {
      chipLabel.textContent = "Forward";
      chipIcon.setAttribute("href", "#i-forward");
      chip.setAttribute("aria-label", `Fast-forward this site to ${NOW}`);
    } else {
      chipLabel.textContent = "Rewind";
      chipIcon.setAttribute("href", "#i-rewind");
      chip.setAttribute("aria-label", `Rewind this site to ${prev}`);
    }
    const first = year === YEARS[0];
    heroJump.dataset.gotoEra = String(first ? NOW : YEARS[0]);
    $("use", heroJump).setAttribute("href", first ? "#i-forward" : "#i-rewind");
    $("span", heroJump).textContent = first ? `Fast-forward to ${NOW}` : `Rewind to ${YEARS[0]}`;
    const url = new URL(window.location.href);
    if (past) url.searchParams.set("y", String(year)); else url.searchParams.delete("y");
    history.replaceState(null, "", url);
    live.textContent = past ? `Now showing the ${year} edition of this site.` : "Back to the 2026 edition.";
    if (window.MooreLaw) window.MooreLaw.setYear(year);
  }

  function previousYear(year) {
    const i = YEARS.indexOf(year);
    return i <= 0 ? NOW : YEARS[i - 1];
  }

  async function typeAnswer(text, cps, token, year) {
    answer.classList.remove("typing");
    const announce = () => { if (token === run) live.textContent = `The ${year} model answers: ${text}`; };
    if (!cps || reduce.matches) { answer.textContent = text; announce(); return; }
    answer.textContent = "";
    answer.classList.add("typing");
    const step = 1000 / cps;
    for (let i = 1; i <= text.length; i += 1) {
      if (token !== run) return;
      answer.textContent = text.slice(0, i);
      await new Promise((r) => setTimeout(r, step));
    }
    answer.classList.remove("typing");
    announce();
  }

  function line(html) {
    bootLog.insertAdjacentHTML("beforeend", html + "\n");
  }

  function liveLine() {
    const n = document.createElement("span");
    bootLog.appendChild(n);
    bootLog.appendChild(document.createTextNode("\n"));
    return n;
  }

  const count = (n) => Math.round(n).toLocaleString("en-US");

  async function runBoot(year, token) {
    const b = ERAS[year].boot;
    bootLog.textContent = "";
    bootFill.style.width = "0%";
    boot.hidden = false;
    boot.classList.remove("out");
    behindBoot.forEach((n) => { n.inert = true; });
    live.textContent = `Booting the ${year} edition. Press Escape to skip.`;
    bootSkip.focus({ preventScroll: true });

    const t = b.ms;
    line(`<span class="dim">MH-BIOS (C) ${year} · Portfolio Systems Inc.</span>`);
    line(`CPU      ${b.cpu}`);
    await wait(t * 0.08, token);

    // memory test counter
    const memLine = liveLine();
    const memMs = t * 0.38;
    await animate(memMs, token, (p) => {
      memLine.textContent = `Memory   ${String(Math.round(b.ram * p)).padStart(5, " ")} MB`;
    });
    if (token !== run) return;
    memLine.innerHTML = `Memory   ${String(b.ram).padStart(5, " ")} MB <span class="ok">OK</span>`;
    line(`Storage  ${b.disk}`);
    if (b.gpu) line(`AI       ${b.gpu}`);
    line(`Network  ${b.net}`);

    // Moore's law: double from the Intel 4004 up to this year's biggest chip
    const m = window.MooreLaw ? window.MooreLaw.info(year) : null;
    let mooreLine = null;
    if (m) {
      liveLine().textContent = `Silicon  ${m.node} ${m.structure.name} · ${m.nodeChip}`;
      mooreLine = liveLine();
    }
    line(`\nLoading portfolio, ${year} edition…`);

    // older machines stall: stepped progress before 2020
    await animate(t * 0.5, token, (p) => {
      const shown = year < 2020 ? Math.floor(p * 12) / 12 : p;
      bootFill.style.width = `${Math.round(shown * 100)}%`;
      if (mooreLine) {
        const d = m.doublings * p;
        mooreLine.textContent = `Moore    ${count(2250 * 2 ** d).padStart(15, " ")} transistors · doubled ${Math.floor(d)}×`;
      }
    });
    bootFill.style.width = "100%";
    if (mooreLine && token === run) {
      mooreLine.textContent = `Moore    ${count(m.top[1]).padStart(15, " ")} transistors · ${m.top[2]} `;
      const ok = document.createElement("span");
      ok.className = "ok";
      ok.textContent = `×2 ${m.doublings.toFixed(1)} times since the 4004`;
      mooreLine.appendChild(ok);
    }
  }

  async function closeBoot() {
    boot.classList.add("out");
    await new Promise((r) => setTimeout(r, reduce.matches ? 0 : 320));
    boot.hidden = true;
    behindBoot.forEach((n) => { n.inert = false; });
  }

  async function goTo(year, opts = {}) {
    if (!ERAS[year]) return;
    run += 1;
    const token = run;
    const returnFocus = opts.returnFocus || document.activeElement;
    try { localStorage.setItem("mh-rewound", "1"); } catch (_) { /* storage blocked */ }
    radios.forEach((r) => r.classList.remove("pulse"));

    if (!reduce.matches && !opts.instant) {
      await runBoot(year, token);
      if (token !== run) return;
    }
    // each era has a different layout height: keep the clicked control where it was on screen
    const anchor = !opts.scrollTop && returnFocus && document.contains(returnFocus) && returnFocus !== bootSkip ? returnFocus : null;
    const before = anchor ? anchor.getBoundingClientRect().top : 0;
    apply(year);
    // boots started below the hero land on the machine panel, where the change is visible
    if (opts.scrollTop) machine.scrollIntoView({ block: "start", behavior: "instant" });
    else if (anchor) window.scrollBy({ top: anchor.getBoundingClientRect().top - before, behavior: "instant" });
    if (!boot.hidden) await closeBoot();
    if (returnFocus && document.contains(returnFocus) && returnFocus !== bootSkip) {
      returnFocus.focus({ preventScroll: true });
    }
    const e = ERAS[year];
    typeAnswer(e.answer, e.cps, token, year);
  }

  // dial: toolbar of toggle buttons; arrows move focus, Enter/Space boot the year
  radios.forEach((r) => {
    r.addEventListener("click", () => {
      const y = Number(r.dataset.year);
      if (y !== current) goTo(y, { returnFocus: r });
    });
  });
  dial.addEventListener("keydown", (ev) => {
    const i = radios.indexOf(document.activeElement);
    if (i < 0) return;
    let n = null;
    if (ev.key === "ArrowRight" || ev.key === "ArrowDown") n = (i + 1) % radios.length;
    if (ev.key === "ArrowLeft" || ev.key === "ArrowUp") n = (i - 1 + radios.length) % radios.length;
    if (ev.key === "Home") n = 0;
    if (ev.key === "End") n = radios.length - 1;
    if (n === null) return;
    ev.preventDefault();
    radios.forEach((r, k) => { r.tabIndex = k === n ? 0 : -1; });
    radios[n].focus();
  });
  dial.addEventListener("focusout", (ev) => {
    if (dial.contains(ev.relatedTarget)) return;
    radios.forEach((r) => { r.tabIndex = Number(r.dataset.year) === current ? 0 : -1; });
  });

  // every other trigger: hero button, revision table, banner
  document.addEventListener("click", (ev) => {
    const t = ev.target.closest("[data-goto-era]");
    if (!t) return;
    const y = Number(t.dataset.gotoEra);
    if (y === current) return;
    const outsideHero = !t.closest(".hero");
    goTo(y, { scrollTop: outsideHero, returnFocus: outsideHero ? radios[YEARS.indexOf(y)] : t });
  });

  chip.addEventListener("click", () => {
    const target = current === YEARS[0] ? NOW : previousYear(current);
    goTo(target, { returnFocus: chip });
  });

  bootSkip.addEventListener("click", () => { skipped = run; if (skipBoot) skipBoot(); });
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && !boot.hidden) { ev.preventDefault(); skipped = run; if (skipBoot) skipBoot(); }
  });

  // 2024 prompt bar: a live answer from Amazon Nova on Bedrock (api/), plus a
  // link to the section that covers it. Falls back to plain routing offline.
  const ask = $("#ask2024");
  if (ask) {
    const ASK_URL = "https://a75wmhclpiug5v5ihw6ppgubh40uajnt.lambda-url.us-east-1.on.aws/";
    const input = $("input", ask);
    const out = $("#askOut");
    const text = $("#askText");
    const src = $("#askSrc");
    const go = $("#askGo");
    const routes = [
      [/build|built|project|made|work/i, "#projects", "Projects"],
      [/good|skill|superpower|stack|know/i, "#superpowers", "Superpowers"],
      [/study|course|iit|m\.?tech|student|learn/i, "#coursework", "Coursework"],
      [/reach|email|contact|hire|linkedin|talk/i, "#contact", "Contact"],
      [/journey|career|history|year/i, "#journey", "Journey"]
    ];
    const routeFor = (q) => routes.find(([re]) => re.test(q)) || [null, "#about", "About"];
    const jump = (sel) => {
      const target = $(sel) || $("#about");
      target.scrollIntoView({ block: "start" });
      const h = $("h2", target);
      if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); }
    };
    let asking = 0;

    const show = (msg, note, route, waiting) => {
      out.hidden = false;
      text.textContent = msg;
      text.classList.toggle("is-waiting", Boolean(waiting));
      src.textContent = note;
      go.hidden = !route;
      if (route) { go.href = route[1]; go.textContent = `Go to ${route[2]} →`; }
    };

    const submit = async (q) => {
      q = q.trim().slice(0, 300);
      if (!q) { input.focus(); return; }
      const id = ++asking;
      const route = routeFor(q);
      show("Thinking", "", null, true);
      try {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 12000);
        const res = await fetch(ASK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ q }),
          signal: ctrl.signal
        });
        clearTimeout(timer);
        if (id !== asking) return;
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.answer) {
          show(data.answer, "Answered live by Amazon Nova on Bedrock, from this page only.", route);
          return;
        }
        const busy = res.status === 429;
        show(busy ? "The model has answered its share of questions for today, so here’s the section that covers it."
                  : "The model isn’t reachable right now, so here’s the section that covers it.", "", route);
      } catch (_) {
        if (id !== asking) return;
        show("The model isn’t reachable right now, so here’s the section that covers it.", "", route);
      }
    };

    ask.addEventListener("submit", (ev) => { ev.preventDefault(); submit(input.value); });
    $$(".prompt-chip", ask.parentElement).forEach((chip) => {
      chip.addEventListener("click", (ev) => {
        ev.preventDefault();
        input.value = chip.textContent;
        submit(chip.textContent);
      });
    });
    go.addEventListener("click", (ev) => { ev.preventDefault(); jump(go.getAttribute("href")); });
    $("#askClose").addEventListener("click", () => { asking++; out.hidden = true; input.focus(); });
  }

  // start: honour ?y=2012 links, otherwise invite the first rewind
  const fromUrl = Number(new URL(window.location.href).searchParams.get("y"));
  if (ERAS[fromUrl] && fromUrl !== NOW) {
    goTo(fromUrl, { instant: true });
  } else {
    let seen = false;
    try { seen = localStorage.getItem("mh-rewound") === "1"; } catch (_) { /* storage blocked */ }
    if (!seen) radios[0].classList.add("pulse");
  }
})();
