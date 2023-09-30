const cors = require("cors");
const express = require("express");

const scrapeService = require("./services/scrapeService");

const app = express();

const PORT = 8080;

const urlTest = "https://wsa-test.vercel.app/";

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.post("/scrapeUrl", async (req, res) => {
  const { url } = req.body;

  let ans = await scrapeService.scrapeURL(url);

  res.send(ans);
});

app.get("/scrapeTest", async (req, res) => {
  let ans = await scrapeService.scrapeURL(urlTest);

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
