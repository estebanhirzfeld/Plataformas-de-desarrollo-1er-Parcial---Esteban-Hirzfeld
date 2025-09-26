// import USERS from './users.js';
import { TaskItem } from './components/TaskItem.js';


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



// Create a new task
const task = new TaskItem('task1', 'Grocery Shopping');

// Add to container
task.appendTo(document.getElementById('taskContainer'));

