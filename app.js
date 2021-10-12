/**
 * Brandon Ta
 * INFO 441
 * Lecture Exercise 3
 */

import fetch from 'node-fetch';
import parser from 'node-html-parser';
import fs from 'fs';
import express from 'express';

const app = express();
const url = "https://google.com";

app.get('/', (req, res) => {
  res.type("html");
  res.send(fs.readFileSync("index.html"));
});

app.get('/index.js', (req, res) => {
  res.type("js");
  res.send(fs.readFileSync("index.js"));
});

app.get('/api/alts', (req, res) => {
  res.type("txt");
  const url = req.query.url;
  console.log(url);
  fetch(url)
    .then(resp => resp.text())
    .then(text => {
      const html = parser.parse(text);
      const imgs = html.querySelectorAll("img");
      let numAlts = 0;
      for (const img of imgs) {
        if (img.attributes.alt) numAlts++;
      }
      res.send(numAlts.toString());
    })
    .catch(err => {
      console.log(err);
      res.send("Invalid URL");
    })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
