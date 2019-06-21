import React, {
  Fragment,
  useState,
  useEffect
} from 'react';

import axios from 'axios';

const Todo = props => {
  // const [todoName, setTodoName] = useState('');
  // const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    axios.get('https://reactdevelopmentproject.firebaseio.com/todos.json')
      .then(result => {
        console.log(result);
        const todoData = result.data;
        const todos = [];
        for (const key in todoData) {
          todos.push({
            id: key,
            name: todoData[key].name
          })
        }
        setTodoState({
          userInput: todoState.userInput,
          todoList: todos
        })
      })
      .catch(err => console.log(err));
  })

  const [todoState, setTodoState] = useState({
    userInput: '',
    todoList: []
  });

  const inputChangeHandler = (event) => {
    setTodoState({
      userInput: event.target.value,
      todoList: todoState.todoList
    })
  }

  const todoAddHandler = () => {
    setTodoState({
      userInput: todoState.userInput,
      todoList: todoState.todoList.concat(todoState.userInput)
    });

    axios.post('https://reactdevelopmentproject.firebaseio.com/todos.json', {
        name: todoState.userInput
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const todoDeleteHandler = (todo) => {
    const todoValue = todo.target.innerText;
    setTodoState({
      userInput: todoState.userInput,
      todoList: todoState.todoList.filter(item => item.name !== todoValue)
    })
  }

  return (<Fragment>
    <input
      type="text"
      placeholder="Todo"
      onChange={inputChangeHandler}
      value={todoState.userInput}
    />
      <button type="button" onClick={todoAddHandler}>
        Add
      </button>
      <ul>
        {todoState.todoList.map(({name, key}) => (
          <li onClick={(name) => todoDeleteHandler(name)} key={key}>{name}</li>
        ))}
      </ul>
    </Fragment>)
}

export default Todo;