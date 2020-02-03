const express = require("express");

// const db = require("./data/dbConfig.js");

const accountsRouter = require("./accounts/accounts-router.js");

const server = express();

server.use(express.json());

server.use("/accounts", accountsRouter);

server.get("/", (req, res) => {
  res.send("<h3>Life is good</h3>");
});

module.exports = server;
