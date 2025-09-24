const fs = require('fs');

const fileName = 'tasks.json';

async function openFile() {
  try {
    if (fs.existsSync(fileName)) return;
    await fs.promises.writeFile(fileName);
  } catch (error) {
    console.error(`Error writing to file: ${error}`);
  }
}

async function getTasks() {
  try {
    const json = await fs.promises.readFile(fileName, 'utf-8');
    if (json.length == 0) return;
    let tasks = JSON.parse(json);
    return tasks;
  }
  catch (error) {
    console.error(`Error reading tasks: ${error}`);
  }
}

async function addTask(title) {
  try {
    await openFile();
    const tasks = await getTasks() ?? [];
    let taskId = 0;
    if (tasks.length == 0) {
      taskId = 1;
    }
    else {
      let lastTask = tasks[tasks.length - 1];
      taskId = lastTask.id + 1;
    }
    let task = {
      id: taskId,
      title,
      status: 'todo',
      createdAt: Date.now(),
      updatedAt: null
    }
    tasks.push(task);
    console.log(`Task added successfully (ID: ${task.id})`);
    await fs.promises.writeFile(fileName, JSON.stringify(tasks));
  } catch (error) {
    console.error(`Error writing to file: ${error}`);
  }
}



async function updateTaskTitle(taskId, updatedTitle) {
  const tasks = await getTasks() ?? [];
  let taskIndex = -1;
  let taskToUpdate;

  tasks.forEach((t, index) => {
    if (t.id == taskId) {
      taskIndex = index;
      taskToUpdate = t;
    }
  })

  if (taskIndex == -1) {
    console.error('Task not found');
    return;
  }

  taskToUpdate = { ...taskToUpdate, title: updatedTitle, updatedAt: Date.now() };

  tasks[taskIndex] = taskToUpdate;
  await fs.promises.writeFile(fileName, JSON.stringify(tasks));
}

async function deleteTask(taskId) {
  const tasks = await getTasks() ?? [];
  let indexToDelete = -1;
  tasks.forEach((t, index) => {
    if (t.id == taskId) {
      indexToDelete = index
    };
  });

  if (indexToDelete == -1) {
    console.log('Task Not Found');
    return;
  }
  tasks.splice(indexToDelete, 1);
  await fs.promises.writeFile(fileName, JSON.stringify(tasks));
}

async function updateTaskStatus(taskId, status) {
  const tasks = await getTasks() ?? [];
  let taskIndex = -1;
  let taskToUpdate;

  tasks.forEach((t, index) => {
    if (t.id == taskId) {
      taskIndex = index;
      taskToUpdate = t;
    }
  })

  taskToUpdate = { ...taskToUpdate, status, updatedAt: Date.now() };

  tasks[taskIndex] = taskToUpdate;
  await fs.promises.writeFile(fileName, JSON.stringify(tasks));
}

function printTask(task) {
  console.log(`Task ${t.id}: ${t.title} status: ${t.status}, created: ${new Date(t.createdAt).toLocaleString()} ${t.updatedAt ? `updated: ${new Date(t.updatedAt).toLocaleString()}` : ""}  `);
}

module.exports = {
  addTask,
  deleteTask,
  updateTaskTitle,
  getTasks,
  updateTaskStatus,
  printTask
}