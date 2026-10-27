
"use strict";

// Stack implementation using a JavaScript array.
const stack = [];

// Select HTML elements.
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const stackDisplay = document.getElementById("stackDisplay");
const stackSize = document.getElementById("stackSize");
const topTask = document.getElementById("topTask");
const stackStatus = document.getElementById("stackStatus");
const message = document.getElementById("message");

const popBtn = document.getElementById("popBtn");
const peekBtn = document.getElementById("peekBtn");
const clearBtn = document.getElementById("clearBtn");

// Display feedback to the user.
function showMessage(text, type = "") {
  message.textContent = text;
  message.className = "message";

  if (type) {
    message.classList.add(type);
  }
}

// PUSH: Add a task to the top of the stack.
function pushTask(taskName) {
  const task = taskName.trim();

  if (!task) {
    showMessage("Please enter a task.", "error");
    return;
  }

  stack.push({
    id: Date.now() + Math.random(),
    name: task
  });

  renderStack();
  showMessage(`Pushed "${task}" onto the stack.`, "success");
}

// POP: Remove and return the top task.
function popTask() {
  if (stack.length === 0) {
    showMessage("Stack underflow: there are no tasks to remove.", "error");
    return;
  }

  const removedTask = stack.pop();

  renderStack();
  showMessage(`Popped "${removedTask.name}" from the stack.`, "success");
}

// PEEK: Read the top task without removing it.
function peekTask() {
  if (stack.length === 0) {
    showMessage("The stack is empty. Nothing to peek at.", "error");
    return;
  }

  const task = stack[stack.length - 1];

  showMessage(`Top task: "${task.name}". It remains in the stack.`, "success");
}

// DISPLAY: Render tasks from top to bottom.
function renderStack() {
  stackSize.textContent = stack.length;

  if (stack.length === 0) {
    topTask.textContent = "Empty";
    stackStatus.textContent = "Empty";

    stackDisplay.replaceChildren();

    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";

    const icon = document.createElement("span");
    icon.className = "empty-icon";
    icon.textContent = "↓";

    const title = document.createElement("p");
    title.textContent = "Your stack is empty.";

    const description = document.createElement("small");
    description.textContent = "Add a task to see it here.";

    emptyState.append(icon, title, description);
    stackDisplay.appendChild(emptyState);

    return;
  }

  topTask.textContent = stack[stack.length - 1].name;
  stackStatus.textContent = `${stack.length} task${stack.length === 1 ? "" : "s"}`;

  stackDisplay.replaceChildren();

  // Reverse the array so the newest task is displayed first.
  for (let i = stack.length - 1; i >= 0; i--) {
    const task = stack[i];
    const isTop = i === stack.length - 1;

    const item = document.createElement("div");
    item.className = isTop ? "stack-item top" : "stack-item";

    const number = document.createElement("span");
    number.className = "stack-number";
    number.textContent = i + 1;

    const content = document.createElement("div");
    content.className = "stack-content";

    const name = document.createElement("strong");
    name.textContent = task.name;

    const position = document.createElement("small");
    position.textContent = `Stack position: ${i + 1}`;

    content.append(name, position);
    item.append(number, content);

    if (isTop) {
      const label = document.createElement("span");
      label.className = "top-label";
      label.textContent = "TOP";

      item.appendChild(label);
    }

    stackDisplay.appendChild(item);
  }
}

// CLEAR: Remove all tasks.
function clearStack() {
  if (stack.length === 0) {
    showMessage("The stack is already empty.", "error");
    return;
  }

  stack.length = 0;
  renderStack();
  showMessage("All tasks have been removed.", "success");
}

// Handle task form submission.
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  pushTask(taskInput.value);
  taskInput.value = "";
  taskInput.focus();
});

// Connect buttons to stack operations.
popBtn.addEventListener("click", popTask);
peekBtn.addEventListener("click", peekTask);
clearBtn.addEventListener("click", clearStack);

// Initial display.
renderStack();
