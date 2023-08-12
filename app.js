// DEPENDENCIES
const cors = require("cors");
const express = require("express");
require('dotenv').config();

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to <a href='/articles'>Wiki Corn</a>");
});

const articlesController = require("./controllers/articlesController.js");
app.use("/articles", articlesController);

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page not found.");
});

// EXPORT
module.exports = app;