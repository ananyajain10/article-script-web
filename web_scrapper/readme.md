# Article Enhancement Pipeline

A Node.js script that fetches articles from a Laravel API, finds related content on Google, rewrites using Gemini LLM, and publishes the updated article back.

## Setup

1. Install dependencies:
   npm install axios cheerio dotenv @google/genai

2. Create a .env file in the root directory.

3. Run the script:
   node index.js

## Environment Variables

LARAVEL_API_BASE=Base URL of your Laravel API  
GEMINI_API_KEY=API key for Google Gemini  
GOOGLE_API_KEY=Google Custom Search API key  
GOOGLE_CX=Google Custom Search Engine ID  

## Functions

fetchLatestArticle  
Fetches the latest article from the Laravel API.

searchGoogle  
Searches Google using the article title and returns top two result links.

scrapeArticle  
Scrapes paragraph content from a given article URL.

rewriteWithLLM  
Sends the original and reference articles to Gemini LLM and returns rewritten title and content as JSON.

publishArticle  
Publishes a new article to the Laravel API using title and content.

main  
Orchestrates the full pipeline: fetch, search, scrape, rewrite, and publish.

## Flow

Fetch latest article → Search Google → Scrape references → Rewrite with LLM → Publish new article

