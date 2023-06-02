const addItem = document.getElementById("add-item");
const taskCount = document.getElementById("task-counter");
const taskList = document.getElementById("list");
let tasks = [];
function getInput(e)
{
    if(e.key=="Enter")
    {
        const text = e.target.value;
        if(!text){
            showNotif("No text Entered")
        }
        const task = {
            text,
            id : Date.now().toString(),
            completed : false
        }
        addItem.value="";
        addToList(task);
    }
}

function showNotif(text)
{
    window.alert(text);
}

function addToList(task){
    if(task)
    {
        tasks.push(task);
        renderList();
    }
    
}

function deleteFromList(taskId)
{
    const newTask = tasks.filter(task=> taskId!=task.id)
    tasks = newTask;
    renderList();

}

function toggleTask(taskId)
{
    for(let task of tasks)
    {
        if(task.id==taskId)
        {
            task.completed = !task.completed;
            if(task.completed)
            {
                document.getElementById(taskId).nextElementSibling.classList.add("checked")
            }
            else
            {
                document.getElementById(taskId).nextElementSibling.classList.remove("checked")
            }
        }
    }
    renderList();
}

function renderList(){
    taskList.innerHTML="";
    for( let task of tasks)
    {
        addToDom(task);
    }
    taskCount.innerHTML=tasks.length;
}
function addToDom(task){
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <input type="checkbox" ${task.completed?'checked':''} class ="custom-checkbox listItem" id="${task.id}"><label class="listItem" for="${task.id}">${task.text}</label><i data-id="${task.id}" class="fa-regular fa-trash-can delete"></i>
    `;
    taskList.append(listItem);
    
}

function listEvent(e)
{
    let targetItem = e.target;
    if(targetItem.matches(".delete")){
        let id = targetItem.getAttribute("data-id");
        deleteFromList(id);
    }
    if(targetItem.matches(".listItem")){
        let id = targetItem.getAttribute("id");
        if(!id){
            id= targetItem.getAttribute("for");
        }
        toggleTask(id);
    }
}

addItem.addEventListener('keyup',getInput);
list.addEventListener('click',listEvent);
