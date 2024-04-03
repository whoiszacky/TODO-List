const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3500;

app.use(bodyParser.json());

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
  "Access-Control-Allow-Headers": "Content-Type",
};

const path = require('path');
// Read quotes from the JSON file
const filePath = path.join(__dirname, 'quotes.json');

let quotesData;
try {
  quotesData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
} catch(err) {
  console.error('Error while reading the JSON file:', err);
}

app.get('/quoteoftheday', (req, res) => {
    try {
      if (quotesData && quotesData.quotes && quotesData.quotes.length > 0) {
        const randomQuote = quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
        res.set({ ...headers, "Content-Type": "application/json" }).status(200).json({ quote: randomQuote });
      } else {
        res.set(headers).status(404).json({ error: "No quotes available." });
      }
    } catch (error) {
      const errorMessage = "An error occurred while fetching the quote. Please try again later.";
      res.set(headers).status(500).json({ error: errorMessage });
    }
  });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



        // this way u can out put as text
        /*
        app.get('/text', (req, res) => {
          try {
            const randomProverb = proverbsData.proverbs[Math.floor(Math.random() * proverbsData.proverbs.length)];
          
            res.set({ ...headers, "Content-Type": "text/plain" }).status(200).send(randomProverb);
          } catch (error) {
            res.set(headers).status(500).send(error.toString());
          }
        });*/