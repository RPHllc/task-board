// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  const uniqueId = `task-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  localStorage.setItem("nextId", nextId + 1);
  nextId++;
  return uniqueId;
}
// Todo: create a function to create a task card
function createTaskCard(task) {
  const card = $("<div>", { class: "task", id: task.id });
  const dueDate = dayjs(task.dueDate);
  const today = dayjs().startOf("day");
  const dueDateFormatted = dueDate.isAfter(today)
    ? dueDate.format("YYYY-MM-DD")
    : dueDate.isBefore(today)
    ? "Past Due"
    : "Due Today";
  const cardBg = dueDate.isBefore(today)
    ? "red"
    : dueDate.isSame(today)
    ? "yellow"
    : "white";

  card.append(
    $("<h5>", { text: task.title }),
    $("<p>", { text: task.description }),
    $("<p>", { text: `Due Date: ${dueDateFormatted}` }),
    $("<button>", { text: "Delete", click: handleDeleteTask })
  );
  card.css({
    background: cardBg,
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "10px",
    marginBottom: "10px",
    width: "300px",
    display: "inline-block",
    textAlign: "left",
    position: "relative",
    zIndex: 1000,
  });
  card.draggable({
    appendTo: "body",
    revert: "invalid",
  });
  return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  $("#taskForm").submit(handleAddTask);
  $(".lane").droppable({ accept: ".task", drop: handleDrop });
  $("#taskDueDate").datepicker({ dateFormat: "yy-mm-dd" });
  renderTaskList(); // Render initial list on page load
});
