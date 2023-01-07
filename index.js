const fs = require('fs');
const express = require('express')

const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const io = require('socket.io')(http);
const sjcl = require('sjcl');
const escapeHtml = require('escape-html');
const sanitizer = require('sanitizer');

const xss = require("xss");
const options = {
  whiteList : {
    a : ["href", "title", "target"],
    p : ["class"],
    h1 : ["class"],
    h2 : ["class"],
    h3 : ["class"],
    h4 : ["class"],
    h5 : ["class"],
    img : ["src", "width", "height", "class"],
    br : ["class"],
    hr : ["class"],
    i : ["class"],
    b : ["class"],
    strong : ["class"],
    div : ["class"],
    section : ["class"]
  }
}

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const key = process.env.KEY;

// Special functions

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

function getPage (pageNum, wikiName, knifeLife) { // Copied from the get-wiki request below. Probably not the best solution, but works for now.
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
              return "existsh8^!";
            }

            else {
              console.log("Returned " + whatYouWant);

              if (knifeLife === true) {
                theOtherOG = whatYouWant;
              }
              return whatYouWant;
            }
          }

          else {
            // pass
          }
        }
      }

      else {
        return "invalidh8^!";
      }
    }
  });
}

async function getAllPages (wikiName, scopeArr) {
  fs.readFile(__dirname + "/db/wikis/store.txt", "utf8", (err, data) => {
    if (err) {
      console.err(err);
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

            let pageSplit = pageContent.split("0p1");

            if (scopeArr === true) {
              theUltimateArray = pageSplit;
              return pageSplit;
            }

            else if (scopeArr === false) {
              shambleTown = moreContent;
              return moreContent;
            }

            else if (scopeArr === "cocaine") {
              return moreContent[0] + "," + moreContent[1];
            }

            else {
              marshLands = splitFile;
              return splitFile; 
            }
          }

          else {
            // pass
          }
        }
      }

      else {
        theUltimateArray = "invalid";
        shambleTown = "invalid";
        marshLands = "invalid";
        return "invalidh8^!";
      }
    }
  });
}

function checkInvalidChar (value) {
  if (value.includes("h8^!") || value.includes("k89*") || value.includes("sh9{[") || value.includes("0p1") || value.includes("tkc)+") || value.includes("prot-page87$")) {
    return false;
  }

  else {
    return true;
  }
}

// GET Requests down below

app.get('', function (req, res) {
  const index = __dirname + '/public/static/index.html';

  res.sendFile(index);
});

app.post('/get-wiki', function (req, res) {
  const pageNum = req.body.pageNum;
  const wikiName = req.body.wikiName;

  if (wikiName === "" || wikiName === undefined || wikiName === null) {
    res.send("404");
    return false;
  }

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
        res.send("<h1>404</h1><h3>You're a long ways from Marshlands.</h3>");
      }
    }
  });
});

app.post('/wiki-create', function (req, res) {
  const name = escapeHtml(req.body.name);
  let pub = req.body.pub;
  const bg = req.body.bg;
  const color = req.body.color;
  
  let ip = "";
  let forwarded = req.headers['x-forwarded-for']
  
  if (req.headers['x-forwarded-for']) {
    ip = req.headers['x-forwarded-for'].split(",")[0];
  } 

  else if (req.connection && req.connection.remoteAddress) {
    ip = req.connection.remoteAddress;
  } 

  else {
    ip = req.ip;
  }

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

  else if (name.includes("0p1") || name.includes("sh9{[") || name.includes("k89*") || name.includes("h8^!") || name.includes("tkc)+") || name.includes("prot-page87$")) {
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
        let wikiInit = sjcl.encrypt(key, wikiPass + "sh9{[" + modPass + "sh9{[" + pub + "sh9{[" + bg + "sh9{[" + color + "sh9{[" + "<h1>Main page</h1><p class='title-marker'></p><hr/> You decide what goes on this page." + "0p1<h1>Second Page</h1><p class='title-marker'></p>"); // What we'll start the wiki off with
        
        fs.appendFile(__dirname + '/db/wikis/store.txt', name + "h8^!" + wikiInit + "k89*", function (err) {
          if (err) throw err;
          console.log('Created wiki with the name of ' + name + '.');
          res.send(wikiPass + "," + modPass + "," + bg + "," + color);
        });

        if (pub === "public") {
         fs.appendFile(__dirname + '/db/aohell.txt', "", function (err) {
           if (err) throw err;
         });
        }
      }
    });
  }
});

let theOtherOG = "";
let theUltimateArray = [];
let shambleTown = [];
let marshLands = [];

app.post("/edit-wiki", async function (req, res) { // Editing specific wiki pages
  const wikiEditName = req.body.name;
  const wikiProt = req.body.prot;
  const wikiPageNum = req.body.pageNum;
  const editPlace = String(xss(req.body.place, options));
  console.log("Editing wiki..." + editPlace);

  let ip = "";
  let forwarded = req.headers['x-forwarded-for'];
  
  await getAllPages(wikiEditName, true);
  await getAllPages(wikiEditName, "neither");
  
  if (req.headers['x-forwarded-for']) {
    ip = req.headers['x-forwarded-for'].split(",")[0];
  } 

  else if (req.connection && req.connection.remoteAddress) {
    ip = req.connection.remoteAddress;
  } 

  else {
    ip = req.ip;
  }

  if (editList.includes(ip + "equo")) {
    let modPassResult = shambleTown[1];
    let wikiPassResult = shambleTown[0];

    if (wikiProt === modPassResult || wikiProt === wikiPassResult) {
      // do nothing
    }

    else {
      res.send("long");
      return false;
    }
  }

  else {
    editList += String(ip) + "equo";
    console.log(String(ip) + " marked down.");
  }

  let wikiPageActual = parseInt(wikiPageNum);
  console.log("Wiki Page Actual: " + wikiPageNum);

  if (isNaN(wikiPageActual)|| wikiPageActual < 1) {
    wikiPageActual = 1;
    console.log("NaN or else");
  }

  if (wikiEditName === "" || wikiEditName === undefined || wikiEditName === null) {
    res.send("404");
    return false;
  }

  getPage(wikiPageActual, wikiEditName, true);
  let isValidPlace = checkInvalidChar(editPlace);

  if (isValidPlace) {
    let charDiffCheck = 0;
    
    function checkCharDiff (val1, val2) {
      let valOneGrog = val1.length;
      let valTwoGrog = val2.length;

      let finalGrogDiff = valOneGrog.length - valTwoGrog.length;

      if (finalGrogDiff < 0) {
        finalGrogDiff = finalGrogDiff * -1;
      }

      if (finalGrogDiff > 499) {
        charDiffCheck = 0;
      }

      else {
        charDiffCheck = 1;
      }
    }

    console.log("Edit string: " + editPlace);
    await getAllPages(wikiEditName, true);
    await getAllPages(wikiEditName, false);
    await getAllPages(wikiEditName, "neither");

    setTimeout(async function () {
      checkCharDiff(editPlace, theOtherOG);
      switch (charDiffCheck) {
        case 0:
          res.send("long");
          break;
        case 1:
          let wikiPageArr = theUltimateArray;
          wikiPageArr[wikiPageActual - 1] = editPlace;
          console.log(wikiPageActual - 1);
          let wikiFixedUp = wikiPageArr.join("0p1");
        
          let wikiAllArr = shambleTown;
          wikiAllArr[5] = wikiFixedUp;
          let wikiAbSet = wikiAllArr.join("sh9{[");
          let wikiAbFin = sjcl.encrypt(key, wikiAbSet);

          let wikiSessionAll = marshLands;

          if (wikiSessionAll === "invalidh8^!") {
            res.send("!exists");
          }

          else {
            for (i = 0; i < wikiSessionAll.length; i++) {
              if (wikiSessionAll[i].includes(wikiEditName + "")) {
                let licketySplit = wikiSessionAll[i].split("h8^!");
                let iWannaDecrypt = licketySplit[1];

                licketySplit[1] = wikiAbFin;
                let autoMech = licketySplit.join("h8^!");

                wikiSessionAll[i] = autoMech;
                let fixedWikiSession = wikiSessionAll.join("k89*");
                console.log(JSON.stringify(wikiFixedUp));

                fs.writeFile(__dirname + "/db/wikis/store.txt", fixedWikiSession, err => {
                  if (err) {
                    console.error(err);
                  }

                  else {
                    res.send("edited");
                  }
                });
              }

              else {
                // do nothing
              }
            }
          }
          break;
      }
    }, 500);
  }

  else {
    res.send("invalid");
  }
});

app.post("/flag-wiki", async function (req, res) { // Flagging for the deletion of wiki pages 
  const wikiEditName = req.body.name;
  const wikiProt = req.body.prot;
  const wikiPageNum = req.body.num;

  let ip = "";
  let forwarded = req.headers['x-forwarded-for']
  
  if (req.headers['x-forwarded-for']) {
    ip = req.headers['x-forwarded-for'].split(",")[0];
  } 

  else if (req.connection && req.connection.remoteAddress) {
    ip = req.connection.remoteAddress;
  } 

  else {
    ip = req.ip;
  }

  if (flagList.includes(ip + "equo")) {
    res.send("long");
    return false;
  }

  else {
    flagList += String(ip) + "equo";
    console.log(String(ip) + " marked down.");
  }

  let wikiPageActual = parseInt(wikiPageNum);

  if (isNaN(wikiPageActual) || wikiPageActual < 1) {
    wikiPageActual = 1;
  }

  if (wikiEditName === "" || wikiEditName === undefined || wikiEditName === null) {
    res.send("404");
    return false;
  }

  getPage(wikiPageActual, wikiEditName, true);
  let isValidPlace = checkInvalidChar("");

  if (isValidPlace) {
    let charDiffCheck = 0;
    
    function checkCharDiff (val1, val2) {
      let valOneGrog = val1.length;
      let valTwoGrog = val2.length;

      let finalGrogDiff = valOneGrog.length - valTwoGrog.length;

      if (finalGrogDiff < 0) {
        finalGrogDiff = finalGrogDiff * -1;
      }

      if (finalGrogDiff > 499) {
        charDiffCheck = 0;
      }

      else {
        charDiffCheck = 1;
      }
    }

    await getAllPages(wikiEditName, true);
    await getAllPages(wikiEditName, false);
    await getAllPages(wikiEditName, "neither");

    setTimeout(async function () {
      checkCharDiff("<p class='deletion-marker'>This page has been flagged for deletion.</p>" + theOtherOG, theOtherOG);
      switch (charDiffCheck) {
        case 0:
          res.send("long");
          break;
        case 1:
          let wikiPageArr = theUltimateArray;

          if (wikiPageArr[wikiPageActual - 1].includes("<p class='deletion-marker'>This page has been flagged for deletion.</p>")) {
            res.send("already");
            return false;
          }
          
          wikiPageArr[wikiPageActual - 1] = "<p class='deletion-marker'>This page has been flagged for deletion.</p>" + theOtherOG;
          let wikiFixedUp = wikiPageArr.join("0p1");
        
          let wikiAllArr = shambleTown;
          wikiAllArr[5] = wikiFixedUp;
          let wikiAbSet = wikiAllArr.join("sh9{[");
          let wikiAbFin = sjcl.encrypt(key, wikiAbSet);

          let wikiSessionAll = marshLands;

          if (wikiSessionAll === "invalidh8^!") {
            res.send("!exists");
          }

          else {
            for (i = 0; i < wikiSessionAll.length; i++) {
              if (wikiSessionAll[i].includes(wikiEditName + "")) {
                let licketySplit = wikiSessionAll[i].split("h8^!");
                let iWannaDecrypt = licketySplit[1];

                licketySplit[1] = wikiAbFin;
                let autoMech = licketySplit.join("h8^!");

                wikiSessionAll[i] = autoMech;
                let fixedWikiSession = wikiSessionAll.join("k89*");

                fs.writeFile(__dirname + "/db/wikis/store.txt", fixedWikiSession, err => {
                  if (err) {
                    console.error(err);
                  }

                  else {
                    res.send("edited");
                  }
                });
              }

              else {
                // do nothing
              }
            }
          }
          break;
      }
    }, 500);
  }

  else {
    res.send("invalid");
  }
});

app.post("/get-all-pages", async function (req, res) { // Get all the pages of a wiki
  let wikiName = req.body.name;

  if (wikiName === "" || wikiName === null || wikiName === undefined) {
    res.send("404");
    return false;
  }

  let wikiPageBreak = await getAllPages(wikiName, true);
  setTimeout(function () {
    res.send(JSON.stringify(theUltimateArray));
  }, 500);
});

app.post("/create-page", async function (req, res) { // Create a page within a wiki
  let optionalAuth = req.body.auth;
  let pageContent = req.body.cont;
  let wikiName = req.body.name;

  // Below this line is an IP function which gets the IP for security.
  
  let ip = "";
  let forwarded = req.headers['x-forwarded-for'];
  
  if (req.headers['x-forwarded-for']) {
    ip = req.headers['x-forwarded-for'].split(",")[0];
  } 

  else if (req.connection && req.connection.remoteAddress) {
    ip = req.connection.remoteAddress;
  } 

  else {
    ip = req.ip;
  }

  if (wikiName === "" || wikiName === undefined || wikiName === null) {
    res.send("404");
    return false;
  }

  // Above this line is the IP function for security...

  let theGetPass = await getAllPages(wikiName, false);
  await getAllPages(wikiName, true);
  await getAllPages(wikiName, "neither");

  setTimeout(function () {
    if (shambleTown === "invalid") {
      res.send("invalid");
    }

    else {
      let modPassResult = shambleTown[1];
      let wikiPassResult = shambleTown[0];

      if (optionalAuth === modPassResult || optionalAuth === wikiPassResult) {
        console.log("User with auth passed through.");
      }

      else {
        if (createList.includes(ip + "equo")) {
          res.send("long");
          return false;
        }

        else {
          createList += String(ip) + "equo";
          console.log(String(ip) + " marked down.");

          if (pageContent.length > 500) {
            res.send("long");
            return false;
          }
        }
      }

      let wikiPageArr = theUltimateArray;
      wikiPageArr.push(pageContent);
      let wikiFixedUp = wikiPageArr.join("0p1");
        
      let wikiAllArr = shambleTown;
      wikiAllArr[5] = wikiFixedUp;
      let wikiAbSet = wikiAllArr.join("sh9{[");
      let wikiAbFin = sjcl.encrypt(key, wikiAbSet);

      let wikiSessionAll = marshLands;

      if (wikiSessionAll === "invalidh8^!") { // Check if wiki doesn't exist
        res.send("invalid");
      }

      else {
        for (i = 0; i < wikiSessionAll.length; i++) {
          if (wikiSessionAll[i].includes(wikiName + "")) {
            let licketySplit = wikiSessionAll[i].split("h8^!");
            let iWannaDecrypt = licketySplit[1];

            licketySplit[1] = wikiAbFin;
            let autoMech = licketySplit.join("h8^!");

            wikiSessionAll[i] = autoMech;
            let fixedWikiSession = wikiSessionAll.join("k89*");

            fs.writeFile(__dirname + "/db/wikis/store.txt", fixedWikiSession, err => {
              if (err) {
                console.error(err);
              }

              else {
                res.send("edited");
              }
            });
          }

          else {
            // do nothing
          }
        }
      }
    }
  }, 500);
});

app.post("/change-admin", async function (req, res) { // Change Admin Password
  let optionalAuth = req.body.auth;
  let newAuth = req.body.new;
  let wikiName = req.body.name;

  // Below this line is an IP function which gets the IP for security.

  if (wikiName === "" || wikiName === undefined || wikiName === null || newAuth === "" || newAuth === undefined || newAuth === null) {
    res.send("404");
    return false;
  }

  // Above this line is the IP function for security...

  let theGetPass = await getAllPages(wikiName, false);
  await getAllPages(wikiName, true);
  await getAllPages(wikiName, "neither");

  setTimeout(function () {
    if (shambleTown === "invalid") {
      res.send("invalid");
    }

    else {
      let wikiPassResult = shambleTown[0];
      let modPassResult = shambleTown[1];

      if (optionalAuth === wikiPassResult) {
        console.log("User with auth passed through.");

        let wikiAllArr = shambleTown;
        wikiAllArr[0] = newAuth;
        let wikiAbSet = wikiAllArr.join("sh9{[");
        let wikiAbFin = sjcl.encrypt(key, wikiAbSet);

        let wikiSessionAll = marshLands;

        if (wikiSessionAll === "invalidh8^!") { // Check if wiki doesn't exist
          res.send("invalid");
        }

        else {
          for (i = 0; i < wikiSessionAll.length; i++) {
            if (wikiSessionAll[i].includes(wikiName + "")) {
              let licketySplit = wikiSessionAll[i].split("h8^!");
              let iWannaDecrypt = licketySplit[1];

              licketySplit[1] = wikiAbFin;
              let autoMech = licketySplit.join("h8^!");

              wikiSessionAll[i] = autoMech;
              let fixedWikiSession = wikiSessionAll.join("k89*");
  
              fs.writeFile(__dirname + "/db/wikis/store.txt", fixedWikiSession, err => {
                if (err) {
                  console.error(err);
                }

                else {
                  res.send("edited");
                }
              });
            }

            else {
              // do nothing
            }
          }
        }
      }

      else {
        res.send("wrong");
      }
    }
  }, 500);
});

app.post("/change-mod", async function (req, res) { // Change Mod Password
  let optionalAuth = req.body.auth;
  let newAuth = req.body.new;
  let wikiName = req.body.name;

  // Below this line is an IP function which gets the IP for security.

  if (wikiName === "" || wikiName === undefined || wikiName === null || newAuth === "" || newAuth === undefined || newAuth === null) {
    res.send("404");
    return false;
  }

  // Above this line is the IP function for security...

  let theGetPass = await getAllPages(wikiName, false);
  await getAllPages(wikiName, true);
  await getAllPages(wikiName, "neither");

  setTimeout(function () {
    if (shambleTown === "invalid") {
      res.send("invalid");
    }

    else {
      let wikiPassResult = shambleTown[0];
      let modPassResult = shambleTown[1];

      if (optionalAuth === wikiPassResult) {
        console.log("User with auth passed through.");

        let wikiAllArr = shambleTown;
        wikiAllArr[1] = newAuth;
        let wikiAbSet = wikiAllArr.join("sh9{[");
        let wikiAbFin = sjcl.encrypt(key, wikiAbSet);

        let wikiSessionAll = marshLands;

        if (wikiSessionAll === "invalidh8^!") { // Check if wiki doesn't exist
          res.send("invalid");
        }

        else {
          for (i = 0; i < wikiSessionAll.length; i++) {
            if (wikiSessionAll[i].includes(wikiName + "")) {
              let licketySplit = wikiSessionAll[i].split("h8^!");
              let iWannaDecrypt = licketySplit[1];

              licketySplit[1] = wikiAbFin;
              let autoMech = licketySplit.join("h8^!");

              wikiSessionAll[i] = autoMech;
              let fixedWikiSession = wikiSessionAll.join("k89*");
  
              fs.writeFile(__dirname + "/db/wikis/store.txt", fixedWikiSession, err => {
                if (err) {
                  console.error(err);
                }

                else {
                  res.send("edited");
                }
              });
            }

            else {
              // do nothing
            }
          }
        }
      }

      else {
        res.send("wrong");
      }
    }
  }, 500);
});

app.post("/change-bg", async function (req, res) { // Change Background URL
  let optionalAuth = req.body.auth;
  let newAuth = req.body.new;
  let wikiName = req.body.name;

  // Below this line is an IP function which gets the IP for security.

  if (wikiName === "" || wikiName === undefined || wikiName === null || newAuth === "" || newAuth === undefined || newAuth === null || newAuth.length > 500) {
    res.send("404");
    return false;
  }

  // Above this line is the IP function for security...

  let theGetPass = await getAllPages(wikiName, false);
  await getAllPages(wikiName, true);
  await getAllPages(wikiName, "neither");

  setTimeout(function () {
    if (shambleTown === "invalid") {
      res.send("invalid");
    }

    else {
      let wikiPassResult = shambleTown[0];
      let modPassResult = shambleTown[1];

      if (optionalAuth === wikiPassResult || optionalAuth === modPassResult) {
        console.log("User with auth passed through.");

        let wikiAllArr = shambleTown;
        wikiAllArr[3] = newAuth;
        let wikiAbSet = wikiAllArr.join("sh9{[");
        let wikiAbFin = sjcl.encrypt(key, wikiAbSet);

        let wikiSessionAll = marshLands;

        if (wikiSessionAll === "invalidh8^!") { // Check if wiki doesn't exist
          res.send("invalid");
        }

        else {
          for (i = 0; i < wikiSessionAll.length; i++) {
            if (wikiSessionAll[i].includes(wikiName + "")) {
              let licketySplit = wikiSessionAll[i].split("h8^!");
              let iWannaDecrypt = licketySplit[1];

              licketySplit[1] = wikiAbFin;
              let autoMech = licketySplit.join("h8^!");

              wikiSessionAll[i] = autoMech;
              let fixedWikiSession = wikiSessionAll.join("k89*");
  
              fs.writeFile(__dirname + "/db/wikis/store.txt", fixedWikiSession, err => {
                if (err) {
                  console.error(err);
                }

                else {
                  res.send("edited");
                }
              });
            }

            else {
              // do nothing
            }
          }
        }
      }

      else {
        res.send("wrong");
      }
    }
  }, 500);
});

app.post("/del-page", async function (req, res) { // Delete pages
  let optionalAuth = req.body.auth;
  let newAuth = req.body.num;
  let wikiName = req.body.name;

  // Below this line is an IP function which gets the IP for security.

  if (wikiName === "" || wikiName === undefined || wikiName === null || newAuth === "" || newAuth === undefined || newAuth === null) {
    res.send("404");
    console.log("This wiki doesn't exist!");
    return false;
  }

  if (isNaN(parseInt(newAuth)) || parseInt(newAuth) < 1) {
    newAuth = 1;
  }

  newAuth = parseInt(newAuth);
  console.log("New Auth: " + newAuth);

  // Above this line is the IP function for security...

  let theGetPass = await getAllPages(wikiName, false);
  await getAllPages(wikiName, true);
  await getAllPages(wikiName, "neither");

  setTimeout(function () {
    if (shambleTown === "invalid") {
      res.send("invalid");
      console.log("what...");
    }

    else {
      let wikiPassResult = shambleTown[0];
      let modPassResult = shambleTown[1];

      if (optionalAuth === wikiPassResult || optionalAuth === modPassResult) {
        console.log("User with auth passed through.");

        let wikiPageArr = theUltimateArray;

        if (wikiPageArr[newAuth - 1] === null || wikiPageArr[newAuth - 1] === "" || wikiPageArr[newAuth - 1] === undefined) {
          res.send("404");
          console.log("second 404");
          return false;
        }
        wikiPageArr.splice(newAuth - 1, 1);
        let wikiFixedUp = wikiPageArr.join("0p1");

        let wikiAllArr = shambleTown;
        wikiAllArr[5] = wikiFixedUp;
        let wikiAbSet = wikiAllArr.join("sh9{[");
        let wikiAbFin = sjcl.encrypt(key, wikiAbSet);

        let wikiSessionAll = marshLands;

        if (wikiSessionAll === "invalidh8^!") { // Check if wiki doesn't exist
          res.send("invalid");
        }

        else {
          for (i = 0; i < wikiSessionAll.length; i++) {
            if (wikiSessionAll[i].includes(wikiName + "")) {
              let licketySplit = wikiSessionAll[i].split("h8^!");
              let iWannaDecrypt = licketySplit[1];

              licketySplit[1] = wikiAbFin;
              let autoMech = licketySplit.join("h8^!");

              wikiSessionAll[i] = autoMech;
              let fixedWikiSession = wikiSessionAll.join("k89*");
  
              fs.writeFile(__dirname + "/db/wikis/store.txt", fixedWikiSession, err => {
                if (err) {
                  console.error(err);
                }

                else {
                  res.send("edited");
                }
              });
            }

            else {
              // do nothing
            }
          }
        }
      }

      else {
        res.send("wrong");
      }
    }
  }, 500);
});

app.post("/get-all-wikis", async function (req, res) {
  const wikiName = req.body.name;
  let theUltList = [];
  let campMaker = [];
  
  await getAllPages(wikiName, "neither");

  setTimeout(function () {
    if (marshLands === "invalid") {
      res.send("invalid");
    }

    else {
      campMaker = marshLands;

      for (i = 0; i < campMaker.length; i++) {
        let jakeFrost = campMaker[i].split("h8^!");
        console.log("ONE: " + campMaker[i]);
        let sidedLine = jakeFrost[1];
        console.log("TOM ANDERSON: " + sidedLine);

        if (sidedLine === "" || sidedLine === undefined || sidedLine === null) {
          // Do nothing
        }

        else {
          let massDep = sjcl.decrypt(key, sidedLine);

          let crackHaus = massDep.split("sh9{[");
          let mackTonight = crackHaus[2];

          if (mackTonight === "public") {
            theUltList.push(jakeFrost[0]);
          }

          else {
            // Do nothing
          }
        }
      }

      for (i = 0; i < theUltList.length; i++) {
        if (theUltList[i] === "" || theUltList[i] === undefined || theUltList[i] === null) {
          theUltList.splice(i, 1);
        }
      }

      res.send(JSON.stringify(theUltList));
    }
  }, 500);
});

app.post('/reset-edit-list', async function (req, res) {
  const wikiName = req.body.name;
  const wikiAuth = req.body.auth;

  await getAllPages(wikiName, true);
  await getAllPages(wikiName, "neither");

  let ip = "";
  let forwarded = req.headers['x-forwarded-for']
  
  if (req.headers['x-forwarded-for']) {
    ip = req.headers['x-forwarded-for'].split(",")[0];
  } 

  else if (req.connection && req.connection.remoteAddress) {
    ip = req.connection.remoteAddress;
  } 

  else {
    ip = req.ip;
  }

  if (wikiAuth === null) {
    res.send("invalid");
  }

  setTimeout(function () {
    if (shambleTown === "invalid") {
      res.send("invalid");
    }

    else {
      let modPassResult = shambleTown[1];
      let wikiPassResult = shambleTown[0];

      if (wikiAuth === modPassResult || wikiAuth === wikiPassResult) {
        if (editList.includes(String(ip) + "equo")) {
          console.log(editList);
          editList.replace(String(ip) + "equo", "");
          console.log("Replacing...");
        }

        res.send("done");
      }

      else {
        res.send("wrong")
      }
    }
  }, 100);
});

app.post("/wiki-get-bg", async function (req, res) {
  const wikiName = req.body.name;

  await getAllPages(wikiName, false);

  setTimeout(function () {
    let ikH = shambleTown;
    res.send(ikH[3]);
  }, 100);
});

// Security 

let securityList = "";
let editList = "";
let flagList = "";
let createList = "";
      
setInterval(function () {
  securityList = "";
}, 600000);

setInterval(function () {
  editList = "";
  flagList = "";
  createList = "";
}, 120000);

http.listen(port, function(){
  console.log('listening on *:' + port);
});