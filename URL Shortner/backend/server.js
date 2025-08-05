const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const urlDatabase = {}; 
function generateCode() {
  return Math.random().toString(36).substring(2, 8);
}

app.post('/shorten', (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) return res.status(400).json({ error: 'URL is required to shorten' });

  let code = generateCode();
  while (urlDatabase[code]) {
    code = generateCode();
  }
  urlDatabase[code] = originalUrl;

  res.json({ shortUrl: `http://localhost:${PORT}/r/${code}` });
});

app.listen(PORT, () => {
  console.log('Running at port 5000');
});
