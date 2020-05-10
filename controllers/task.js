const Task = require("../models/task");

export const getTasks = (req, res, next) => {
  Task.find()
    .then((tasks) =>
      res.status(200).json({
        tasks,
      })
    )
    .catch((err) => console.log({ err }));
};

export const createTask = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const priority = req.body.priority;
  const imageUrl = req.body.imageUrl;
  const taskId = req.body._id;

  if (req.body._id) {
    editTask({ taskId, title, description, res, priority, imageUrl });
    return;
  }
  addTaskToDb({ title, description, res, priority, imageUrl });
};

export const getTask = (req, res, next) => {
  const taskId = req.params.taskId;
  Task.findById(taskId)
    .then((task) => {
      if (!task) {
        res.status(500).json({
          message: "Task not found!",
        });
      }
      res.status(200).json({
        message: "Task fetch successfully!",
        task,
      });
    })
    .catch((err) => console.log("Errorrrrrr", err));
};

export const deleteTask = (req, res, next) => {
  const taskId = req.params.taskId;
  Task.findByIdAndRemove(taskId)
    .then((task) => {
      if (!task) {
        res.status(500).json({
          message: "Task not found!",
        });
      }
      res.status(200).json({
        message: "Task delete successfully!",
        status: true,
      });
    })
    .catch((err) => console.log("Errorrrrrr", err));
};

export const addTaskToDb = ({
  title,
  description,
  res,
  priority,
  imageUrl,
}) => {
  const task = new Task({
    title,
    description,
    priority,
    imageUrl,
    creator: {
      name: "Nikol Arazi",
    },
    owner: null,
    parent: null,
    children: [],
  });
  task
    .save()
    .then((result) => {
      res.status(201).json({
        message: "task created successfully!",
        task: result,
      });
    })
    .catch((err) => console.log({ err }));
};

export const editTask = ({ taskId, title, description, res, imageUrl }) => {
  Task.findById(taskId)
    .then((task) => {
      if (!task) {
        res.status(500).json({
          message: "Task not found!",
        });
      }
      task.title = title;
      task.description = description;
      task.imageUrl = imageUrl;
      return task.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Task fetch successfully!",
        task: result,
      });
    })
    .catch((err) => console.log("Errorrrrrr", err));
};
