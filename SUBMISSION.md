# Submission draft: AWS Student Builder Challenge, "Build Your Tech Superpower"

> Draft for Mahantesh to edit. Everything in [brackets] needs your input. The screenshots in `docs/screenshots/` were captured from the live site.

**Title:** A portfolio you can rewind: 14 years of data, and a student again

**Live site:** https://main.d1931ionu4gntw.amplifyapp.com
**Code:** https://github.com/mahanteshimath/portfolio-on-aws

## The idea

I started in data in October 2012, on a laptop with 4 GB of RAM, building SAP dashboards that had to fit inside the first retina iPad's 1 GB. For the last three years I've built with AI: RAG and agents for 40,000+ users at 3M. In 2024 I did something I hadn't done in over a decade: I went back to the beginning and became a student again. In January 2025 I started an M.Tech in AI at IIT Jodhpur.

A list of skills couldn't show that arc, so I built a portfolio that can travel back through it.

## The creative feature: Rewind

Pick a year (2012, 2016, 2020, 2022, 2024 or 2026) and the site **reboots on that year's typical machine**:

- **A BIOS boot screen** counts memory up to that year's RAM (4 GB → 32 GB). Older machines load visibly slower, with a stuttering progress bar before 2020. You can skip it with Esc.
- **The whole site re-skins** as the web looked that year: 2012 glossy skeuomorphism, 2016 Material, 2020 dark glass, 2022 neo-brutalism, 2024 AI chat (with a working "Ask about Mahantesh" box), and 2026 an engineering datasheet.
- **"Ask the model of that year"**: the same request, "shortlist the best 5 of these 200 resumes", gets each era's answer at that era's speed. 2012 finds nothing, 2020 invents candidates, 2024 reads only part of the pile, and 2026 is an agent that reads all 200. That agent is the Talent Navigator I built at 3M.
- The spec panel shows who I was, the typical machine, the state of AI, and what I built that year.

The hint ("This site has been rebuilt six times. Pick a year…") and a pulsing dot on 2012 invite the first rewind. Navigation is never blocked.

Screenshots (from the live site, in `docs/screenshots/`):

- 2026 home: `desktop-2026.png`
- 2012 edition: `desktop-2012.png`
- 2022 edition: `desktop-2022.png`
- 2024 on mobile: `mobile-2024.png`
- Boot screen mid-count: `boot-2012.png`

## Sections

- **About:** my story, in my words, plus key facts.
- **Coursework:** the modules of the M.Tech.
- **Superpowers:** a "characteristics" table with measured results (8,000+ docs for 40K users, $1M/yr saved, 200+ resumes in under a minute), plus a chip pinout of the stack I wire together.
- **Projects & achievements:** Talent Navigator, enterprise RAG and agents, agentic RAG on arXiv papers, Bazaar AI Saathi (featured by Perplexity), a $1M/yr HANA optimisation, a central-bank data warehouse, and hackathon wins.
- **Journey:** a datasheet "revision history" from Rev 1.0 (TCS, 2012) to Rev 7.0 (AI Lead, 2025). Every revision can boot its year.
- **Contact.**

## AWS services used

- **AWS Amplify Hosting:**
  - The `main` branch is deployed as a production build by manual upload, through the Amplify deployment API.
  - A global CDN with managed HTTPS.
  - Custom response headers.
- **An explicit artifact allowlist:** only `index.html` and `assets/` are published (the upload zip contains just those, and `amplify.yml` lists the same artifacts for Git-connected builds). My source notes and resume never ship.
- **`customHttp.yml`:**
  - A strict Content-Security-Policy (`'self'` only, no inline code, no third-party scripts or fonts), plus HSTS, `nosniff` and Referrer-Policy.
  - Year-long immutable caching for fonts, and `no-cache` revalidation for CSS/JS so redeploys are never stale.

[Optional, if you add it before the deadline: a custom domain on Amplify, or the Amplify console's access logs and monitoring for traffic during judging.]

## What I learned

- **One attribute, six websites.** Each era is a set of CSS custom-property overrides plus component rules under `[data-era]`. The same HTML renders all six. It taught me how much of a design is tokens and how much is component behaviour.
- **Deploying is a design decision.** An artifact allowlist and a strict CSP shaped how I wrote the front end: no inline styles, no CDNs, self-hosted fonts.
- [Add one line connecting this to your M.Tech: what being a student again taught you about learning in public.]

## Challenges

- **Animations froze in background tabs.** `requestAnimationFrame` is paused when a tab isn't visible, so the boot counter could stall at 0 MB. I moved it to a wall-clock timer.
- **Scroll position between eras.** Each skin has a different page height, so a re-skin dropped visitors into a different section. The fix keeps the control you clicked at the same place on screen.
- **Mobile versions of six design languages.** The 2024 chat skin's three-column pinout and hidden line breaks broke on phones until those overrides were scoped to desktop. Every era was then checked for horizontal overflow at 390 px.
- **Accessibility of a time machine.**
  - The dial uses toggle buttons: arrows move, Enter boots.
  - The page is inert while booting, and focus returns afterwards.
  - Screen readers hear each era's answer.
  - Reduced-motion users skip the boot entirely.
- **Honesty.** The machine specs are typical for each year, not exact, and the model answers are reconstructions. The footer says so.

## Built with

HTML, CSS and JavaScript, with no framework and no dependencies, deployed on AWS Amplify Hosting.
