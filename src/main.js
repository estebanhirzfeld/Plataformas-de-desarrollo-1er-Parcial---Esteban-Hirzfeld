import { TaskManager } from './components/TaskManager.js';

// import USERS from './users.js';


// // 1. Login 
// // 2. SiMulate fetching user data
// // 2.1 If login successful, fetch user data & if user allow save on local storage
// // 3. fetch user tasks


// // 2.2 If login fails, show error message




// const login = (username, password) => {
//     // Simulate a login process
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (username === 'user' && password === 'pass') {
//                 resolve('Login successful');
//             } else {
//                 reject('Invalid credentials');
//             }
//         }, 1000);
//     });
// }



// Usage Example:
const taskManager = new TaskManager();

// Load existing tasks on page load
const existingTasks = taskManager.loadTasks();
existingTasks.forEach(task => {
    task.appendTo(document.getElementById('taskContainer'));
});

// Handle adding new tasks
const addTaskForm = document.getElementById('addTask');
addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = addTaskForm.querySelector('input');
    const taskName = input.value.trim();
    if (taskName) {
        const newTask = taskManager.createTask(`task-${Date.now()}`, taskName);
        newTask.appendTo(document.getElementById('taskContainer'));
        input.value = '';
    }
});