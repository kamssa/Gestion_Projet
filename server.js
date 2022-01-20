const express = require('express');

const app = express();

app.use(express.static('./dist/Ges-pro'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/Ges-pro/'}),
);

app.listen(process.env.PORT || 8080);
