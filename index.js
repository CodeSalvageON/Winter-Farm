const fs = require('fs');
const express = require('express');

const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('', function (req, res) {
  const index = __dirname + '/public/static/index.html';

  res.sendFile(index);
});

app.post('/wiki-create', function (req, res) {
  const name = req.body.name;
  let pub = req.body.pub;
  const bg = req.body.bg;
  const color = req.body.color;

  if (name === null || name === undefined || name === "") {
    res.send("null");
  }

  else if (name.length > 100) {
    res.send("long");
  }

  else {
    if (pub === null || pub === undefined || pub === "") {
      pub = "public";
    }
  }
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});