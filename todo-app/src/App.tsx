import AddTodo from './components/AddTodo'
import './App.css'
import useLocalStorage from './utils/localStorage';
import { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
function App() {

  const [tasks, setTasks] = useLocalStorage<string[]>('Tasks', []);
  const [isDone, setIsDone] = useLocalStorage<boolean[]>('isDone', []);
  const [value, setValue] = useState(tasks)

  const handleAddTask = (task: string) => {
    setValue([...tasks]);
    setTasks([...tasks, task])
    setIsDone([...isDone, false])
  };

  useEffect(() => {
    
  }, [value]);

  return (
    <div>
      <AddTodo onAdd={handleAddTask}/>
      <TodoList tasks={tasks} tasksDoned={{isDone, setIsDone}} />
    </div>
  ) 
}

export default App
