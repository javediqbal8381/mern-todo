
import { useState, useEffect } from 'react'
function App() {
  const [todos, setTodos] = useState([])
  const [popupActive, setPopupActive] = useState(false)
  const [newTodo, setNewTodo] = useState("")
  const baseApi = "http://localhost:4000"

  useEffect(() => {
    getTodos()
  }, [])

  const getTodos = async () => {
    fetch(baseApi + "/todos").then(res => res.json()).then(data => setTodos(data))
      .catch(err => console.log(err))
  }

  const completedTodo = (id) => {
    const data = fetch(baseApi + "/todo/complete/" + id)
      .then(res => res.json())
    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
        todo.complete = data.complete
        console.log(todo.complete);

      }
      return todo;
    }))
  }

  const deleteTodo = (id) => {
    const data = fetch(baseApi + "/todo/delete/" + id, { method: "DELETE" })
      .then(res => res.json())
  }

  const addnewTodo = () => {
    const data = fetch(baseApi + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": " application/json"
      },
      body: JSON.stringify({
        text: newTodo
      })
    })
      .then(res => res.json())
  }

  return (
    <div className="App">
      <h1>welcome</h1>

      <h4>your tasks</h4>

      <div className='todos'>
        {todos.map((todo, id) => (
          <div onClick={() => { completedTodo(todo._id) }} key={id} className={"todo " + (todo.complete ? "is-complete" : "")} >

            <div className='checkbox'>O</div>

            <div className='text'>{todo.text}</div>
            <div onClick={() => { deleteTodo(todo._id) }} className='deletetodo'>X</div>
          </div>
        ))}



      </div>
      <button onClick={() => { setPopupActive(true) }} className='newtodo'>New</button>
      {
        popupActive ? (
          <>      <input className='new-todo' type='text' name='text' onChange={(e) => { setNewTodo(e.target.value) }} />
            <button onClick={() => { addnewTodo(); setPopupActive(false) }} className='newtodo'>Add todo</button>

          </>
        ) : ''
      }

    </div>
  );
}

export default App;
