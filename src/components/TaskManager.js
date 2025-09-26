import { TaskItem } from './TaskItem.js';
import { TaskRepository } from './TaskRepository.js';

export class TaskManager {
    constructor() {
        this.repository = new TaskRepository();
        this.tasks = new Map(); // Keep track of TaskItem instances
    }

    // Load all tasks from storage and create TaskItem instances
    loadTasks() {
        const storedTasks = this.repository.getAll();
        storedTasks.forEach(taskData => {
            const taskItem = TaskItem.fromData(taskData, this.repository);
            this.tasks.set(taskData.id, taskItem);
        });
        return Array.from(this.tasks.values());
    }

    // Create a new task
    createTask(id, name) {
        const taskItem = new TaskItem(id, name, this.repository);
        
        // Save to storage
        this.repository.add(taskItem.toData());
        
        // Keep track of the instance
        this.tasks.set(id, taskItem);
        
        return taskItem;
    }

    // Get a task instance
    getTask(id) {
        return this.tasks.get(id);
    }

    // Remove task from manager
    removeTask(id) {
        this.tasks.delete(id);
    }

    // Get all task instances
    getAllTasks() {
        return Array.from(this.tasks.values());
    }
}
