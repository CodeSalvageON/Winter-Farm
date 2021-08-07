const Discord = require('discord.js');
const { Op } = require('sequelize');
const client = new Discord.Client();

const express = require('express');

const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const lz_string = require('lz-string');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

function keepAlive () {
  http.listen(3000, () => {
    console.log("READY");
  });
}

const fs = require('fs');

client.on('ready', () => {
  console.log('READY: ${client.user.tag}');
});

client.login(process.env.token);

app.get("/", function (req, res) {
  res.send("");
});

app.get("/get-creations", function (req, res) {
  const channel = client.channels.cache.get("872623208988303400");

  channel.messages.fetch({ limit: 100 }).then(messages => {
    console.log(`Received ${messages.size} creations`);

    let creations_array = [];

    messages.forEach(message => {
      const decompressed_string = lz_string.decompress(message.content);

      creations_array.unshift(message.content);
    });

    res.send(JSON.stringify(creations_array));
  });
});

app.get("/upload", function (req, res) {
  const file_path = __dirname + "/public/static/upload.html";

  res.sendFile(file_path);
});

app.get("/browse", function (req, res) {
  const file_path = __dirname + "/public/static/browse.html";

  res.sendFile(file_path);
});

app.post("/post-creation", function (req, res) {
  const data_uri = req.body.uri;
  console.log("Recieved data.");

  if (data_uri === "" || data_uri === null || data_uri === undefined) {
    res.send("Error: Cannot send a blank URI!");
  }

  else {
    if (data_uri.includes("data")) {
      client.channels.cache.get("872623208988303400").send(String(lz_string.compress(data_uri)));

      res.send("Uploaded Orb.");
    }

    else {
      res.send("Error: String is not data URI!");
    }
  }
});

keepAlive();