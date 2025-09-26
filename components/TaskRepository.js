export class TaskRepository {
    constructor(storageKey = 'tasks') {
        this.storageKey = storageKey;
    }

    // Get all tasks from localStorage
    getAll() {
        try {
            const tasks = localStorage.getItem(this.storageKey);
            return tasks ? JSON.parse(tasks) : [];
        } catch (error) {
            console.error('Error loading tasks:', error);
            return [];
        }
    }

    // Save all tasks to localStorage
    saveAll(tasks) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(tasks));
            return true;
        } catch (error) {
            console.error('Error saving tasks:', error);
            return false;
        }
    }

    // Find a specific task by id
    findById(id) {
        const tasks = this.getAll();
        return tasks.find(task => task.id === id);
    }

    // Add a new task
    add(taskData) {
        const tasks = this.getAll();
        tasks.push(taskData);
        return this.saveAll(tasks);
    }

    // Update an existing task
    update(id, updatedData) {
        const tasks = this.getAll();
        const index = tasks.findIndex(task => task.id === id);
        
        if (index !== -1) {
            tasks[index] = { ...tasks[index], ...updatedData };
            return this.saveAll(tasks);
        }
        return false;
    }

    // Delete a task
    delete(id) {
        const tasks = this.getAll();
        const filteredTasks = tasks.filter(task => task.id !== id);
        return this.saveAll(filteredTasks);
    }

    // Clear all tasks
    clear() {
        localStorage.removeItem(this.storageKey);
        return true;
    }
}