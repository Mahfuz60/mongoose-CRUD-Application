const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../Schema/todoSchema");

//create a Todo model
const Todo = new mongoose.model("Todo", todoSchema);

//GET all the TODO
router.get("/", async (req, res) => {
  Todo.find({ status: "active" }) //method chain used
    .select({
      _id: 0,
      date: 0,
    })
    .limit(2)  //maintain  for data limit used
    .exec((err, data) => {
      //exec main execution
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
  Todo.find({_id:req.params.id},(err,data)=>{
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

  })
});
//POST A TODO
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save((err) => {
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
});
//POST multiple TODO
router.post("/multiple", async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
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
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
  Todo.deleteOne({_id:req.params.id},(err)=>{
    if (err) {
      res.status(500).json({
        error: "there was server site error!",
      });
    } else {
      res.status(200).json({
        
        message: "Todo was Deleted successfully done",
      });
    }

  })

});

//export router
module.exports = router;
