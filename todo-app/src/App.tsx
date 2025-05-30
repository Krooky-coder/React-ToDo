import AddTodo from './components/AddTodo'
import './App.css'
import TodoList from './components/TodoList'
import useLocalStorage from './utils/localStorage';

function App() {

  const [tasks, addValue, claerValue] = useLocalStorage<string[]>('Tasks', []);

  const addTask = (newItem: string) => {
    addValue(prev => [...prev, newItem])
  }

  return (
    <div>
      <AddTodo onAdd={addTask} clearTasks={claerValue}/>
      <TodoList tasks={tasks}/>
    </div>
  ) 
}

export default App
