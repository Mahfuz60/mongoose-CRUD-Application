const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routerHandler/todoHandler");

//express app initialization
const app = express();
app.use(express.json());

//database connection with mongoose
mongoose
  .connect("mongodb://localhost/todo")
  .then(() => console.log("DB connection successfully done!"))
  .catch((err) => console.log(err));

//application routers
app.use("/todo", todoHandler);

//default error handler
const errorHandler = (err, req, res, next) => {
  if (res.handlersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

app.listen(3000, (req, res) => {
  console.log("listening on port 3000");
});
