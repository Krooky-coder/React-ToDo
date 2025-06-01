import AddTodo from './components/AddTodo'
import './App.css'
import useLocalStorage from './utils/localStorage';
import { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import { type TodoItem } from './components/TodoItem'
import EditTodo from './components/EditTodo';
function App() {


  const [tasks, setTasks] = useLocalStorage<TodoItem[]>('Tasks', []);
  const [value, setValue] = useState(tasks)

  const handleAddTask = (task: TodoItem) => {
    setValue([...tasks]);
    setTasks([...tasks, task])
  };

  useEffect(() => {
    setTasks(value)
  }, [value]);

  return (
    <div>
      <AddTodo onAdd={handleAddTask}/>
      <TodoList tasks={value} setTasks={setValue} />
    </div>
  ) 
}

export default App
