# article-script-web

This repository contains a full-stack setup to generate, rewrite, and display articles using a Laravel API, a Node.js automation script, and a React frontend.

## Folders

article-api  
Laravel backend that provides CRUD APIs for articles.

frontend-article  
React frontend that displays all articles in cards and allows viewing full article content.

web_scrapper  
Node.js script that fetches the latest article, searches Google, scrapes reference articles, rewrites content using Gemini LLM, and publishes a new article to the Laravel API.

## Setup

Clone the repository and install dependencies in each folder.

### article-api
- Configure `.env` for database.
- Run migrations.
- Start server with:
  php artisan serve

### frontend-article
- Install dependencies:
  npm install
- Start dev server:
  npm run dev

### web_scrapper
- Install dependencies:
  npm install
- Create `.env` file.
- Run script:
  node index.js

## Environment Variables (web_scrapper)

Create a `.env` file inside `web_scrapper`:

LARAVEL_API_BASE=http://127.0.0.1:8000/api  
GEMINI_API_KEY=your_gemini_api_key  
GOOGLE_API_KEY=your_google_custom_search_key  
GOOGLE_CX=your_search_engine_id  

## Flow

1. Laravel API stores and serves articles.  
2. Node script fetches latest article, rewrites it using references and LLM, and creates a new article.  
3. React frontend displays all articles and allows reading full content.

<img width="1461" height="260" alt="Screenshot 2025-12-24 014609" src="https://github.com/user-attachments/assets/56b5df91-39d4-45e9-aa5e-d9a1e30ed221" />
<img width="1906" height="903" alt="Screenshot 2025-12-24 024631" src="https://github.com/user-attachments/assets/e57dae1d-197d-47aa-bf75-ce7694bc9c09" />
<img width="1904" height="949" alt="image" src="https://github.com/user-attachments/assets/11cf7a85-ae53-4739-8e81-f7acb1d56b41" />


## Requirements

Node.js  
XAMPP
PHPMYADMMIN
MySQL database  
Google Custom Search API key  
Google Gemini API key

