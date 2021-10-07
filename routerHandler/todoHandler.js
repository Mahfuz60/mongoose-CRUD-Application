const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../Schema/todoSchema");

//GET all the TODO
router.get("/", async (req, res) => {});
//GET A TODO by ID
router.get("/:id", async (req, res) => {});
//POST TODO
router.post("/", async (req, res) => {});
//POST multiple TODO
router.post("/multiple", async (req, res) => {});
//PUT  TODO(update data)
router.put("/:id", async (req, res) => {});

//DELETE TODO(delete data)
router.delete("/:id", async (req, res) => {});

//export router
module.exports = router;
