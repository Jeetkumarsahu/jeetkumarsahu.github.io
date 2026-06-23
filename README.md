# JanSetu Civic Tracker

JanSetu is a starter civic-tech prototype for tracking verified public problems, resolution progress, and election promises without promoting or attacking any political party.

This repository is intentionally simple for the first GitHub upload. It runs as a static website with no build step.

## Current prototype

- Local area issue feed
- National issue feed
- Solved problem records
- Fictional leader accountability profiles
- Basic report submission with browser local storage
- Data-weighted rating concept: 80% objective data, 20% public feedback
- Neutral labels such as `Accountability Watch` instead of emotional attack labels
- GitHub Pages-ready static deployment setup

## Open locally

Open `index.html` in a browser.

No npm install is required.

## Important principle

JanSetu should not tell people who to vote for. It should show verified civic records so citizens can make their own decision.

## Suggested next work

1. Replace demo data with real database-backed records.
2. Add user identity and reporter trust score.
3. Add evidence upload with moderation.
4. Add duplicate issue detection.
5. Add promise tracker with source links.
6. Add admin verification workflow.
7. Add audit logs for every rating change.

## Repository structure

```text
.
+-- index.html
+-- styles.css
+-- app.js
+-- assets/
|   +-- issue-map.svg
+-- docs/
|   +-- DEPLOYMENT.md
|   +-- PRODUCT_PLAN.md
|   +-- TRUST_AND_SAFETY.md
|   +-- DATA_MODEL.md
+-- .nojekyll
+-- .gitignore
+-- README.md
```

## Demo data

All politician/leader profiles and public issues in this prototype are fictional.
