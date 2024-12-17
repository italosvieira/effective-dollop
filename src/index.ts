import express from 'express';


interface Task {
  id: number;
  title: string;
  completed: string;
}

const app = express();

app.use(express.json())

let tasks = [];

app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
});

app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

app.post('/tasks', (req, res) => {
  const task: Task = req.body;

  if (!task.id || !task.title || (task.completed === null || task.completed === undefined)) {
    return res.sendStatus(400);
  }

  if (tasks.some(task2 => task2.id === task.id)) {
    return res.sendStatus(400);
  }

  task.id = Number(task.id);

  tasks.push(req.body);
});

app.put('/tasks/:id', (req, res) => {
  const taskBody: Task = req.body;

  if (!taskBody.id || !taskBody.title || (taskBody.completed === null || taskBody.completed === undefined)) {
    return res.sendStatus(400);
  }

  const task: Task = tasks.find(task => task.id === Number(req.params.id));

  if (!task) {
    return res.sendStatus(404);
  }

  task.title = req.body.title;
  task.completed = req.body.completed;

  res.sendStatus(200);
});

app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(task => task.id !== Number(req.params.id));
  res.send(200);
});

const port = parseInt(process.env.PORT || '3000');

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
