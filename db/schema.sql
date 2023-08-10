DROP DATABASE IF EXISTS wiki_corn_db;
CREATE DATABASE wiki_corn_db;

\c wiki_corn_db

DROP TABLE IF EXISTS articles;

CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    body VARCHAR,
    date_created DATE
);