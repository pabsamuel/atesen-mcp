# Atesen Company and Jobs Data (MCP server)

French company registry data, US SEC filings, trademark phrase checks, website contacts and public job postings.

Each tool runs one public Apify Actor of the `atesen-software` account and returns the dataset items as JSON. The run happens on **your** Apify account with **your** token, so Apify bills you per result at the Actor's published pay-per-event price. This server has no backend of its own, stores nothing and logs nothing.

## Install

Get a token in Apify Console > Settings > Integrations. A free Apify account is enough to start.

Claude Desktop, Cursor and VS Code (`mcp.json` style):

```json
{
  "mcpServers": {
    "atesen-company-data-mcp": {
      "command": "npx",
      "args": ["-y", "atesen-company-data-mcp"],
      "env": { "APIFY_TOKEN": "YOUR_APIFY_TOKEN", "ATESEN_MAX_CHARGE_USD": "0.25" }
    }
  }
}
```

`ATESEN_MAX_CHARGE_USD` caps what a single tool call may cost (passed to Apify as `maxTotalChargeUsd`). `ATESEN_TIMEOUT_SECS` (default 120, max 300) bounds the wait.

## Tools

| Tool | What it does | Apify price | Actor |
|---|---|---|---|
| `french_company_enrichment_sirene` | Look up French company data by business identifiers using SIRENE. | up to $0.004 / result | [Apify](https://apify.com/atesen-software/french-company-enrichment-sirene) |
| `french_company_financials_ratios` | Retrieve French company financial statements and ratios by SIREN. | up to $0.01 / result | [Apify](https://apify.com/atesen-software/french-company-financials-ratios) |
| `french_website_siren_mentions_legales` | Find French business identifiers in website legal notices. | up to $0.005 / result | [Apify](https://apify.com/atesen-software/french-website-siren-mentions-legales) |
| `sec_edgar_company_data` | Retrieve official SEC filing metadata and selected US-GAAP fact observations for a company by CIK or ticker. The request supplies a User-Agent with an organization name and contact email for the SEC. Each saved result is charged by the Actor; status and error rows are free. | up to $0.0015 / result | [Apify](https://apify.com/atesen-software/sec-edgar-company-data) |
| `trademark_phrase_risk_check` | Check slogans and brand ideas against live USPTO trademarks. Returns a clear, low, medium or high risk verdict per phrase with the conflicting marks, classes and status. Screening aid, not legal advice. Each checked phrase is charged by the Actor; phrases that could not be checked are free. | up to $0.05 / result | [Apify](https://apify.com/atesen-software/trademark-phrase-risk-check) |
| `website_email_contact_finder` | Extract published business contact details from websites. | up to $0.005 / result | [Apify](https://apify.com/atesen-software/website-email-contact-finder) |
| `career_site_jobs_api` | Retrieve job postings from public company career sites and ATS boards. | up to $0.005 / result | [Apify](https://apify.com/atesen-software/career-site-jobs-api) |
| `workday_jobs_scraper` | Retrieve job postings from public Workday career boards. | up to $0.001 / result | [Apify](https://apify.com/atesen-software/workday-jobs-scraper) |

Start with a small result limit (for example 3 items) to see the output before a larger run. Tool results are truncated at 60,000 characters.

## Privacy and limits

- Your token is read from the environment and sent only to api.apify.com.
- Public data only. Source websites can change or block requests; availability is not guaranteed.
- Not affiliated with or endorsed by the websites the Actors read.
- Support: support@atesensoftware.com. License: MIT.
