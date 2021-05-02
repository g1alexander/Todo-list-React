import React from "react";

export default function TodoItem({ todo, toggleTodo }) {
  const { id, task, complete } = todo;

  const handletoggleClick = () => {
    toggleTodo(id);
  };

  return (
    <li>
      <input type="checkbox" checked={complete} onChange={handletoggleClick} />
      {task}
    </li>
  );
}
