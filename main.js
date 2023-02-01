const express = require('express');
const path = require("path");
const app = express();
const port = 4000;

app.use(express.static(path.join(__dirname, "")));
app.use(express.static('files'));

app.get('/', (req, res) => {
  console.log(`${__dirname}/index.html`);
  res.sendFile(`${__dirname}/index.html`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
