export class TaskItem {
    constructor(id, name, repository) {
        this.id = id;
        this.name = name;
        this.completed = false;
        this.repository = repository;
        this.element = null;
        this.render();
        this.bindEvents();
    }

    // Component template
    template() {
        return `
            <li class="flex items-center justify-between p-4 rounded-lg bg-background-light dark:bg-background-dark ${this.completed ? 'opacity-75' : ''}">
                <div class="flex items-center gap-3">
                    <input 
                        type="checkbox" 
                        id="${this.id}"
                        class="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                        ${this.completed ? 'checked' : ''}
                    />
                    <label 
                        for="${this.id}"
                        class="text-gray-800 dark:text-gray-200 ${this.completed ? 'line-through text-gray-500' : ''}"
                    >
                        ${this.name}
                    </label>
                </div>
                <div class="flex items-center gap-2">
                    <button 
                        class="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary focus:outline-none"
                        data-action="edit"
                    >
                        <span class="material-symbols-outlined text-base">edit</span>
                    </button>
                    <button 
                        class="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 focus:outline-none"
                        data-action="delete"
                    >
                        <span class="material-symbols-outlined text-base">delete</span>
                    </button>
                </div>
            </li>
        `;
    }

    // Render the component
    render() {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this.template().trim();
        this.element = tempDiv.firstChild;
    }

    // Re-render the component
    rerender() {
        const parent = this.element.parentNode;
        const nextSibling = this.element.nextSibling;
        
        this.element.remove();
        this.render();
        
        if (nextSibling) {
            parent.insertBefore(this.element, nextSibling);
        } else {
            parent.appendChild(this.element);
        }
        
        this.bindEvents();
    }

    bindEvents() {
        // Bind checkbox change event
        const checkbox = this.element.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            this.setComplete(checkbox.checked);
        });

        // Bind edit button click event
        const editButton = this.element.querySelector('[data-action="edit"]');
        editButton.addEventListener('click', () => {
            this.edit();
        });

        // Bind delete button click event
        const deleteButton = this.element.querySelector('[data-action="delete"]');
        deleteButton.addEventListener('click', () => {
            this.delete();
        });
    }

    setComplete(completed = true) {
        this.completed = completed;

        // Persist the change
        this.repository.update(this.id, { completed: this.completed });

        // Re-render with new state
        this.rerender();

        // Dispatch event
        this.element.dispatchEvent(new CustomEvent('taskCompleted', {
            detail: { id: this.id, name: this.name, completed: this.completed }
        }));
    }

    edit() {
        const newName = prompt('Edit task name:', this.name);
        if (newName && newName.trim() !== '') {
            this.name = newName.trim();

            // Persist the change
            this.repository.update(this.id, { name: this.name });

            // Re-render with new state
            this.rerender();

            this.element.dispatchEvent(new CustomEvent('taskEdited', {
                detail: { id: this.id, name: this.name }
            }));
        }
    }

    delete() {
        if (confirm(`Are you sure you want to delete "${this.name}"?`)) {
            // Remove from storage first
            this.repository.delete(this.id);
            
            this.element.dispatchEvent(new CustomEvent('taskDeleted', {
                detail: { id: this.id, name: this.name }
            }));
            
            this.element.remove();
        }
    }

    // Static method to create from stored data
    static fromData(data, repository) {
        const task = new TaskItem(data.id, data.name, repository);
        if (data.completed) {
            task.completed = data.completed;
            task.rerender();
        }
        return task;
    }

    // Get serializable data
    toData() {
        return {
            id: this.id,
            name: this.name,
            completed: this.completed
        };
    }

    // Method to append to a container
    appendTo(container) {
        container.appendChild(this.element);
    }

    // Method to get current state
    getState() {
        return {
            id: this.id,
            name: this.name,
            completed: this.completed
        };
    }
}