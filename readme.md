# Source code URL
https://github.com/Coding-faizan/task_tracker_cli

# Adding a new task
node app.js add "Buy groceries"
# Output: Task added successfully (ID: 1)

# Updating and deleting tasks
node app.js update 1 "Buy groceries and cook dinner"
node app.js delete 1

# Marking a task as in progress or done
node app.js mark-in-progress 1
node app.js mark-done 1

# Listing all tasks
node app.js list

# Listing tasks by status
node app.js list done
node app.js list todo
node app.js list in-progress
