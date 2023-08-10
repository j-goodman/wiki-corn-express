const db = require("../db/dbConfig.js");

const getAllArticles = async () => {
  const allArticles = await db.any("SELECT * FROM articles");
  return allArticles;
};

const getArticle = async (id) => {
  try {
    const oneArticle = await db.one("SELECT * FROM articles WHERE id=$1", id);
    return oneArticle;
  } catch (err) {
    return err;
  }
};

const getArticleByTitle = async (title) => {
  try {
    const oneArticle = await db.one("SELECT * FROM articles WHERE lower(title) LIKE $1", title);
    return oneArticle;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllArticles,
  getArticle,
  getArticleByTitle,
};
