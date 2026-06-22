let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask() {

    let taskInput = document.getElementById("taskInput");
    let taskDate = document.getElementById("taskDate");

    if(taskInput.value.trim() === "") {
        alert("Enter a task");
        return;
    }

    let task = {
        id: Date.now(),
        text: taskInput.value,
        date: taskDate.value,
        completed:false
    };

    tasks.push(task);

    saveTasks();

    taskInput.value="";
    taskDate.value="";

    displayTasks();
}

function displayTasks() {

    let taskList = document.getElementById("taskList");

    taskList.innerHTML="";

    tasks.forEach(task => {

        let li = document.createElement("li");

        li.className = task.completed ?
            "task completed" :
            "task";

        li.innerHTML = `

        <div class="task-info">

            <div class="task-text">
                ${task.text}
            </div>

            <div class="task-date">
                ${task.date ?
                new Date(task.date).toLocaleString()
                : "No Date"}
            </div>

        </div>

        <div class="actions">

            <button class="complete"
            onclick="toggleTask(${task.id})">

            <i class="fas fa-check"></i>

            </button>

            <button class="edit"
            onclick="editTask(${task.id})">

            <i class="fas fa-edit"></i>

            </button>

            <button class="delete"
            onclick="deleteTask(${task.id})">

            <i class="fas fa-trash"></i>

            </button>

        </div>
        `;

        taskList.appendChild(li);

    });

    updateStats();
}

function toggleTask(id){

    tasks = tasks.map(task => {

        if(task.id === id){
            task.completed = !task.completed;
        }

        return task;
    });

    saveTasks();
    displayTasks();
}

function deleteTask(id){

    if(confirm("Delete this task?")){

        tasks = tasks.filter(task => task.id !== id);

        saveTasks();
        displayTasks();
    }
}

function editTask(id){

    let task = tasks.find(t => t.id === id);

    let newTask = prompt(
        "Edit Task",
        task.text
    );

    if(newTask !== null &&
        newTask.trim() !== ""){

        task.text = newTask;

        saveTasks();
        displayTasks();
    }
}

function updateStats(){

    let total = tasks.length;

    let completed =
        tasks.filter(
            task => task.completed
        ).length;

    let pending = total - completed;

    document.getElementById(
        "totalTasks"
    ).innerText = total;

    document.getElementById(
        "completedTasks"
    ).innerText = completed;

    document.getElementById(
        "pendingTasks"
    ).innerText = pending;
}

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}