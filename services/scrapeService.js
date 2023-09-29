const axios = require("axios");
const cheerio = require("cheerio");

const scrapeURL = async (url) => {
  let ans = await axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const articles = [];
      const scripts = [];

      $("div").each((index, element) => {
        const article = {};

        article.title = $(element).find("div").text();

        articles.push(article);
      });

      $("script").each((index, element) => {
        let script = {};

        const text = $(element).text();

        script = { ...element.attribs, type: element.name };

        if (text) {
          script = { ...script, text };
        }
        scripts.push(script);
      });

      return { success: true, articles, scripts };
    })
    .catch((error) => {
      console.error(error.message);
      return { success: false, data: [] };
    });

  return ans;
};

module.exports = {
  scrapeURL,
};
