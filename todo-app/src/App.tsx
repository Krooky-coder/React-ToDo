import AddTodo from './components/AddTodo'
import './App.css'
import useLocalStorage from './utils/localStorage';
import TodoList from './components/TodoList';
import { type TodoItem } from './components/TodoItem'
import EditTodo from './components/EditTodo';
import ThemeChange from './components/ThemeChange';
import { ThemeProvider } from 'styled-components';
import { blackTheme, lightTheme } from './utils/Theme';
import { useEffect } from 'react';


function App() {

  const [tasks, setTasks] = useLocalStorage<TodoItem[]>('Tasks', []);
  const [theme, setTheme] = useLocalStorage<string>('Theme', 'light')

  const themeToProvide = theme === 'light' ? lightTheme : blackTheme

  useEffect(() =>{

  },[tasks])

  const handleAddTaskNew = (task: TodoItem) => {
    setTasks([task, ...tasks])
  };
  const handleAddTaskOld = (task: TodoItem) => {
    setTasks([...tasks, task])
  };
  
  return (
    <>
      <ThemeProvider theme={themeToProvide}>
        <ThemeChange setTheme={setTheme} />
        <AddTodo onAddNew={handleAddTaskNew} onAddOld={handleAddTaskOld}/>
        <TodoList setValue={setTasks}>
          {(props) => <EditTodo {...props} />}
        </TodoList>
      </ThemeProvider>
    </>
  ) 
}

export default App
