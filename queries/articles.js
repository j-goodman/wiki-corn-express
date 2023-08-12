const db = require("../db/dbConfig.js");

const getAllArticles = async () => {
  console.log("Running get all articles...")
  const allArticles = await db.any("SELECT * FROM articles ORDER BY title ASC");
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
      [article.title, `<p>${article.body}</p>`, todaysDate()]
    );
    return newArticle;
  } catch (err) {
    return err;
  }
};

const updateArticle = async (id, article) => {
  try {
    const updatedArticle = await db.one(
      "UPDATE articles SET title=$1, body=$2 WHERE title =$3 RETURNING *",
      [article.title, article.body, id]
    );
    return updatedArticle;
  } catch (err) {
    return err;
  }
};

const deleteArticle = async (id) => {
  try {
    const deletedArticle = await db.one(
      "DELETE FROM articles WHERE id = $1 RETURNING *",
      id
    );
    return deletedArticle;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllArticles,
  getArticle,
  updateArticle,
  deleteArticle,
  getArticleByTitle,
  newArticle
};
