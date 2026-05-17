const express = require("express");

const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

const router = express.Router();

// GET
router.get("/", getTodos);

// POST
router.post("/", addTodo);

// PUT
router.put("/:id", updateTodo);

// DELETE
router.delete("/:id", deleteTodo);

module.exports = router;