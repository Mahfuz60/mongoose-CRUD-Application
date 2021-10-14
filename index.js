const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const todoHandler = require("./routerHandler/todoHandler");
const userHandler = require("./routerHandler/userHandler");

//express app initialization
const app = express();
dotenv.config();
app.use(express.json());

//database connection with mongoose
mongoose
  .connect("mongodb://localhost/todo")
  .then(() => console.log("DB connection successfully done!"))
  .catch((err) => console.log(err));

//application routers
app.use("/todo", todoHandler);
app.use("/user", userHandler);

//default error handler
const errorHandler = (err, req, res, next) => {
  if (res.handlersSent) {
    return next(err);
  }else{
  res.status(500).json({ error: err });
  }
};
app.use(errorHandler);

app.listen(3000, (req, res) => {
  console.log("listening on port 3000");
});
