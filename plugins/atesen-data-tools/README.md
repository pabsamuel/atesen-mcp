# Atesen Data Tools

Public company, trademark, job-posting, website and app-store data for Claude. The plugin connects Claude to 20 Apify Actors published by Atesen Software and adds two skills that tell Claude which tool to use and how to keep each run small.

## What is inside

- **Skill `company-research`**: French SIRENE registry and financial ratios, SEC EDGAR filings, website contact details, public job postings, USPTO trademark phrase screening.
- **Skill `website-and-app-intel`**: URL to Markdown, tech stack detection, WHOIS and RDAP, SEO and broken-link audit, RSS, Hacker News, Hugging Face models, App Store and Google Play apps and reviews, Shopify catalogs.
- **Two remote MCP servers** (`atesen-company-data` and `atesen-web-data`) declared in `.mcp.json`. They point at Apify's hosted endpoint `https://mcp.apify.com` with a `tools=` filter that exposes only the Atesen Actors listed in that file.

## What it runs and sends

The plugin runs no local code. When Claude calls a tool, the request goes over HTTPS to `mcp.apify.com`, which runs the matching public Actor from `apify.com/atesen-software`. The Actor fetches public web pages or public registries (SIRENE, SEC EDGAR, USPTO, RDAP, app stores) and returns the result. Atesen Software does not receive your prompts, tokens or results.

## Setup and cost

You need your own Apify account. When you install the plugin it asks for your Apify API token (stored as a sensitive value, never written to a file in this repository). Apify bills each Actor run to your account, usually a few cents per run, and the skills tell Claude to start with a small result limit.

## Links

- Source: https://github.com/pabsamuel/atesen-mcp
- Registry entries: `io.github.pabsamuel/atesen-company-data-mcp` and `io.github.pabsamuel/atesen-web-data-mcp`
- Website: https://atesensoftware.com

MIT licensed. Independent project, not affiliated with Apify.
