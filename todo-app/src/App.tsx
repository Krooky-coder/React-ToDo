import AddTodo from './components/AddTodo'
import './App.css'
import useLocalStorage from './utils/localStorage';
import { useEffect } from 'react';
import TodoList from './components/TodoList';
import { type TodoItem } from './components/TodoItem'
import EditTodo from './components/EditTodo';
import ThemeChange from './components/ThemeChange';
import { ThemeProvider } from 'styled-components';
import { blackTheme, lightTheme } from './utils/Theme';
ThemeProvider
function App() {

  const [tasks, setTasks] = useLocalStorage<TodoItem[]>('Tasks', []);
  const [theme, setTheme] = useLocalStorage<string>('Theme', 'light')

  const themeToProvide = theme === 'light' ? lightTheme : blackTheme

  const handleAddTask = (task: TodoItem) => {
    setTasks([...tasks, task])
  };

  useEffect (() => {

  },[theme])

  return (
    <>
      <ThemeProvider theme={themeToProvide}>
        <ThemeChange setTheme={setTheme} />
        <AddTodo onAdd={handleAddTask}/>
        <TodoList setValue={setTasks}>
          {(props) => <EditTodo {...props} />}
        </TodoList>
      </ThemeProvider>
    </>
  ) 
}

export default App
