const addBtn = document.getElementById('addBtn');
showTodos();


// Function to show alert
function showAlert (type, heading, message) {
    let alert = document.getElementById('alert')

    let html = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>${heading}!</strong> ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`

    alert.innerHTML = html;
    setInterval(() => {
        alert.innerHTML = '';
    }, 5000);
}



addBtn.addEventListener('click', addTodo);


function addTodo () {
    let titleInp = document.getElementById('title');
    let descInp = document.getElementById('desc');
    let todos = localStorage.getItem('todos');

    if (todos == null) {
        todosObj = [];
    }
    else {
        todosObj = JSON.parse(todos);
    }

    let myObj = {
        title: titleInp.value,
        desc: descInp.value
    }

    if(titleInp.value == '' || descInp.value == '') {
        showAlert('danger', 'Warning', 'Please Enter a valid todo , which must contain a title and description');
    }
    else {
        
            todosObj.push(myObj)
            titleInp.value = '';
            descInp.value = '';
            showAlert('success', 'Success', 'Your todo has been successfully submited')
    }

    localStorage.setItem('todos', JSON.stringify(todosObj))
    showTodos();
    
    
}


function showTodos(){
    let titleInp = document.getElementById('title');
    let descInp = document.getElementById('desc');
    let outputContainer = document.getElementById('output');
    let todos = localStorage.getItem('todos');
    
    if (todos == null) {
        todosObj = [];
    }
    else {
        todosObj = JSON.parse(todos);
    }
    
    let html = '';
    
    todosObj.forEach((element, index) => {
        html += `<tr>
        <th scope="row">${index + 1}</th>
        <td>${element.title}</td>
        <td colspan="2">${element.desc}</td>
        <td><button id="${index}" onClick="deleteTodos(this.id)" class="btn btn-sm btn-outline-dark">Delete</button></td>
        </tr>`
    })
    
    if (todosObj != 0) {
        outputContainer.innerHTML = html;
    }
    else{
        outputContainer.innerHTML = `<h5 class="my-3 text-center">Nothing to show! Use "Add a Todo" section above to add todos</h5>`
    }
}



// Function to delete todo
function deleteTodos(index) {
    let todos = localStorage.getItem('todos');
    
    if (todos == null) {
        todosObj = [];
    }
    else {
        todosObj = JSON.parse(todos);
    }
    
    todosObj.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todosObj));
    showTodos();
    showAlert('success', 'Success', 'Your todo has been successfully deleted')
}