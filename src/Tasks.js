
export default class Tasks {
  
    constructor() {
        this.loadTasks(); 
            //Клик по кнопке Enter
            const textarea = document.getElementById('task');
            const button = document.getElementById('plus');
    
            textarea.addEventListener('keypress', function (event) {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        button.click();
                    }
                });
    }

    bindEvents() {
        document.getElementById('plus').addEventListener('click', (event) => {
            event.preventDefault(); 
            const taskInput = document.getElementById('task');
            const task = taskInput.value.trim();

            

            if (task) {
                this.addTask(task);
                this.saveTask(task); 
                taskInput.value = ''; 
            }
        });
    }

    addTask(task) {
        const taskList = document.getElementById('plusTask');

      
    
        const listItem = document.createElement('li');
        listItem.textContent = task;
    
        const deleteButton = document.createElement('button');
        deleteButton.className = 'button btn';
        deleteButton.textContent = 'Нажать после выполнения';
    
        let isCompleted = false;

      
    
        deleteButton.onclick = (event) => {
            event.preventDefault(); 
    
            if (!isCompleted) {
                deleteButton.textContent = 'Удалить';
                isCompleted = true;
            } else {
                this.removeTask(task);
                taskList.removeChild(listItem);
            }
        };
    
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    }
 

    saveTask(task) {
        let tasks = this.getTasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    getTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    loadTasks() {
        const tasks = this.getTasks();
        tasks.forEach(task => this.addTask(task));
    }

    removeTask(task) {
        let tasks = this.getTasks();
        tasks = tasks.filter(t => t !== task); 
        localStorage.setItem('tasks', JSON.stringify(tasks)); 
    }
}






