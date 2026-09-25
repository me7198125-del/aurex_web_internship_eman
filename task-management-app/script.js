// ===============================
// Task Management Application
// ===============================

// Get HTML elements
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const errorMessage = document.getElementById("errorMessage");
const emptyMessage = document.getElementById("emptyMessage");

const totalTasks = document.getElementById("totalTasks");
const activeTasks = document.getElementById("activeTasks");
const completedTasks = document.getElementById("completedTasks");

const filterButtons = document.querySelectorAll(".filter-btn");


// ===============================
// Task Data
// ===============================

// Get tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Current filter
let currentFilter = "all";


// ===============================
// Save Tasks
// ===============================

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}


// ===============================
// Add Task
// ===============================

taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const taskText = taskInput.value.trim();

    // Validation
    if (taskText === "") {

        errorMessage.textContent = "Please enter a task.";

        return;
    }

    // Remove error
    errorMessage.textContent = "";

    // Create task object
    const newTask = {

        id: Date.now(),

        text: taskText,

        completed: false

    };

    // Add task to array
    tasks.push(newTask);

    // Save to localStorage
    saveTasks();

    // Clear input
    taskInput.value = "";

    // Display tasks
    renderTasks();

});


// ===============================
// Render Tasks
// ===============================

function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    // Apply filter
    if (currentFilter === "active") {

        filteredTasks = tasks.filter(function(task) {
            return !task.completed;
        });

    }

    if (currentFilter === "completed") {

        filteredTasks = tasks.filter(function(task) {
            return task.completed;
        });

    }

    // Empty message
    if (filteredTasks.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }

    // Create task elements
    filteredTasks.forEach(function(task) {

        const li = document.createElement("li");

        li.className = "task-item";

        if (task.completed) {

            li.classList.add("completed");

        }

        // Checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {

            toggleTask(task.id);

        });


        // Task text
        const span = document.createElement("span");

        span.className = "task-text";

        span.textContent = task.text;


        // Actions container
        const actions = document.createElement("div");

        actions.className = "task-actions";


        // Edit button
        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.className = "edit-btn";

        editButton.addEventListener("click", function() {

            editTask(task.id);

        });


        // Delete button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {

            deleteTask(task.id);

        });


        // Add buttons
        actions.appendChild(editButton);

        actions.appendChild(deleteButton);


        // Add everything to li
        li.appendChild(checkbox);

        li.appendChild(span);

        li.appendChild(actions);


        // Add li to list
        taskList.appendChild(li);

    });


    updateStats();

}


// ===============================
// Edit Task
// ===============================

function editTask(id) {

    const task = tasks.find(function(task) {

        return task.id === id;

    });

    if (!task) {

        return;

    }

    const newText = prompt("Edit your task:", task.text);

    if (newText === null) {

        return;

    }

    const updatedText = newText.trim();

    // Validation
    if (updatedText === "") {

        alert("Task cannot be empty.");

        return;

    }

    // Update task
    task.text = updatedText;

    // Save
    saveTasks();

    // Render
    renderTasks();

}


// ===============================
// Delete Task
// ===============================

function deleteTask(id) {

    const confirmDelete = confirm("Are you sure you want to delete this task?");

    if (!confirmDelete) {

        return;

    }

    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });

    saveTasks();

    renderTasks();

}


// ===============================
// Complete / Uncomplete Task
// ===============================

function toggleTask(id) {

    const task = tasks.find(function(task) {

        return task.id === id;

    });

    if (!task) {

        return;

    }

    task.completed = !task.completed;

    saveTasks();

    renderTasks();

}


// ===============================
// Filtering
// ===============================

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Remove active class
        filterButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });

        // Add active class
        button.classList.add("active");

        // Get filter
        currentFilter = button.dataset.filter;

        // Render
        renderTasks();

    });

});


// ===============================
// Statistics
// ===============================

function updateStats() {

    const total = tasks.length;

    const completed = tasks.filter(function(task) {

        return task.completed;

    }).length;

    const active = total - completed;


    totalTasks.textContent = total;

    activeTasks.textContent = active;

    completedTasks.textContent = completed;

}


// ===============================
// Load Tasks When Page Opens
// ===============================

renderTasks();