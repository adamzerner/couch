var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var pages;

app.use(express.static('assets'));

function respondWithIndex(req, res) {
  res.sendFile('index.html', { root: __dirname });
}

pages = ['/', '/room/:roomName'];

pages.forEach(function (page) {
  app.get(page, respondWithIndex);
});

io.sockets.on('connection', function (socket) {
  socket.on('joinRoom', function (roomName) {
    socket.join(roomName, function () {
      socket.on('setVideoOnServer', function (inputUrl) {
        io.sockets.in(roomName).emit('setVideoOnClient', inputUrl); // can't broadcast(?)
      });
    });
  });
});

server.listen(8000);
