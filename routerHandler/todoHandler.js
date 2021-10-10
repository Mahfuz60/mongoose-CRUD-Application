const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../Schema/todoSchema");

//create a Todo model
const Todo = new mongoose.model("Todo", todoSchema);

//GET all the TODO
router.get("/", (req, res) => {
  Todo.find({ status: "active" }) //method chain used
    .select({
      _id: 0,
      date: 0,
    })
    .limit(2) //maintain  for data limit used
    //exec main execution
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          error: "there was server site error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Success",
        });
      }
    });
});
//GET A TODO by ID
router.get("/:id", async (req, res) => {
  try {
    const data = await Todo.find({ _id: req.params.id });
    res.status(200).json({
      result: data,
      message: "Success",
    });
  } catch (err) {
    res.status(500).json({
      error: "there was server site error!",
    });
  }
});

//POST A TODO
router.post("/", (req, res) => {
  const newTodo = new Todo(req.body);
  newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "there was server site error!",
      });
    } else {
      res.status(200).json({
        message: "Todo was inserted successfully",
      });
    }
  });
  console.log(newTodo);
});
//POST multiple TODO
router.post("/multiple", (req, res) => {
   Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "there was server site error!",
      });
    } else {
      res.status(200).json({
        message: "Todo were inserted successfully!",
      });
    }
  });
});

//PUT  TODO(update data)
router.put("/:id", (req, res) => {
  const result = Todo.findByIdAndUpdate(
    //updateOne or findByIdAndUpdate same work her
    { _id: req.params.id },
    {
      $set: {
        status: "inactive",
        description:
          "MongoDB is NO SQL database server and Raw level javascript language ",
      },
    },
    {
      new: true,
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was server site error!",
        });
      } else {
        res.status(200).json({
          message: "Todo was updated successfully!",
        });
      }
    }
  );
  console.log(result);
});

//DELETE TODO(delete data)
router.delete("/:id", (req, res) => {
  Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "there was server site error!",
      });
    } else {
      res.status(200).json({
        message: "Todo was Deleted successfully done",
      });
    }
  });
});

//export router
module.exports = router;
