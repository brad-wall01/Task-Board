// Retrieve tasks and nextId from localStorage
let titleEl = $("#taskT");
let dueEl = $("#taskDD");
let descEl = $("#taskC");
let button = $("#btn");
let toDo = $('#to-do');
let deleteBtn = $('.swim-lanes')


function saveTasksToStorage(TaskObects){
    localStorage.setItem("tasks",JSON.stringify(TaskObects));
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

function readTasksFromStorage() {
    let tasks = [];
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if(savedTasks){
    tasks=savedTasks;
    }
    return tasks;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const tasks = readTasksFromStorage();

    const todoList = $("#todo-cards");
    todoList.empty();
  
    const inProgressList = $("#in-progress-cards");
    inProgressList.empty();
  
    const doneList = $("#done-cards");
    doneList.empty();

    for (let task of tasks) {
        const tCard = createTaskCard(task);
        if(task.status==="to-do"){
          todoList.append(tCard)
        }else if(task.status==="in-progress"){
          inProgressList.append(tCard)
        } else {
          doneList.append(tCard)
        }
      }

      $(".draggable").draggable({
        opacity: 0.7,
        zIndex: 100,
        elper: function (e) {
            const original = $(e.target).hasClass("ui-draggable")
        ? $(e.target)
        : $(e.target).closest(".ui-draggable");
        return original.clone().css({
            width: original.outerWidth(),
          });
        },
      });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();

    const title = titleEl.val()
    const dueDate = dueEl.val()
    const content = descEl.val()

    const newCard = {
        id: crypto.randomUUID(),
        title: title,
        dueDate: dueDate,
        content: content,
        status: "to-do"
    }
    console.log(newCard)

    const tasks = readTasksFromStorage();
    tasks.push(newCard)

    saveTasksToStorage(tasks);
    renderTaskList()

    titleEl.val('');
    dueEl.val('');
    descEl.val('');
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const tasks = readTasksFromStorage();
    const taskId = ui.draggable[0].dataset.taskId;

    const changeStatus = event.target.id;

    for (let task of tasks) {
        if (task.id === taskId) {
          task.status = changeStatus;
        }
    }
    
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTaskList()

}


renderTaskList()
button.on("click", handleAddTask);
deleteBtn.on("click", ".delete", handleDeleteTask);

$("#taskDD").datepicker({
    changeMonth: true,
    changeYear: true,
  });

$(".lane").droppable({
    accept: ".draggable",
    drop: handleDrop,
  });


