

const form=document.querySelector("form");
const input=document.querySelector("#txtTaskName");
const btnAddNewTask=document.querySelector("#btnAddNewTask");
const btnDeleteAll=document.querySelector("#btnDeleteAll");
const taskList=document.querySelector("#task-list");
let todos;





//load items

loadItems();

function loadItems(){
    todos=getItemsFromLS();
    todos.forEach(function (item){
        createItem(item);

    })

}
function getItemsFromLS(){
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }
    return todos;
}
//SET ITEM TO LOCAL STORAGE
function setItemToLS(newToDo){
    todos=getItemsFromLS();
    todos.push(newToDo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function createItem(newToDo){
   const li=document.createElement("li");
   li.className="list-group-item list-group-item-secondary"
   li.appendChild(document.createTextNode(newToDo));
   

   const a=document.createElement("a");
   a.classList="delete-item float-right";
   a.setAttribute("href","#");
   a.innerHTML='<i class="fas fa-times"></i>';

   li.appendChild(a);
   taskList.appendChild(li);

}


eventListeners();


function eventListeners(){
    form.addEventListener("submit",addNewItem)
    taskList.addEventListener("click",deleteItem);
    btnDeleteAll.addEventListener("click",deleteAllItems);

}

function addNewItem(e){
    if(input.value===""){
        alert("Add New Item");
        
    }
    else{
   createItem(input.value);

   setItemToLS(input.value);
   
   input.value="";


    e.preventDefault();
    }       

}

function deleteItem(e){
    if(confirm("Are you sure for deleting element?")){
        if(e.target.className === "fas fa-times"){
            e.target.parentElement.parentElement.remove();
            deleteToDoFromStorage(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();


}
function deleteToDoFromStorage(deleteToDo){
    let todos=getItemsFromLS();

    todos.forEach(function(todo,index){
        if(todo==deleteToDo){
            todos.splice(index,1);
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}

function deleteAllItems(e){
    if(confirm("Do you want to delete all list?")){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        };
        localStorage.clear();
        
    
}
