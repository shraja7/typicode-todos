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
    div.classList.add('todo')
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

    const toggleCompleted = (e) => {
        if(e.target.classList.contains('todo')){
            e.target.classList.toggle('done')
        }
       updateTodo(e.target.dataset.id, e.target.classList.contains('done'));
    }

    const updateTodo = (id, completed) => {
        fetch(`${apiURL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify({completed}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const deleteTodo = (e) => {
        if(e.target.classList.contains('todo')){
            const id = e.target.dataset.id
            fetch(`${apiURL}/${id}`, {
                method: 'DELETE'
            }).then(response => response.json())
            .then(() => e.target.remove())          

        }
    }


  const init = () => { 

    document.addEventListener('DOMContentLoaded', getTodos)
    document.querySelector('#todo-form').addEventListener('submit', createTodo)
    document.querySelector('#todo-list').addEventListener('click', toggleCompleted )
    document.querySelector('#todo-list').addEventListener('dblclick', deleteTodo)

    
   }

 init()