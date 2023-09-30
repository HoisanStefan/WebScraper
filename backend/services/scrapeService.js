const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const dictionaries = require("../data/dictionaries");

const positiveWords = dictionaries.positiveWords;
const negativeWords = dictionaries.negativeWords;

const getHtml = async (url) => {
  const browser = await puppeteer.launch({ headless: "new" });

  const page = await browser.newPage();

  await page.goto(url);

  await page.waitForTimeout(3000);

  // Get the fully-rendered HTML
  const html = await page.content();

  await browser.close();

  return html;
};

const extractTexts = ($) => {
  texts = [];

  const extractText = (element) => {
    const children = $(element).contents();
    children.each((index, child) => {
      if (child.type === "text" && $(child).text().trim() != "") {
        texts.push($(child).text().trim());
      } else if (child.type === "tag") {
        extractText(child);
      }
    });
  };

  extractText("body");

  return texts;
};

const analyseText = (text) => {
  const words = text.toLowerCase().split(" ");
  let score = 0;
  const positiveMatches = [];
  const negativeMatches = [];

  words.forEach((word) => {
    if (positiveWords.includes(word)) {
      score++;
      positiveMatches.push(word);
    } else if (negativeWords.includes(word)) {
      score--;
      negativeMatches.push(word);
    }
  });

  const result = {
    score,
    comparative: score / words.length,
    positiveMatches,
    negativeMatches,
    tokens: words,
  };

  return result;
};

const scrapeURL = async (url, options) => {
  const html = await getHtml(url);
  const $ = cheerio.load(html);

  let texts = [];
  const anchors = [];
  const scripts = [];
  const images = [];

  if (options[0]) {
    //   Texts
    texts = extractTexts($);
  }

  if (options[1]) {
    //   Links
    $("a").each((index, element) => {
      const text = $(element).text();
      let link = $(element).attr("href");

      if (text && text != "" && link && link != "") {
        if (!link.startsWith("http")) {
          link = url + link;
        }

        anchors.push({ text, link: link });
      }
    });
  }

  if (options[2]) {
    //   Images
    $("img").each((index, element) => {
      let src = $(element).attr("src");

      if (src) {
        if (!src.startsWith("http")) {
          src = url + src;
        }
        images.push(src);
      }
    });
  }

  if (options[3]) {
    //   Scripts
    $("script").each((index, element) => {
      let src = $(element).attr("src");

      if (src) {
        if (!src.startsWith("http")) {
          src = url + src;
        }
        scripts.push(src);
      }
    });
  }

  return {
    success: true,
    texts,
    anchors,
    scripts,
    images,
    numberOfTexts: texts.length,
    numberOfAnchors: anchors.length,
    numberOfScripts: scripts.length,
    numberOfImages: images.length,
  };
};

const analyseTexts = async (url) => {
  const html = await getHtml(url);
  const $ = cheerio.load(html);

  let texts = [];

  texts = extractTexts($);

  texts = texts.map((text, index) => {
    const result = analyseText(text);

    return { text, sentimentResult: result };
  });

  return {
    success: true,
    texts,
    numberOfTexts: texts.length,
  };
};

module.exports = {
  scrapeURL,
  analyseTexts,
};
