import React, { Fragment, useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./components/TodoList.jsx";

const KEY = "todoApp.todos";

export default function App() {
  const [todos, setTodo] = useState([
    { id: 1, task: "Tarea 1", complete: false },
  ]);
  const todoRef = useRef();

  useEffect(() => {
    const storeTodos = JSON.parse(localStorage.getItem(KEY));
    if (storeTodos) {
      setTodo(storeTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((item) => item.id === id);

    todo.complete = !todo.complete;
    setTodo(newTodos);
  };

  const HandleTodoAdd = () => {
    const task = todoRef.current.value;
    if (task === "") return;

    setTodo((prevTodo) => {
      return [
        ...prevTodo,
        {
          id: uuidv4(),
          task,
          complete: false,
        },
      ];
    });

    todoRef.current.value = null;
  };

  const HandleTodoCleanAll = () => {
    const newTodos = todos.filter((todo) => !todo.complete);

    setTodo(newTodos);
  };

  return (
    <Fragment>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoRef} type="text" placeholder="Agregar tarea" />
      <button onClick={HandleTodoAdd}>🎯</button>
      <button onClick={HandleTodoCleanAll}>🗑️</button>
      <div>
        Te quedan {todos.filter((todo) => !todo.complete).length} tareas por
        terminar
      </div>
    </Fragment>
  );
}
