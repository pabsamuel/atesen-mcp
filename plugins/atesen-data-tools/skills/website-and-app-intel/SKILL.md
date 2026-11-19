---
name: website-and-app-intel
description: "Audit and analyse public websites and apps: convert pages to Markdown, detect a site's tech stack, check domain registration, run an SEO and broken-link crawl, read RSS feeds, search Hacker News, look up App Store and Google Play apps and reviews, inspect Shopify catalogs and Hugging Face models. Use for competitor, market and site-health questions."
---

# Website and app intelligence from public data

Use the `atesen-web-data` MCP tools. Each tool runs a public Apify Actor on the user's own Apify account and Apify bills per result, so start with a small limit and a small crawl depth.

## Pick the tool by the question

| Question | Tool |
|---|---|
| Give me this page, PDF or sitemap as clean text | `url_to_markdown_rag`, or `llm_dataset_builder` for text chunks |
| What is this site built with? | `website_tech_stack_detector` |
| Who registered this domain, and when does it expire? | `domain_whois_rdap_lookup` |
| What SEO problems and broken links does this site have? | `website_seo_audit` |
| What is new on this feed or blog? | `rss_feed_reader` |
| What do developers say about this product? | `hacker_news_search_comments` |
| What does this Hugging Face model offer, and under what license? | `huggingface_model_intel` |
| App Store details, prices, ratings, chart position | `app_store_scraper` |
| What do users complain about in an app? | `app_store_reviews_scraper`, `google_play_reviews_scraper` |
| What does this Shopify store sell, at what price? | `shopify_store_products_scraper` |

## How to work

1. Ask for the URL, app, or domain if the user did not give one.
2. Run the single most relevant tool first with a low limit, for example 20 reviews or a crawl of 10 pages.
3. Summarise findings as short, ranked points with the evidence (URL, review text, field value) beside each.
4. For SEO audits, list problems by impact: broken links and missing titles first, cosmetic items last.
5. For review mining, group by theme and count how often each theme appears before drawing conclusions.

## Limits

Only publicly reachable pages and listings are read. Respect the target site's terms. Tell the user when a tool returned fewer results than requested.
