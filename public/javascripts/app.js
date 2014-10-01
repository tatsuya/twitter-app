$(function() {
  var tweets = [];
  var socket = io();
  socket.on('info', function(data) {
    $('#tweets').prepend($('<li>').text(data.tweet.text));
  });
});