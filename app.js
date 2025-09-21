const { argv } = require('node:process');

const { deleteTask, addTask, updateTaskTitle } = require('./actions');




// print process.argv
argv.forEach((val, index) => {
  if (val === 'add') {
    const taskTitle = argv[index + 1];
    addTask(taskTitle);
  }
  else if (val == 'update') {
    const taskId = parseInt(argv[index + 1]);
    const taskTitle = argv[index + 2];
    updateTaskTitle(taskId, taskTitle);
  }
  else if (val == 'delete') {
    const taskId = parseInt(argv[index + 1]);
    deleteTask(taskId);
  }
});

