import AddTodo from './components/AddTodo'
import './App.css'
import useLocalStorage from './utils/localStorage';
import { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
function App() {

  const [tasks, setTasks] = useLocalStorage<string[]>('Tasks', []);
  const [value, setValue] = useState(tasks)

  const handleAddTask = (task: string) => {
    setValue([...tasks, task]);
    setTasks([...tasks, task])
  };

  useEffect(() => {
    
  }, []);

  return (
    <div>
      <AddTodo onAdd={handleAddTask}/>
      <TodoList tasks={tasks} />
    </div>
  ) 
}

export default App
