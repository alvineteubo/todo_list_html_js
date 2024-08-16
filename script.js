let tasks = [];

const div = document.querySelector('#tasks-html');
const inputText = document.getElementById("input-text");
const inputButton = document.getElementById('input-button');
let ul = document.createElement('ul');
let title = '';
let updated = false;
let buttonName = 'Add  ';

let updateId = 1;

div.appendChild(ul);
inputButton.querySelector("span").textContent= buttonName;

window.addEventListener("DOMContentLoaded", (e) => {

    displayAllTask();
}, true);

function buildTask(task) {
    let li = document.createElement('li');
    li.textContent = `#${task.id} - ${task.title}`;
     inputText.value=''
    li.setAttribute('data-id', task.id)

    let edit= document.createElement('button')
    edit.setAttribute("id", "edit")
    li.appendChild(edit)
    edit.textContent="Edit"
    edit.addEventListener('click', ()=>{
        console.log(task.title, task.id);
        inputText.value =  task.title
        updated = true;
        buttonName = 'Update ';
        inputButton.querySelector("span").textContent= buttonName;
        updateId = task.id -1;
        //tasks = tasks.filter(task => task.id !== updateId)
        //displayAllTask();
    })

    ul.appendChild(li);

    let deleteButton = document.createElement('button');
    //deleteButton.setAttribute("id", "deletebutton")
    li.appendChild(deleteButton);
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        tasks = tasks.filter(t => t.id !== task.id);
        ul.innerHTML = '';
        displayAllTask();
    });
    
    ul.appendChild(li);
}
        console.log(tasks);




function displayAllTask() {
    tasks.forEach(task => {
        buildTask(task);
    });
}

inputText.addEventListener('input', (event) => {
    title = event.target.value;
    console.log(event.target.value)
});

inputButton.addEventListener("click", (e) => {
    e.preventDefault();

    if ( title.trim().length<1) {
        return;
    }

    let lastTask;
    if (tasks.length > 0) {
        lastTask = tasks[tasks.length - 1];
    }

    let newTask = { "id": 1, "title": title }; 

    if (updated) {
        tasks[updateId].title = title;
        ul.innerHTML = '';
        displayAllTask()
        console.log(tasks);
        updated = false;
        buttonName = 'Add';
        inputButton.querySelector("span").textContent = buttonName;
        inputText.value = '';
        return;
    }



    if (!lastTask) {
        tasks.push(newTask);
        buildTask(newTask);
        return;
    }

    newTask.id = lastTask.id + 1;
    tasks = [...tasks, newTask];
    buildTask(newTask);
    console.log(tasks);

    inputText.value = '';
    title='';
});

displayAllTask()