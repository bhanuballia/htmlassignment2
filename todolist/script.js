document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const categorySelect = document.getElementById('category-select');
    const addBtn = document.getElementById('add-btn');
    const searchInput = document.getElementById('search-input');
    const taskList = document.getElementById('task-list');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Render tasks to the DOM
    function renderTasks(filter = 'All', searchTerm = '') {
        taskList.innerHTML = '';
        const filteredTasks = tasks.filter(task => {
            const matchesCategory = categorySelect.value === 'All' || task.category === categorySelect.value;
            const matchesFilter = (filter === 'All') ||
                                  (filter === 'Active' && !task.completed) ||
                                  (filter === 'Completed' && task.completed);
            const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesFilter && matchesSearch;
        });

        filteredTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.classList.add('task-item');
            if (task.completed) {
                li.classList.add('completed');
            }
            li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <span class="task-category">${task.category}</span>
                <div class="actions">
                    <button class="complete-btn">${task.completed ? '✅' : '✔️'}</button>
                    <button class="delete-btn">❌</button>
                </div>
            `;

            // Add event listeners for the new buttons
            li.querySelector('.complete-btn').addEventListener('click', () => toggleComplete(index));
            li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(index));

            taskList.appendChild(li);
        });
    }

    // Add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        const category = categorySelect.value;
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        tasks.push({ text: taskText, category: category, completed: false });
        taskInput.value = '';
        saveTasks();
        renderTasks(document.querySelector('.filter-btn.active').dataset.filter);
    }

    // Toggle a task's completed status
    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks(document.querySelector('.filter-btn.active').dataset.filter, searchInput.value);
    }

    // Delete a task
    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks(document.querySelector('.filter-btn.active').dataset.filter, searchInput.value);
    }

    // Add task on button click
    addBtn.addEventListener('click', addTask);

    // Add task on "Enter" key press
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Handle filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTasks(btn.dataset.filter, searchInput.value);
        });
    });

    // Handle search input
    searchInput.addEventListener('input', (e) => {
        renderTasks(document.querySelector('.filter-btn.active').dataset.filter, e.target.value);
    });

    // Handle category filter
    categorySelect.addEventListener('change', () => {
        renderTasks(document.querySelector('.filter-btn.active').dataset.filter, searchInput.value);
    });

    // Initial render
    renderTasks();
});
