//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const completedList = document.querySelector('.completed-list')
const filterOption = document.querySelector('.filter-todo');


//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
document.addEventListener('DOMContentLoaded',getCompleted)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);

//Functions


//Add todo to the list
function addTodo(){
    //Prevent form from submitting
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //Create LI

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo); 
    //Save todo in local storage

    saveLocalTodos(todoInput.value)
    //Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    


    //Trash Mark Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Apprend Div to List
    todoList.appendChild(todoDiv);
    //Clear TodoInput Value
    todoInput.value = "";
}

//Delete Todo from the List

function deleteCheck(e){
    const item = e.target;

    //Trash Mark
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        removeLocalCompleted(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
       
    }
    
    
    
    
    //Check Mark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        if(todo.classList.contains("completed")){
            saveLocalCompleted(todo.innerText)
            removeLocalTodos(todo)
            todo.addEventListener('transitionend', function(){
                todo.remove();
            })
        }
        
        else{
            removeLocalCompleted(todo)
            
          
        }
        
        
        
    }

}


//Filter
function filterTodo(e){
    const todos = todoList.childNodes;  
    todos.forEach(function(todo){   
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                
                break;
            case "completed":
                if (todo.classList.contains("completed")){
                    todo.style.display = "flex2";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex"; 
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    })
}

//Save Local todos

function saveLocalTodos (todo){
    //Check for todos storage
    let todos;
    if(localStorage.getItem('todos') === null){
    todos = []
    }else {
    todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos))
}

//Save Completed on different array
function saveLocalCompleted (todo){
   // Check for todos storage
    let completed;
    if(localStorage.getItem('completed') === null){
        completed = []
        }else {
        completed = JSON.parse(localStorage.getItem('completed'));
        }
        completed.push(todo);
        localStorage.setItem('completed',JSON.stringify(completed))
}






function getTodos(){
    let todos;
    let completed;
    //Check for todos storage
    if(localStorage.getItem('todos') === null){
    todos = []
    }else {
    todos = JSON.parse(localStorage.getItem( 'todos'));
    }

    todos.forEach(function(todo){
         //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //Create LI

    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo); 
    
    //Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Trash Mark Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Apprend Div to List
    todoList.appendChild(todoDiv);
    })
}




function getCompleted(){
    
    let completed;
    //Check for todos storage
    if(localStorage.getItem('completed') === null){
    completed = []
    }else {
    completed = JSON.parse(localStorage.getItem('completed'));
    }

   



    completed.forEach(function(todo){
         //Completed DIV
    const completedDiv = document.createElement('div');
    completedDiv.classList.add("todoCompleted");
    //Create LI

    const completedTodo = document.createElement('li');
    completedTodo.innerText = todo;
    completedTodo.classList.add('todo-item-completed');
    completedDiv.appendChild(completedTodo); 
    
    //Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    completedDiv.appendChild(completedButton);
    //Trash Mark Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    completedDiv.appendChild(trashButton);
    //Apprend Div to List
    completedList.appendChild(completedDiv);
    })
}

function removeLocalTodos (todo){
    //Check for todos storage
    let todos;
    if(localStorage.getItem('todos') === null){
    todos = []
    }else {
    todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeLocalCompleted (todo){
    //Check for todos storage
    let completed;
    if(localStorage.getItem('completed') === null){
    completed = []
    }else {
    completed = JSON.parse(localStorage.getItem('completed'));
    }
    const todoIndex = todo.children[0].innerText;
    completed.splice(completed.indexOf(todoIndex),1);
    localStorage.setItem('completed', JSON.stringify(completed));
}