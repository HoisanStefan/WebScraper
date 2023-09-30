const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

const getHtml = async (url) => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto(url);

  await page.waitForTimeout(3000);

  // Get the fully-rendered HTML
  const html = await page.content();

  await browser.close();

  return html;
};

const scrapeURL = async (url) => {
  const html = await getHtml(url);
  const $ = cheerio.load(html);

  const texts = [];
  const anchors = [];
  const scripts = [];
  const images = [];

  //   Texts
  function extractText(element) {
    const children = $(element).contents();
    children.each((index, child) => {
      if (child.type === "text" && $(child).text().trim() != "") {
        texts.push($(child).text().trim());
      } else if (child.type === "tag") {
        extractText(child);
      }
    });
  }

  extractText("body");

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

module.exports = {
  scrapeURL,
};
