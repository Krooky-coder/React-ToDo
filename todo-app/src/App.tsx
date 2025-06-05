import AddTodo from './components/AddTodo'
import './App.css'
import useLocalStorage from './utils/localStorage';
import { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import { type TodoItem } from './components/TodoItem'
import EditTodo from './components/EditTodo';
function App() {


  const [tasks, setTasks] = useLocalStorage<TodoItem[]>('Tasks', []);

  const handleAddTask = (task: TodoItem) => {
    setTasks([...tasks, task])
  };

  useEffect(() => {
    // setTasks(value)
  }, [tasks]);

  return (
    <div>
      <AddTodo onAdd={handleAddTask}/>
      <TodoList setValue={setTasks}>
        {(props) => <EditTodo {...props} />}
      </TodoList>
    </div>
  ) 
}

export default App
