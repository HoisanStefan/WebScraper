const cors = require("cors");
const express = require("express");

const scrapeService = require("./services/scrapeService");

const app = express();

const PORT = 8000;

const urlTest = "https://wsa-test.vercel.app/";

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const log = (ans) => {
  const prettyJSON = JSON.stringify(ans, null, 2);

  console.log(prettyJSON);
};

app.post("/scrapeUrl", async (req, res) => {
  const { url, texts, scripts, images, links } = req.body;

  let ans = await scrapeService.scrapeURL(url, [texts, links, images, scripts]);

  log(ans);

  res.send(ans);
});

app.get("/scrapeTest", async (req, res) => {
  let ans = await scrapeService.scrapeURL(urlTest, [true, true, true, true]);

  log(ans);

  res.send(ans);
});

app.post("/analyseTexts", async (req, res) => {
  const { url } = req.body;

  let ans = await scrapeService.analyseTexts(url);

  res.send(ans);
});

app.listen(PORT, () => {
  console.log("\x1b[32m%s\x1b[0m", "Server started on port:", PORT);
});
