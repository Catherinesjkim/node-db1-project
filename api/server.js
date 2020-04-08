const express = require("express"); // importing a CommonJS module
const AccountRouter = require("../accounts/account-router.js");
const mw = require('../custom/middleware.js');
const logger = mw.logger;
const helmet = require('helmet');// helps me secure my Express apps by setting various HTTP headers
const db = require("../data/dbConfig.js");
const server = express();

// global mw
server.use(helmet());
server.use(express.json());
server.use(logger);

server.get("/api", (req, res) => {
  const environment = process.env; 
  res.status(200).json({ api: "up", environment });
});

//? The router handler: it handles the endpoints that begins with below URLs - Connection
server.use("/api/accounts", AccountRouter);

// Write a GET / endpoint that returns an obj - router handler
server.get("/", addName, (req, res) => {
  const nameInsert = (req.name) ? `${req.name}` : '';
  console.log('req.name is:', req.name);

  // will be treated as HTML string - res.send
  res.send(`
    <h2>Catherine's First DB Project!</h2>
    <p>Welcome: ${nameInsert} to the Catherine's DB Project</p>
  `);
});

// Doing sth similar to what express.js does
function addName(req, res, next) {
  req.name = 'WEBPT11';
  next();
};

// Catch all 404 error message - good UX
server.use(function (req, res, next) {
  res
    .status(404)
    .json({ message: "Oops, didn't find what you are looking for" })
  next();
});

module.exports = server;
