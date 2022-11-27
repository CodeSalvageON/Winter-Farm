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

app.post('/get-wiki', function (req, res) {
  const pageNum = req.body.pageNum;
  const wikiName = req.body.wikiName;

  fs.readFile(__dirname + "/db/wikis/store.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    else {
      if (data.includes(wikiName + "h8^!")) {
        let splitFile = data.split("k89*");

        for (i = 0; i < splitFile.length; i++) {
          if (splitFile[i].includes(wikiName + "h8^!")) {
            let wikiContent = splitFile[i].replace(wikiName + "h8^!", "");
            let decryptedStuff = sjcl.decrypt(key, wikiContent);
            let moreContent = decryptedStuff.split("sh9{[");
            console.log(moreContent);
            let pageContent = moreContent[5];

            let requestedNum = parseInt(pageNum);
            console.log(pageNum);

            if (requestedNum === NaN || requestedNum < 1) {
              requestedNum = 1;
            }

            let pageSplit= pageContent.split("0p1");
            console.log(pageSplit);
            console.log(requestedNum);
            let whatYouWant = pageSplit[requestedNum - 1];

            if (whatYouWant === null || whatYouWant === undefined || whatYouWant === "") {
              res.send("!exists");
            }

            else {
              res.send(whatYouWant);
            }
          }

          else {
            // pass
          }
        }
      }

      else {
        res.send("404");
      }
    }
  });
});

app.post('/wiki-create', function (req, res) {
  const name = escapeHtml(req.body.name);
  let pub = req.body.pub;
  const bg = req.body.bg;
  const color = req.body.color;
  const ip = req.ip;

  if (securityList.includes(ip + "equo")) {
    res.send("speed");
    return false;
  }

  else {
    securityList += String(ip) + "equo";
    console.log(String(ip) + " marked down.");
  }

  if (name === null || name === undefined || name === "") {
    res.send("null");
  }

  else if (name.includes("0p1") || name.includes("sh9{[") || name.includes("k89*") || name.includes("h8^!") || name.includes("tkc)+")) {
    res.send("invalid");
  }

  else if (name.length > 100 || bg.includes("data:image")) {
    res.send("long");
  }

  else {
    if (pub === null || pub === undefined || pub === "") {
      pub = "public";
    }

    fs.readFile(__dirname + '/db/wikis/store.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      
      if (data.includes(name + "h8^!")) {
        res.send("exists");
      }

      else {
        let wikiPass = makeId(7);
        let modPass = makeId(7);
        let wikiInit = sjcl.encrypt(key, wikiPass + "sh9{[" + modPass + "sh9{[" + pub + "sh9{[" + bg + "sh9{[" + color + "sh9{[" + "<h1>Main page</h1><p class='title-marker'></p><hr/> You decide what goes on this page." + "0p1"); // What we'll start the wiki off with
        
        fs.appendFile(__dirname + '/db/wikis/store.txt', name + "h8^!" + wikiInit + "k89*", function (err) {
          if (err) throw err;
          console.log('Created wiki with the name of ' + name + '.');
          res.send(wikiPass + "," + modPass);
        });

        if (pub === "public") {
         fs.appendFile(__direname + '/db/aohell.txt', "", function (err) {
           if (err) throw err;
         });
        }
      }
    });
  }
});

// Security 

let securityList = "";
      
setInterval(function () {
  securityList = "";
}, 600000);

http.listen(port, function(){
  console.log('listening on *:' + port);
});