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
  client.channels.cache.get("872623208988303400").send(String("test"));
});

client.login(process.env.token);

app.get("/", function (req, res) {
  res.send("");
});

app.post("/post-creation", function (req, res) {
  const data_uri = req.body.uri;

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