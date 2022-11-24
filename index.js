const fs = require('fs');
const express = require('express');

const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const io = require('socket.io')(http);
const sjcl = require('sjcl');
const escapeHtml = require('escape-html');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const key = process.env.KEY;

function makeId (length) { // Generate Wiki Passwords
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
  }
  return result;
}

app.get('', function (req, res) {
  const index = __dirname + '/public/static/index.html';

  res.sendFile(index);
});

app.post('/wiki-create', function (req, res) {
  const name = escapeHtml(req.body.name);
  let pub = req.body.pub;
  const bg = req.body.bg;
  const color = req.body.color;

  if (name === null || name === undefined || name === "") {
    res.send("null");
  }

  else if (name.includes("0p1") || name.includes("sh9}[") || name.includes("k89*")) {
    res.send("invalid");
  }

  else if (name.length > 100 || bg.includes("data:image")) {
    res.send("long");
  }

  else {
    if (pub === null || pub === undefined || pub === "") {
      pub = "public";
    }

    fs.readFile(__dirname + '/db/aohell.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      
      if (data.includes(name + "0p1")) {
        res.send("exists");
      }

      else {
        let wikiPass = makeId(7);
        let modPass = makeId(7);
        let wikiInit = sjcl.encrypt(key, name + "sh9}[" + wikiPass + "sh9}[" + modPass + "sh9}[" + pub + "sh9{[" + bg + "sh9{[" + color + "sh9{[" + "<h1>Main page</h1> <hr/> You decide what goes on this page." + "0p1"); // What we'll start the wiki off with
        
        fs.appendFile(__dirname + '/db/wikis/store.txt', wikiInit + "k89*", function (err) {
          if (err) throw err;
          console.log('Created wiki with the name of ' + name + '.');
          res.send(wikiPass + "," + modPass);
        });
      }
    });
  }
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});