// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || [];

// Todo: create a function to generate a unique task id
function generateTaskId() {
  const uniqueId = `task-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  localStorage.setItem(
    "nextId",
    JSON.stringify(parseInt(localStorage.getItem("nextId") || "1") + 1)
  );
  return uniqueId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const card = $("<div>", { class: "task", id: task.id });
  const cardContent = $("<div>", { class: "card-content" });
  const titleSection = $("<div>", { class: "title-content" });

  const dueDate = dayjs(task.dueDate);
  const today = dayjs().startOf("day");
  const dueDateFormatted = dueDate.isAfter(today)
    ? dueDate.format("MMM DD, YYYY")
    : dueDate.isBefore(today)
    ? "Past Due"
    : "Due Today";

  const cardBg = dueDate.isBefore(today)
    ? "red"
    : dueDate.isSame(today)
    ? "yellow"
    : "white";

  titleSection.append($("<h5>", { text: task.title }));

  cardContent.append(
    titleSection,
    $("<p>", { text: task.description }),
    $("<p>", { text: `${dueDateFormatted}` }),
    $("<button>", { text: "Delete", click: handleDeleteTask })
  );

  card.append(cardContent);

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
function renderTaskList() {
  $("#todo-cards, #in-progress-cards, #done-cards").empty(); // Clear existing tasks
  taskList.forEach((task) => {
    const taskCard = createTaskCard(task);
    const laneId = task.status || "to-do"; // Use "to-do" as default status if not set
    $(`.lane#${laneId} .card-body`).append(taskCard); // Append card to the appropriate lane
  });
  $(".card-body").each(function () {
    $(this).css("text-align", "center"); // Center the cards within each section
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault(); // Prevent form submission
  const title = $("#taskTitle").val();
  const description = $("#taskDescription").val();
  const dueDate = $("#taskDueDate").val();
  const newTask = {
    id: generateTaskId(),
    title: title,
    description: description,
    dueDate: dueDate,
  };
  taskList.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(taskList)); // Save to localStorage
  renderTaskList(); // Update the displayed list
  // Clear form fields after adding the task
  $("#taskTitle").val("");
  $("#taskDescription").val("");
  $("#taskDueDate").val("");
  // Close any modal dialog used for adding tasks
  $("#formModal").modal("hide");
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  const taskId = $(this).closest(".task").attr("id");
  taskList = taskList.filter((task) => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();
  $(this).closest(".task").remove(); // Remove the card from the UI
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const taskId = ui.draggable.attr("id");
  const newLane = $(this).attr("id");
  const originalCard = ui.draggable;

  // Updating status in taskList
  taskList = taskList.map((task) =>
    task.id === taskId ? { ...task, status: newLane } : task
  );
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList(); // Refresh the list to reflect status changes

  // Removing the original card from the previous lane
  originalCard.remove();

  // Removing the card from the UI if dropped in the "done" lane after a 1 second
  if (newLane === "done") {
    setTimeout(() => {
      $(`#${taskId}`).remove();
    }, 1000);
  }
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  $("#taskForm").submit(handleAddTask);
  $(".lane").droppable({ accept: ".task", drop: handleDrop });
  $("#taskDueDate").datepicker({ dateFormat: "yy-mm-dd" });
  renderTaskList(); // Render initial list on page load
});
