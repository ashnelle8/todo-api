const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
// const tasks = require('../data/tasks.json');

const tasksFilePath = path.join(__dirname, '../data/tasks.json');
let tasks = require(tasksFilePath);

const saveTasksToFile = () => {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
};

router.get('/', (req, res) => {
    res.json(tasks);
});

router.post('/', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        task: req.body.task,
        completed: false
    };

    tasks.push(newTask);
    saveTasksToFile();
    res.status(201).json(newTask);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({message: 'Task not found'});
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        task: req.body.task || tasks[taskIndex].task,
        completed: req.body.completed !== undefined ? req.body.completed : tasks[taskIndex].completed
    };

    saveTasksToFile();
    res.status(201).json(tasks[taskIndex]);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex (task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({message: 'Task not found'});
    }

    const deletedTask = tasks.splice(taskIndex, 1);
    saveTasksToFile();
    res.json(deletedTask[0]);
});

module.exports = router;