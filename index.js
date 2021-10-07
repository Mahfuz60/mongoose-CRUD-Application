const express = require("express");

//express app initialization
const app = express();
app.use(express.json());

//application routes


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
