const cheerio = require("cheerio");
const fs = require("fs");
const BASE_URL = "https://beyondchats.com";
const START_URL = "https://beyondchats.com/blogs/page/14/";

async function fetchHTML(url) {
  const res = await fetch(url);
  return await res.text();
}

async function scrapePage(url) {
  const html = await fetchHTML(url);
  const $ = cheerio.load(html);

  const articles = [];

  // Get all articles on this page
  $("article.entry-card").each((i, el) => {
    const link = $(el).find("h2 a").attr("href");
    const date = $(el).find("time").attr("datetime") || $(el).find("time").text();

    if (link) {
      articles.push({
        url: link.startsWith("http") ? link : BASE_URL + link,
        date: date ? date.trim() : null
      });
    }

  });

  // Find next page link
  let nextPage = null;
  $("a").each((i, el) => {
    const text = $(el).text().toLowerCase();
    if (text.includes("next")) {
      const href = $(el).attr("href");
      if (href) {
        nextPage = href.startsWith("http") ? href : BASE_URL + href;
      }
    }
  });

  return { articles, nextPage };
}




async function scrapeArticleData(url) {
  const html = await fetchHTML(url);
  const $ = cheerio.load(html);

  // Main title (h1)
  const title = $("#main h1").first().text().trim();

 
  // Whole article content container
  const contentContainer = $(
    "#content > div > div.elementor-element.elementor-element-b2a436b.elementor-widget.elementor-widget-theme-post-content"
  );

  let content = contentContainer.text().replace(/\n\s*\n/g, "\n\n").trim();

  return { title, content, url};
}


async function main() {
  let url = START_URL;
  let allArticles = [];

  while (url) {
    console.log("Scraping page:", url);
    const { articles, nextPage } = await scrapePage(url);


    allArticles = allArticles.concat(articles);

    

    if (nextPage && !allArticles.find(a => a.url === nextPage)) {
      url = nextPage;
    } else {
      url = null;
    }
  }

  console.log("Total articles found:", allArticles.length);
  console.log(allArticles);

  // Sort by date ascending (oldest first)
const sorted = allArticles
  .filter(a => a.date)
  .sort((a, b) => new Date(a.date) - new Date(b.date));

// Pick oldest 5
const oldestFive = sorted.slice(0, 5);


  const results = [];

for (const art of oldestFive) {
  console.log("Scraping article:", art.url);
  const data = await scrapeArticleData(art.url);
  results.push({ ...data, date: art.date });
}


fs.writeFileSync("oldest5.json", JSON.stringify(results, null, 2));
console.log("Saved oldest 5 articles to oldest5.json");

}

main().catch(console.error);
