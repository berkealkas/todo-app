const toDoInput = document.querySelector('.to-do-input')
const btnAdd = document.querySelector('.btn-add')
const toDoOutput = document.querySelector('.to-do-output')

const tasks = JSON.parse(localStorage.getItem("tasks")) || []

function addToDoItem(e) {
  e.preventDefault()

  const text = toDoInput.value

  if (text == "") {
    alert("Please Enter a Task")
  }

  else {
    toDoOutput.innerHTML +=
      `
              <div class="row border-bottom mt-5 p-2">
                  <div class="col-8">
                      <p class="to-do fs-3 text-start mb-0">${text}</p>
                  </div>
                  <div class="col-4">
                      <button class="btn-trash text-white border-0 ms-5 rounded-3 h-100 w-25"><i class="bi bi-trash-fill fs-3"></i></button>
                  </div>
              </div>
          `
  
  
    tasks.push({ text: toDoInput.value, completed: false })
    localStorage.setItem("tasks", JSON.stringify(tasks))
  
    toDoInput.value = ""
  }

  const deleteButtons = document.querySelectorAll('.btn-trash');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', deleteToDoItem);
  });
  completedItems()
}

function deleteToDoItem(e) {
  const rowElement = e.target.closest('.row');

  if (rowElement) {
    rowElement.remove();

    const taskText = rowElement.querySelector('.to-do').textContent;
    const taskIndex = tasks.findIndex(task => task.text === taskText);

    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  completedItems()
}

function loadItems() {
  completedItems()
  tasks.forEach((task) => {
    const text = task.text
    const completed = task.completed

    toDoOutput.innerHTML +=
      `
                <div class="row border-bottom mt-5 p-2">
                    <div class="col-8">
                        <p class="to-do fs-3 text-start mb-0 ${completed ? 'completed' : ''}">${text}</p>
                    </div>
                    <div class="col-4">
                        <button class="btn-trash text-white border-0 ms-5 rounded-3 h-100 w-25"><i class="bi bi-trash-fill fs-3"></i></button>
                    </div>
                </div>
            `
    const deleteButtons = document.querySelectorAll('.btn-trash');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', deleteToDoItem);
    });
  })
}

function updateTaskCompletionStatus(text, completed) {
  tasks.forEach(task => {
    if (task.text === text) {
      task.completed = completed;
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function completedItems() {
  const toDo = document.querySelectorAll('.to-do');

  toDo.forEach((completed) => {
    completed.addEventListener('click', () => {
      completed.classList.toggle('completed');

      tasks.forEach((task) => {
        if (task.text === completed.textContent) {
          task.completed = completed.classList.contains('completed');
        }
      });

      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  });
}

document.addEventListener("DOMContentLoaded", loadItems)
document.addEventListener("DOMContentLoaded", completedItems);
btnAdd.addEventListener("click", addToDoItem);