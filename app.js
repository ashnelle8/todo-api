const express = require('express');
const app = express();

app.use(express.json());
// app.get('/', (req, res) => {
//     res.send('Hello, API!');
// });

const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});