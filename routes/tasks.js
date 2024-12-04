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
    // res.send('Hello, API!');
    res.status(201).json(newTask);
});

module.exports = router;