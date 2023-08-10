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

const todaysDate = () => {
  let months = {
    Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
    Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
  }
  let splitDate = Date().split(" ")
  return splitDate[3] + "-" + months[splitDate[1]] + "-" + splitDate[2]
}

const newArticle = async (article) => {
  try {
    const newArticle = await db.one(
      "INSERT INTO articles (title, body, date_created) VALUES($1, $2, $3) RETURNING *",
      [article.title, article.body, todaysDate()]
    );
    return newArticle;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllArticles,
  getArticle,
  getArticleByTitle,
  newArticle
};
