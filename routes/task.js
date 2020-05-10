const express = require("express");

const taskController = require("../controllers/task");

const router = express.Router();

// GET /task/:taskId   get single task by id
router.get("/task/:taskId", taskController.getTask);

// GET /task/Tasks
router.get("/tasks", taskController.getTasks);

// POST /tasks/create
router.post("/create", taskController.createTask);

// EDIT /tasks/edit
// router.put("/task/edit", taskController.editTask);

// DELETE /tasks/create
router.delete("/task/delete/:taskId", taskController.deleteTask);

module.exports = router;
