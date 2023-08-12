const express = require("express");
const articles = express.Router();
const {
  getAllArticles,
  getArticle,
  deleteArticle,
  getArticleByTitle,
  updateArticle,
  newArticle,
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

const validateArticle = (req, res, next) => {
  const { title } = req.body;
  if (
    title[title.length - 1] !== "?"
  ) {
    next();
  } else {
    res.status(400).json({ error: "Article title may not end in a question mark." });
  }
};

// CREATE
articles.post("/", validateArticle, async (req, res) => {
  try {
    const article = await newArticle(req.body);
    res.json(article);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// UPDATE
articles.put("/:id", validateArticle, async (req, res) => {
  const { id } = req.params;
  const updatedArticle = await updateArticle(id, req.body);
  res.status(200).json(updatedArticle);
});

// DELETE
articles.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedArticle = await deleteArticle(id);
  if (deletedArticle.id) {
    res.status(200).json(deletedArticle);
  } else {
    res.status(404).json("Bookmark not found");
  }
});

module.exports = articles;
