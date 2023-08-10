const express = require("express");
const articles = express.Router();
const {
  getAllArticles,
  getArticle,
  getArticleByTitle,
} = require("../queries/articles");

// INDEX
articles.get("/", async (req, res) => {
  const allArticles = await getAllArticles();
  if (allArticles[0]) {
    res.status(200).json(allArticles);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

// SHOW
articles.get("/:title", async (req, res) => {
  const { title } = req.params;
  const article = await getArticleByTitle(title.toLowerCase());
  if (article.title) {
    res.json(article);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

module.exports = articles;
