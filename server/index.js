/* DEVELOPPER TEST SERVER FOR APIS */

const express = require('express');
const cors = require('cors');
const { extract } = require('@extractus/feed-extractor');

const app = express();
app.use(cors());

app.get('/api/rss', async (req, res, next) => {
  const { url } = req.query;
  if (!url) {
    return next();
  }
  try {
    const feed = await extract(url, {
      normalization: false,
    });
    return res.json({ data: feed });
  } catch (error) {
    return res.status(400).json({ url });
  }
});

app.use((req, res) => {
  res.status(404).send('404 : DEAD END !');
});

app.listen(4000);
