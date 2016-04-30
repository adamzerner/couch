var express = require('express');
var app = express();
var pages;

app.use(express.static('assets'));

function respondWithIndex(req, res) {
  res.sendFile('index.html', { root: __dirname });
}

pages = ['/', '/room/:roomName'];

pages.forEach(function (page) {
  app.get(page, respondWithIndex);
});

app.listen(3000, function () {
  console.log('Listening on port 3000...');
});
