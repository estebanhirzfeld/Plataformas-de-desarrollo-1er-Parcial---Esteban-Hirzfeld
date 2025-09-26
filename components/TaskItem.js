export class TaskItem {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.completed = false;
        this.element = this.createElement();
        this.bindEvents();
    }

    createElement() {
        // Create main li element
        const li = document.createElement('li');
        li.className = 'flex items-center justify-between p-4 rounded-lg bg-background-light dark:bg-background-dark';

        // Create left side div (checkbox and label)
        const leftDiv = document.createElement('div');
        leftDiv.className = 'flex items-center gap-3';

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.className = 'h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary';
        checkbox.id = this.id;
        checkbox.type = 'checkbox';
        checkbox.checked = this.completed;

        // Create label
        const label = document.createElement('label');
        label.className = 'text-gray-800 dark:text-gray-200';
        label.setAttribute('for', this.id);
        label.textContent = this.name;

        leftDiv.appendChild(checkbox);
        leftDiv.appendChild(label);

        // Create right side div (buttons)
        const rightDiv = document.createElement('div');
        rightDiv.className = 'flex items-center gap-2';

        // Create edit button
        const editButton = document.createElement('button');
        editButton.className = 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary focus:outline-none';
        const editIcon = document.createElement('span');
        editIcon.className = 'material-symbols-outlined text-base';
        editIcon.textContent = 'edit';
        editButton.appendChild(editIcon);

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.className = 'text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 focus:outline-none';
        const deleteIcon = document.createElement('span');
        deleteIcon.className = 'material-symbols-outlined text-base';
        deleteIcon.textContent = 'delete';
        deleteButton.appendChild(deleteIcon);

        rightDiv.appendChild(editButton);
        rightDiv.appendChild(deleteButton);

        // Assemble the complete element
        li.appendChild(leftDiv);
        li.appendChild(rightDiv);

        // Store references to important elements
        this.checkbox = checkbox;
        this.label = label;
        this.editButton = editButton;
        this.deleteButton = deleteButton;

        return li;
    }

    bindEvents() {
        // Bind checkbox change event
        this.checkbox.addEventListener('change', () => {
            this.setComplete(this.checkbox.checked);
        });

        // Bind edit button click event
        this.editButton.addEventListener('click', () => {
            this.edit();
        });

        // Bind delete button click event
        this.deleteButton.addEventListener('click', () => {
            this.delete();
        });
    }

    setComplete(completed = true) {
        this.completed = completed;
        this.checkbox.checked = completed;
        
        // Update visual state
        if (completed) {
            this.label.classList.add('line-through', 'text-gray-500');
            this.element.classList.add('opacity-75');
        } else {
            this.label.classList.remove('line-through', 'text-gray-500');
            this.element.classList.remove('opacity-75');
        }

        // Dispatch custom event
        this.element.dispatchEvent(new CustomEvent('taskCompleted', {
            detail: { id: this.id, name: this.name, completed: this.completed }
        }));
    }

    edit() {
        const newName = prompt('Edit task name:', this.name);
        if (newName && newName.trim() !== '') {
            this.name = newName.trim();
            this.label.textContent = this.name;

            // Dispatch custom event
            this.element.dispatchEvent(new CustomEvent('taskEdited', {
                detail: { id: this.id, name: this.name }
            }));
        }
    }

    delete() {
        if (confirm(`Are you sure you want to delete "${this.name}"?`)) {
            // Dispatch custom event before removing
            this.element.dispatchEvent(new CustomEvent('taskDeleted', {
                detail: { id: this.id, name: this.name }
            }));
            
            // Remove from DOM
            this.element.remove();
        }
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
