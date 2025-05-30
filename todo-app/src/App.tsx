import AddTodo from './components/AddTodo'
import './App.css'
import TodoList from './components/TodoList'
import useLocalStorage from './utils/localStorage';
import { useEffect } from 'react';
function App() {

  const [tasks, setTasks] = useLocalStorage<string[]>('Tasks', []);

  const handleAddTask = (task: string) => {
    setTasks([...tasks, task]);
  };

  useEffect(() => {

  }, [tasks]);

  return (
    <div>
      <AddTodo onAdd={handleAddTask}/>
      <TodoList tasks={tasks}/>
    </div>
  ) 
}

export default App
