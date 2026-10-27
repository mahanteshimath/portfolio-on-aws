# AWS Student Builder Challenge, "Build Your Tech Superpower"

**Title:** A portfolio you can rewind: 14 years of data, and a student again

**Live site:** https://main.d1931ionu4gntw.amplifyapp.com
**Try 2012 directly:** https://main.d1931ionu4gntw.amplifyapp.com/?y=2012
**Code:** https://github.com/mahanteshimath/portfolio-on-aws

![Rewinding the site from 2026 to 2012](docs/rewind.gif)

## The idea

I started in data in October 2012, on a laptop with 4 GB of RAM, building SAP dashboards that had to fit inside the first retina iPad's 1 GB. For the last three years I've built with AI: RAG and agents for 40,000+ users at 3M. In 2024 I did something I hadn't done in over a decade: I went back to the beginning and became a student again. In January 2025 I started an M.Tech in AI at IIT Jodhpur.

A list of skills couldn't show that arc, so I built a portfolio that can travel back through it.

## The creative feature: Rewind

Pick a year (2012, 2016, 2020, 2022, 2024 or 2026) and the site **reboots on that year's typical machine**:

- **A BIOS boot screen** counts memory up to that year's RAM (4 GB → 32 GB). Older machines load visibly slower, with a stuttering progress bar before 2020. You can skip it with Esc.
- **The whole site re-skins** as the web looked that year: 2012 glossy skeuomorphism, 2016 Material, 2020 dark glass, 2022 neo-brutalism, 2024 AI chat, and 2026 an engineering datasheet.
- **In 2024 the chat box is real.** Ask anything about me and Amazon Nova 2 Lite on Amazon Bedrock answers live, using only the text on the page. It says "I don't know" rather than invent, and links to the section that covers the answer.
- **"Ask the model of that year"**: the same request, "shortlist the best 5 of these 200 resumes", gets each era's answer at that era's speed. 2012 finds nothing, 2020 invents candidates, 2024 reads only part of the pile, and 2026 is an agent that reads all 200. That agent is the Talent Navigator I built at 3M.
- The spec panel shows who I was, the typical machine, the state of AI, and what I built that year.

The hint ("This site has been rebuilt six times. Pick a year…") and a pulsing dot on 2012 invite the first rewind. Navigation is never blocked.

Screenshots and video (from the live site, in `docs/`):

- Rewind from 2026 to 2012, as a 9-second clip: `rewind.gif` / `rewind.mp4`
- 2026 home: `screenshots/desktop-2026.png`
- 2012 edition: `screenshots/desktop-2012.png`
- 2022 edition: `screenshots/desktop-2022.png`
- 2024 on mobile: `screenshots/mobile-2024.png`
- Boot screen mid-count: `screenshots/boot-2012.png`

## Sections

- **About:** my story, in my words, plus key facts.
- **Coursework:** the modules of the M.Tech.
- **Superpowers:** a "characteristics" table with measured results (8,000+ docs for 40K users, $1M/yr saved, 200+ resumes in under a minute), plus a chip pinout of the stack I wire together.
- **Projects & achievements:** Talent Navigator, enterprise RAG and agents, agentic RAG on arXiv papers, Bazaar AI Saathi (featured by Perplexity), a $1M/yr HANA optimisation, a central-bank data warehouse, and hackathon wins.
- **Journey:** a datasheet "revision history" from Rev 1.0 (TCS, 2012) to Rev 7.0 (AI Lead, 2025). Every revision can boot its year.
- **Contact.**

## AWS services used

| Service | What it does here |
|---|---|
| **AWS Amplify Hosting** | Serves the static site over HTTPS on a global CDN, with custom security and cache headers |
| **AWS Lambda** (function URL) | The Ask API: validates the question, enforces limits, calls the model |
| **Amazon Bedrock** (Amazon Nova 2 Lite) | Answers questions, grounded only on the portfolio's own text |
| **Amazon DynamoDB** | Per-visitor and site-wide daily caps, with TTL so the counters clean themselves up |
| **AWS CloudFormation** (AWS SAM template) | The whole API is one template in `api/`, deployed with one script |
| **Amazon CloudWatch Logs** | Token usage per request, 14-day retention |

**How the parts fit:**

- **Hosting:**
  - The `main` branch is a manual deployment, through the Amplify deployment API.
  - Only `index.html` and `assets/` are published. `amplify.yml` lists the same artifacts for Git-connected builds, so my source notes and resume never ship.
- **`customHttp.yml`:**
  - A strict Content-Security-Policy: `'self'` only, plus one `connect-src` for the Ask API. No inline code, no third-party scripts or fonts.
  - HSTS, `nosniff` and Referrer-Policy.
  - Immutable caching for fonts; `no-cache` for CSS/JS so redeploys are never stale.
- **The Ask API is built so it can't run up a bill or be misused:**
  - CORS allows only the site's origin.
  - Questions are capped at 300 characters and answers at 220 tokens.
  - Reserved concurrency is 5.
  - Each visitor gets 20 questions a day, and the whole site 1,500 a day.
  - IPs are stored only as salted hashes, and the counters expire after two days.
  - The model is told to treat the visitor's text as a question, never as instructions.
  - If the API is down or the day's limit is reached, the box falls back to linking the right section, so nothing breaks during judging.

## What I learned

- **One attribute, six websites.** Each era is a set of CSS custom-property overrides plus component rules under `[data-era]`. The same HTML renders all six. It taught me how much of a design is tokens and how much is component behaviour.
- **Deploying is a design decision.** An artifact allowlist and a strict CSP shaped how I wrote the front end: no inline styles, no CDNs, self-hosted fonts.
- **Grounding is a product decision.** The Ask box is useful because it refuses to guess. I compared three Bedrock models on the same questions: some merged facts from different projects ("all on AWS"), and Nova 2 Lite kept each fact with the project it belongs to. Testing models on my own data taught me more than any leaderboard.
- **Learning in public.** Going back to being a student after 13 years taught me to ship before I feel ready. This site is my coursework in agents, retrieval and MLOps, put where anyone can poke at it.

## Challenges

- **Animations froze in background tabs.** `requestAnimationFrame` is paused when a tab isn't visible, so the boot counter could stall at 0 MB. I moved it to a wall-clock timer.
- **Scroll position between eras.** Each skin has a different page height, so a re-skin dropped visitors into a different section. The fix keeps the control you clicked at the same place on screen.
- **Mobile versions of six design languages.** The 2024 chat skin's three-column pinout and hidden line breaks broke on phones until those overrides were scoped to desktop. Every era was then checked for horizontal overflow at 390 px.
- **Accessibility of a time machine.**
  - The dial uses toggle buttons: arrows move, Enter boots.
  - The page is inert while booting, and focus returns afterwards.
  - Screen readers hear each era's answer.
  - Reduced-motion users skip the boot entirely.
- **Honesty.**
  - The machine specs are typical for each year, not exact, and the era answers are reconstructions. The footer says so.
  - The live 2024 answers are labelled as coming from a model, which can still make mistakes.
- **A public AI endpoint on a student budget.** A function URL with no auth is easy to abuse. The answer was layers: CORS, a concurrency cap, atomic DynamoDB counters checked before Bedrock is called, and a graceful fallback in the browser.

## Built with

HTML, CSS and JavaScript, with no framework and no front-end dependencies, on AWS Amplify Hosting. The Ask API is Python on AWS Lambda, with Amazon Bedrock and DynamoDB.
