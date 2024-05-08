import React, { useState } from 'react';
import ToDoList from './components/ToDoList';
import NewTodo from './components/NewTodo';

interface Todo
{
  id: string, 
  text: string
}

const App: React.FC = () => 
{
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (text: string) =>
  {
    setTodos((prevState: Todo[]) => {
      return [...prevState, {id: Math.random().toString(), text: text}]
    });
  }
  const deleteTodo = (id: string) =>
  {
    setTodos(prevState => {
      return prevState.filter(todo => todo.id !== id)
    })
  }

  return (
    <div className="App">
      <NewTodo onAddTodo={addTodo}/>
      <ToDoList items={todos} deleteTodo={deleteTodo}/>
    </div>
  );
}

export default App;
