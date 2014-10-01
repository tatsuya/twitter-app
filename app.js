'use strict';

/**
 * Module dependencies.
 */
var http = require('http');
var path = require('path');
var express = require('express');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index', { title: 'Twitter' });
});

var Twit = require('twit');
var config = require('./config');
var twitter = new Twit(config);
var stream = twitter.stream('statuses/sample');

var server = http.createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(socket) {
  stream.on('tweet', function(tweet) {
    socket.emit('info', { tweet: tweet });
  });
});

stream.on('error', function(err) {
  console.log('Error: ' + err.message);
  server.close();
});

server.listen(3000, function() {
  console.log('Express server listening on port 3000');
});