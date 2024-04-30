// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<section>');
    taskCard.addClass('card task-card draggable my-3');
    taskCard.attr("data-task-id", task.id);

    const cardTitle = $('<h2>');
    cardTitle.addClass('task-card');
    cardTitle.text(task.title);

    const dueDate = $('<p>');
    dueDate.addClass('text');
    dueDate.text(task.dueDate);

    const cardContent = $('<p>');
    cardContent.addClass('text');
    cardContent.text(task.content);

    const taskBody = $("<div>");
    taskBody.addClass("card-body");

    const deleteBtn = $("<button>");
    deleteBtn.addClass("btn btn-danger delete");
    deleteBtn.attr("data-task-id",task.id);
    deleteBtn.text("Delete");

    if (task.dueDate && task.status !== "done") {
        const catchDate = dayjs();
        const taskDue = dayjs(task.dueDate, "DD/MM/YYYY");
        console.log('1')
        if (catchDate.isSame(taskDue, "day")) {
            taskCard.addClass("bg-warning text-white");
            console.log('2')
          } else if (catchDate.isAfter(taskDue)) {
            taskCard.addClass("bg-danger text-white");
            deleteBtn.addClass("border-light");
            console.log('3')
          }
        }
    
    taskBody.append(cardContent, dueDate, deleteBtn)
    taskCard.append(cardTitle, taskBody)
    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
