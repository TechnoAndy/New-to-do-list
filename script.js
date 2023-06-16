window.addEventListener('load', () => {
  const form = document.querySelector('#new-task-form');
  const input = document.querySelector('#new-task-input');
  const list_el = document.querySelector('#tasks');
  const localStorageKey = 'myTaskList'; // Key for local storage

  // Load the list from local storage on page load or initialize an empty array
  const taskList = JSON.parse(localStorage.getItem(localStorageKey)) || [];

  // Function to save the list to local storage
  const saveListToLocalStorage = () => {
    localStorage.setItem(localStorageKey, JSON.stringify(taskList));
  };

  // Function to render the list of tasks
  const renderTaskList = () => {
    list_el.innerHTML = ''; // Clear the existing list

    // Create task elements for each task in the list
    taskList.forEach((task) => {
      const task_el = document.createElement('div');
      task_el.classList.add('task');

      const task_content_el = document.createElement('div');
      task_content_el.classList.add('content');

      task_el.appendChild(task_content_el);

      const task_input_el = document.createElement('input');
      task_input_el.classList.add('text');
      task_input_el.type = 'text';
      task_input_el.value = task;
      task_input_el.setAttribute('readonly', 'readonly');

      task_content_el.appendChild(task_input_el);

      const task_actions_el = document.createElement('div');
      task_actions_el.classList.add('actions');

      const task_edit_el = document.createElement('button');
      task_edit_el.classList.add('edit');
      task_edit_el.innerHTML = 'Edit';

      const task_delete_el = document.createElement('button');
      task_delete_el.classList.add('delete');
      task_delete_el.innerHTML = 'Delete';

      task_actions_el.appendChild(task_edit_el);
      task_actions_el.appendChild(task_delete_el);

      task_el.appendChild(task_actions_el);

      list_el.appendChild(task_el);

      task_edit_el.addEventListener('click', () => {
        if (task_edit_el.innerHTML.toLowerCase() == 'edit') {
          task_input_el.removeAttribute('readonly');
          task_input_el.focus();
          task_edit_el.innerText = 'Save';
        } else {
          task_input_el.setAttribute('readonly', 'readonly');
          task_edit_el.innerText = 'Edit';
          // Update the task in the list when saving
          taskList.splice(taskList.indexOf(task), 1, task_input_el.value);
          saveListToLocalStorage();
        }
      });

      task_delete_el.addEventListener('click', () => {
        list_el.removeChild(task_el);
        // Remove the task from the list and update local storage
        taskList.splice(taskList.indexOf(task), 1);
        saveListToLocalStorage();
      });
    });
  };

  // Render the initial task list
  renderTaskList();

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const task = input.value;

    if (!task) {
      alert('Please fill out the task');
      return;
    }

    // Add the new task to the list
    taskList.push(task);
    saveListToLocalStorage();

    input.value = '';

    // Render the updated task list
    renderTaskList();
  });
});
