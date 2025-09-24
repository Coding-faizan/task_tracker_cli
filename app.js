const { argv } = require('node:process');

const { deleteTask, addTask, updateTaskTitle, getTasks, updateTaskStatus, printTask } = require('./actions');



async function mainFunction() {
  const command = argv[2];
  switch (command) {
    case 'add': {
      const taskTitle = argv[3];
      addTask(taskTitle);
      break;
    }

    case 'update': {
      const taskId = parseInt(argv[3]);
      const taskTitle = argv[4];
      updateTaskTitle(taskId, taskTitle);
      break;
    }

    case 'delete': {
      const taskId = parseInt(argv[3]);
      deleteTask(taskId);
      break;
    }

    case 'list': {
      const tasks = await getTasks();
      const tasksType = argv[3];
      const isValidTaskType = ['todo', 'done', 'in-progress'].find(
        (type) => type === tasksType
      );

      if (isValidTaskType) {
        let filteredTasks = tasks.filter((t) => t.status === tasksType);

        if (filteredTasks.length === 0) {
          console.log(`No Tasks Found of status: ${tasksType}`);
          break;
        }

        filteredTasks.forEach((t) => {
          printTask(t)
        });
        break;
      }

      tasks.forEach((t) => {
        printTask(t)
      });
      break;
    }

    case "mark-done": {
      let taskId = parseInt(argv[3]);
      let [mark, status] = command.split("mark-");
      await updateTaskStatus(taskId, status);
      break;
    }
    case "mark-in-progress": {
      let taskId = parseInt(argv[3]);
      let [mark, status] = command.split("mark-");
      await updateTaskStatus(taskId, status);
      break;
    }

    default:
      console.log('Command not found. Type "Help" for options');
  }
}

mainFunction();