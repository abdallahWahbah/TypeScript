import React from 'react'

import "./TodoList.css";

interface TodoProps
{
    items: {id: string, text: string}[],
    deleteTodo: (id: string) => void
}

const ToDoList: React.FC<TodoProps> = ({items, deleteTodo}) => 
{
    return (
        <ul>
            {items.map(todo => (
                <li key={todo.id}>
                    <span>{todo.text}</span>
                    {/* <button onClick={() => deleteTodo(todo.id)}>DELETE</button> */}
                    <button onClick={deleteTodo.bind(null, todo.id)}>DELETE</button>
                </li>
            ))}
        </ul>
    )
}

export default ToDoList