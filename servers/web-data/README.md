# Atesen Web and Developer Data (MCP server)

URL to Markdown, site tech stack, WHOIS/RDAP, SEO audit, RSS, Hacker News, app store and Hugging Face data.

Each tool runs one public Apify Actor of the `atesen-software` account and returns the dataset items as JSON. The run happens on **your** Apify account with **your** token, so Apify bills you per result at the Actor's published pay-per-event price. This server has no backend of its own, stores nothing and logs nothing.

## Install

Get a token in Apify Console > Settings > Integrations. A free Apify account is enough to start.

Claude Desktop, Cursor and VS Code (`mcp.json` style):

```json
{
  "mcpServers": {
    "atesen-web-data-mcp": {
      "command": "npx",
      "args": ["-y", "atesen-web-data-mcp"],
      "env": { "APIFY_TOKEN": "YOUR_APIFY_TOKEN", "ATESEN_MAX_CHARGE_USD": "0.25" }
    }
  }
}
```

`ATESEN_MAX_CHARGE_USD` caps what a single tool call may cost (passed to Apify as `maxTotalChargeUsd`). `ATESEN_TIMEOUT_SECS` (default 120, max 300) bounds the wait.

## Tools

| Tool | What it does | Apify price | Actor |
|---|---|---|---|
| `url_to_markdown_rag` | Convert web pages, PDFs and sitemaps to Markdown for retrieval workflows. | up to $0.0012 / result | [Apify](https://apify.com/atesen-software/url-to-markdown-rag) |
| `llm_dataset_builder` | Convert website content to Markdown and text chunks for retrieval workflows. | up to $0.0015 / result | [Apify](https://apify.com/atesen-software/llm-dataset-builder) |
| `website_tech_stack_detector` | Identify technologies used by public websites. | up to $0.0015 / result | [Apify](https://apify.com/atesen-software/website-tech-stack-detector) |
| `domain_whois_rdap_lookup` | Look up domain registration, expiry, registrar and DNS metadata. | up to $0.0015 / result | [Apify](https://apify.com/atesen-software/domain-whois-rdap-lookup) |
| `website_seo_audit` | Crawl websites to inspect SEO metadata and broken links. | up to $0.0015 / result | [Apify](https://apify.com/atesen-software/website-seo-audit) |
| `rss_feed_reader` | Read public RSS, Atom, RDF and JSON feeds, or find the feed of a website, and retrieve titles, links, dates, authors, summaries and categories. Each saved item is charged by the Actor; feed info and error rows are free. | up to $0.0015 / result | [Apify](https://apify.com/atesen-software/rss-feed-reader) |
| `hacker_news_search_comments` | Search public Hacker News stories and comments or read the front page, with optional bounded comment expansion. Uses the official Algolia and Firebase APIs. Each saved result is charged by the Actor; status and error rows are free. | up to $0.0015 / result | [Apify](https://apify.com/atesen-software/hacker-news-search-comments) |
| `huggingface_model_intel` | Retrieve public model metadata, declared licenses, download counts, likes and upstream trending scores. Successful model rows are charged by the Actor; error details are not billed. No inference or model-weight downloads. | up to $0.0015 / result | [Apify](https://apify.com/atesen-software/huggingface-model-intel) |
| `app_store_scraper` | Retrieve public Apple App Store app details, ratings, prices, versions and top-chart positions by app URL, app ID, bundle ID, search term or developer. Each saved result is charged by the Actor; status and error rows are free. | up to $0.0015 / result | [Apify](https://apify.com/atesen-software/app-store-scraper) |
| `app_store_reviews_scraper` | Retrieve public App Store reviews and ratings by country. | up to $0.0015 / result | [Apify](https://apify.com/atesen-software/app-store-reviews-scraper) |
| `google_play_reviews_scraper` | Retrieve public Google Play app reviews and ratings. | up to $0.0015 / result | [Apify](https://apify.com/atesen-software/google-play-reviews-scraper) |
| `shopify_store_products_scraper` | Retrieve products, prices, variants and stock from Shopify stores. | up to $0.0015 / result | [Apify](https://apify.com/atesen-software/shopify-store-products-scraper) |

Start with a small result limit (for example 3 items) to see the output before a larger run. Tool results are truncated at 60,000 characters.

## Privacy and limits

- Your token is read from the environment and sent only to api.apify.com.
- Public data only. Source websites can change or block requests; availability is not guaranteed.
- Not affiliated with or endorsed by the websites the Actors read.
- Support: support@atesensoftware.com. License: MIT.
