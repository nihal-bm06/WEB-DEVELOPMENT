const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let tasks = [];

    function renderTasks(filter = 'all') {
      taskList.innerHTML = '';
      const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
      });

      filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
          <span class="task-text" onclick="toggleTask(${index})">${task.text}</span>
          <button class="delete-btn" onclick="deleteTask(${index})">&times;</button>
        `;
        taskList.appendChild(li);
      });
    }

    function addTask() {
      const text = taskInput.value.trim();
      if (text !== '') {
        tasks.push({ text, completed: false });
        taskInput.value = '';
        renderTasks(getCurrentFilter());
      }
    }

    function toggleTask(index) {
      tasks[index].completed = !tasks[index].completed;
      renderTasks(getCurrentFilter());
    }

    function deleteTask(index) {
      tasks.splice(index, 1);
      renderTasks(getCurrentFilter());
    }

    function getCurrentFilter() {
      return document.querySelector('.filter-btn.active').dataset.filter;
    }

    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') addTask();
    });

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        renderTasks(btn.dataset.filter);
      });
    });

    renderTasks();    