const Discord = require('discord.js');
const { Op } = require('sequelize');
const client = new Discord.Client();

const express = require('express');

const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');

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

app.post("/");

keepAlive();