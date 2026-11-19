---
name: company-research
description: Research a company from public sources: French SIRENE registry and financials, SEC EDGAR filings, website contact details, public job postings and trademark risk for a name or slogan. Use when the user asks who a company is, how it is doing, how to reach it, whether it is hiring, or whether a brand phrase is already registered.
---

# Company research with public data

Use the `atesen-company-data` MCP tools. Each tool runs a public Apify Actor on the user's own Apify account and Apify bills per result, so always start with a small result limit (1 to 5) and widen only if the user asks.

## Pick the tool by the question

| Question | Tool |
|---|---|
| Who is this French company (SIREN, SIRET, VAT, address, activity code)? | `french_company_enrichment_sirene` |
| Are French accounts healthy (revenue, margins, ratios)? | `french_company_financials_ratios` (needs a SIREN) |
| Which SIREN does this French website belong to? | `french_website_siren_mentions_legales` |
| What did a US-listed company file or report? | `sec_edgar_company_data` (CIK or ticker) |
| Is this slogan or brand idea already a live USPTO trademark? | `trademark_phrase_risk_check` |
| How do I contact this company? | `website_email_contact_finder` |
| Is the company hiring, and for what? | `career_site_jobs_api`, or `workday_jobs_scraper` for Workday boards |

## How to work

1. Restate what the user wants to know in one line, then choose the smallest set of tools that answers it.
2. Run one tool with a low limit. Check the output before running the next one.
3. Chain tools only when the first result feeds the second, for example SIRENE gives the SIREN that the financials tool needs.
4. Report what each tool returned, name the source tool, and mark gaps plainly. Do not fill missing fields from memory.
5. For trademark checks, give the risk verdict and the matching marks, and say it is a screening result and not legal advice.

## Limits

Only public data is returned. Contact details are those the company publishes itself. Never guess an email address that a tool did not return.
