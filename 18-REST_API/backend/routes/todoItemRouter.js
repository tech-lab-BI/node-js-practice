//external module
const express = require("express");
const todoItemRouter = express.Router();
//local module
const todoItemController = require("../controllers/todoItemController");

todoItemRouter.get("/", todoItemController.getTodoItems);
todoItemRouter.post("/", todoItemController.createTodoItem);
todoItemRouter.delete("/:id", todoItemController.deleteTodoItem);
todoItemRouter.put("/:id/complete", todoItemController.markCompleted);

module.exports = todoItemRouter;
