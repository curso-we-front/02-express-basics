const express = require("express");

const app = express();

const logger = require("./middlewares/logger");
app.use(logger);

app.use(express.json());

const articlesRouter = require("./routes/articles");
app.use("/", articlesRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

module.exports = app;
