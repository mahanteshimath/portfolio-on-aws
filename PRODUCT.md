# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS, no framework, no build step. Hosted on AWS Amplify Hosting (required by the AWS Student Builder Challenge). AWS scope for the creative feature: Amplify Hosting only; the feature runs fully in the browser with pre-written content.

## Users

1. Hackathon judges (AI scoring + AWS expert panel) for the AWS Student Builder Challenge "Build Your Tech Superpower". They score creativity/memorability (30%), working AWS implementation (25%), communication (25%), completeness/usability on desktop and mobile (20%). They skim many entries quickly.
2. Afterwards: recruiters, hiring managers, peers who arrive from LinkedIn (9K+ followers), resume, or internship/job applications.

## Product Purpose

Personal portfolio of Mahantesh Hiremath that tells his story, shows skills and projects, and contains one interactive creative feature with a visible hint. Must include About Me, Skills/Tech Superpowers, Projects/Achievements, a GitHub repo link, and stay easy to navigate. Success = a top-50 Gate 1 score and a win at Gate 2; afterwards, a live link worth putting on LinkedIn.

## Positioning

A data engineer of 14 years (since Oct 2012) who became a student again: M.Tech in Artificial Intelligence at IIT Jodhpur (started Jan 2025, completing Dec 2026) while working as AI Lead at 3M, balancing family, office and study. He learned many concepts from scratch, experimented with every model generation, and watched models go from not-so-smart to agents. The story no other entrant can copy: 2012 SAP/Xcelsius iPad dashboards → banking data warehouses → cloud/Snowflake cost savings → back to class → enterprise RAG and agents for 60K users.

Creative feature (decided, user-pinned): **"Rewind" hardware time machine** — visitors pick a year (2012, 2016, 2020, 2022, 2024, 2026); the portfolio "boots" on that year's typical machine (memory test to that year's RAM, CPU, storage, load speed scaled to the era, skippable), then the WHOLE site re-skins to how websites looked that year. Each stop pairs "what the machine could do" with "what I built", plus an illustrative "model of that year" answer to the same question. Hardware is the backdrop; his work is the foreground. Only the feature is slow; real navigation stays instant. Default (2026) look: modern hardware spec sheet. Student-again dating: 2024 = back to learning AI from scratch; Jan 2025 = IIT Jodhpur M.Tech AI begins (completing Dec 2026).

## Operating Context

Visited on desktop and mobile, often for under a minute. Must load during the judging window via Amplify. Submission also needs screenshots of portfolio and AWS setup, documented AWS services, learnings and challenges.

## Capabilities and Constraints

- Three core sections required; navigation must work; creative feature must not obstruct navigation and needs a visible hint.
- Original site, not previously published.
- Phone number must NOT appear on the public site; contact = email (mahanteshimath@gmail.com), LinkedIn (linkedin.com/in/mahantesh-hiremath), GitHub (github.com/mahanteshimath), YouTube/blog ATOZABOUTDATA.
- `.env` exists in repo root and must never be committed.
- No headshot provided yet (open).

## Brand Commitments

Name: Mahantesh Hiremath. Title on resume: Lead AI/ML Engineer; current role AI Lead, 3M GTC, Bengaluru. Voice: first person, humble lifelong learner, "student again", MPOV ("my point of view"). Languages: Kannada (native), Hindi, English, Marathi, Telugu.

## Evidence on Hand

Sources: `sources/Mahantesh_Hiremath_Resume.pdf`, `sources/LinkedIn Profile Mahantesh.pdf`.

- 3M AI Lead (Jul 2025–present): enterprise RAG/agentic AI over 8,000+ docs for 40,000+ users; internal ChatGPT-equivalent for 60K+ users; Talent Navigator (Workday) 200+ resumes/upload, shortlisting under one minute; Agentic RAG on arXiv with Snowflake Intelligence; Legal, IT Support, DevOps, Image Gen, Canvas, Data Analysis agents. AWS Bedrock, OpenSearch; Azure AI Foundry/Search.
- 3M Lead Data Engineer (Dec 2021–Jun 2025): HANA NSE → 50% EC2 reduction, $1M/yr saved, Annual 1% TCC Award; $10K+/month Snowflake savings; Firehose + Lambda streaming; Databricks AI metadata across 1,000+ objects; Streamlit observability tool; Iceberg lakehouse; 30+ member team, 200+ interviews.
- EY Senior Consultant (Mar 2020–Nov 2021): 10+ yr SQL/Oracle DW → SAP HANA 2.0; 200+ BODS jobs.
- IBM Malaysia/India (Jun 2016–Mar 2020): $5M+ banking DW for Bank Negara Malaysia; 35% perf gain; led 50+ team; Manager's Choice Award 2019; 10/10 client rating; PETRONAS mobile backend on Azure.
- TCS System Engineer (Oct 2012–May 2015): 6 SAP iPad dashboards, voice-enabled SAP Dashboard 4.0, Crystal/WEBI reports.
- Recognition: Hive Challenge Winner (Alexa prize); Snowflake Hackathon 2nd Prize + 2x Top-5; Dremio hackathon runner-up; Bazaar-ai-saathi (Indian stock-market AI) featured in Perplexity docs; 3M CREST/GOLD/SILVER; TCS On-the-Spot awards.
- Education: IIT Jodhpur M.Tech AI (Jan 2025–Dec 2026); Perplexity AI Business Fellowship first cohort (Mar–Aug 2025); B.E. ECE, VTU (2008–2012).
- Certifications 40+: AWS Cloud Practitioner, SnowPro, SAP HANA 2.0, SAP BODS 4.2, Azure AZ-900, DP-900, Neo4j agents, Oracle OCP, etc.
- Absent: testimonials, headshot, project screenshots. Do not fabricate.

## Product Principles

1. The story is the differentiator: every section reinforces "14 years of data, student again in AI".
2. Numbers are real and sourced from the resume; never inflate.
3. The creative feature reveals him, and never blocks the three core sections.
4. Judge-skimmable: the point lands in the first viewport and every section reads in seconds.
5. Nothing can break during judging: static, no runtime network dependencies.
6. Hardware/AI history facts are widely documented milestones only; machine specs labelled "typical"; model answers labelled as illustrative reconstructions.

## Accessibility & Inclusion

WCAG AA contrast, full keyboard operation of the Rewind dial, prefers-reduced-motion respected, works on mobile touch.
