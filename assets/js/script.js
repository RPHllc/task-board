// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  return nextId++; // Increment nextId and return the value
}

// Todo: create a function to create a task card

// Todo: create a function to render the task list and make cards draggable

// Todo: create a function to handle adding a new task

// Todo: create a function to handle deleting a task

// Todo: create a function to handle dropping a task into a new status lane

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
