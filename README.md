# WebScraper

## This project has an API consisting of 3 endpoints:

1. /scrapeUrl (POST) -> Receives as parameters the URL in the form of a string mapped to the 'url' field and four booleans representing scraping options for different types of content. The four booleans are: 'texts,' 'links,' 'scripts,' and 'images.'

2. /scrapeTest (GET) -> Same logic as the first endpoint, except it doesn't receive any parameters. The scraping logic is executed on the test link, extracting all categories of content.

3. /analyseTexts (POST) -> It receives the URL link as a parameter mapped to the 'url' field and extracts all the textual content from that web page. Then, it iterates through the words in each extracted text and calculates the score for positive/negative sentiments using two dictionaries of words.

## How to run the application:

1. Install the npm dependencies by running the command `npm install` in both `backend` and `frontend` folders.

2. After the dependencies has been installed, run the command `npm run start` in both of the folders from the first step.

3. The API will be running on port 8000 and the client on port 8080.

## Examples of API calls:

http://localhost:8000/scrapeUrl - POST
[[url : https://www.google.com, texts: true, images: true, scripts: true, links: true]]

http://localhost:8000/scrapeUrl - POST
[[url : https://wsa-test.vercel.app/, texts: true, images: true, scripts: false, links: false]]

http://localhost:8000/scrapeTest - GET

http://localhost:8000/analyseTexts - POST
[[url : https://www.google.com]]

http://localhost:8000/analyseTexts - POST
[[url : https://wsa-test.vercel.app/]]