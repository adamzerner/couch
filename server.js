var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var pages;

// serve static assets
app.use(express.static('assets'));

// respond with index.html
function respondWithIndex(req, res) {
  res.sendFile('index.html', { root: __dirname });
}

pages = ['/', '/room/:roomName'];

pages.forEach(function (page) {
  app.get(page, respondWithIndex);
});

// socket stuff
io.sockets.on('connection', function (socket) {
  socket.on('joinRoom', function (roomName) {
    socket.join(roomName, function () {
      socket.on('setVideoOnServer', function (inputUrl) {
        io.sockets.in(roomName).emit('setVideoOnClient', inputUrl); // can't broadcast(?)
      });

      socket.on('playVideo', function () {
        io.sockets.in(roomName).emit('playVideo');
      });

      socket.on('pauseVideo', function () {
        io.sockets.in(roomName).emit('pauseVideo');
      });

      socket.on('skipTo', function (seconds) {
        io.sockets.in(roomName).emit('skipTo', seconds);
      });
    });
  });

  socket.on('leaveRoom', function (roomName) {
    socket.leave(roomName, function () {
      // socket.removeListener('setVideoOnServer');
      // socket.removeListener('playVideo');
      // socket.removeListener('pauseVideo');
      // socket.removeListener('skipTo');
    });
  });
});

server.listen(8000);
