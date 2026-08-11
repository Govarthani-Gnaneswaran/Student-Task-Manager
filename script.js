let tasks = [];

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let dateInput = document.getElementById("dateInput");

    let taskName = taskInput.value.trim();
    let taskDate = dateInput.value;

    if (taskName === "") {
        alert("Please enter a task");
        return;
    }

    let task = {
        name: taskName,
        date: taskDate,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";
    dateInput.value = "";

    displayTasks();
}

function displayTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        let li = document.createElement("li");
        li.className = "task";

        let taskInfo = document.createElement("div");
        taskInfo.className = "task-info";

        let name = document.createElement("strong");
        name.textContent = task.name;

        if (task.completed) {
            name.className = "completed";
        }

        let date = document.createElement("span");
        date.textContent = task.date === "" ? "No due date" : "Due: " + task.date;

        taskInfo.appendChild(name);
        taskInfo.appendChild(date);

        let completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Complete";

        completeButton.onclick = function() {
            task.completed = !task.completed;
            displayTasks();
        };

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.onclick = function() {
            tasks.splice(index, 1);
            displayTasks();
        };

        li.appendChild(taskInfo);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });

    updateSummary();
}

function updateSummary() {
    let total = tasks.length;

    let completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    let pending = total - completed;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("pendingTasks").textContent = pending;
}
