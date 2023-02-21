const apiURL = 'https://jsonplaceholder.typicode.com/todos'

const getTodos = () => { 
    fetch(apiURL + '?_limit=10')
        .then(response => response.json())
        .then(data =>
        {
            data.forEach(todo => addTodoToDom(todo))
        }

        )
 }

 const addTodoToDom = (todo) => { 
    const div = document.createElement('div')
    div.appendChild(document.createTextNode(todo.title))
    div.setAttribute('data-id', todo.id)
    //for todos that have values of true, they will be given a class of done and be darkened
    if(todo.completed) {
        div.classList.add('done')
    }
    document.getElementById('todo-list').appendChild(div)
  }

  const createTodo = (e) => { 
e.preventDefault()

const newTodo = {
    title: e.target.firstElementChild.value,
    completed: false
}
fetch(apiURL, {
    method: 'POST',
    body: JSON.stringify(newTodo),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(response => response.json())
.then(data => addTodoToDom(data))
   }

  const init = () => { 

    document.addEventListener('DOMContentLoaded', getTodos)
    document.querySelector('#todo-form').addEventListener('submit', createTodo)
    
   }

 init()