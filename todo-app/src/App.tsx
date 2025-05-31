import AddTodo from './components/AddTodo'
import './App.css'
import useLocalStorage from './utils/localStorage';
import { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
export interface TodoItem {
  text: string;
  status: boolean,
  date: Date,
}
function App() {


  const [tasks, setTasks] = useLocalStorage<TodoItem[]>('Tasks', []);
  const [value, setValue] = useState(tasks)

  const handleAddTask = (task: TodoItem) => {
    setValue([...tasks]);
    setTasks([...tasks, task])
  };

  useEffect(() => {
    setValue(tasks)
  }, [tasks]);

  return (
    <div>
      <AddTodo onAdd={handleAddTask}/>
      <TodoList tasks={tasks} setTasks={setTasks} />
    </div>
  ) 
}

export default App
