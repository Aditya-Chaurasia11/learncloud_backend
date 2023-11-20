const Task = require("../models/task");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

router.post("/", async (req, res) => {
  try {
    const task = await new Task(req.body).save();
    res.send(task);
  } catch (error) {
    res.send(error);
  }
});

router.get("/", async (req, res) => {
    try {
      const tasks = await Task.find().sort({ position: 1 }); // Sort tasks by the 'position' field in ascending order
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching tasks' });
    }
  });
  

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.send(task);
  } catch (error) {
    res.send(error);
  }
});

router.put("/updatePositions", async (req, res) => {
    console.log("executed");
    const updatedTasks = req.body.filter((task) => task._id); // Filter out any non-task data
    console.log("executed");
    try {
      // Update positions for each valid task in the database
      await Promise.all(
        updatedTasks.map(async (task) => {
          try {
            // Convert string _id to ObjectId using mongoose.Types.ObjectId
            const taskId = mongoose.Types.ObjectId.isValid(task._id) ? mongoose.Types.ObjectId(task._id) : task._id;
            
            await Task.findByIdAndUpdate(taskId, { position: task.position });
          } catch (error) {
            console.error("Invalid task ID:", task._id);
            // Handle invalid ObjectId conversion or update errors if needed
          }
        })
      );
      res.status(200).json({ message: "Task positions updated successfully" });
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: "Error updating task positions" });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.send(task);
    } catch (error) {
      res.send(error);
    }
  });

module.exports = router;
