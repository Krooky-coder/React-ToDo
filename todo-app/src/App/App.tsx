import AddTodo from '../components/AddTodo'
import './App.css'
import useLocalStorage from '../utils/localStorage';
import TodoList from '../components/TodoList';
import type TodoItem from '../TodoItem'
import EditTodo from '../components/EditTodo';
import ThemeChange from '../components/ThemeChange';
import { ThemeProvider } from 'styled-components';
import { blackTheme, lightTheme } from '../Theme';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { Container } from './style';


function App() {

  const tasks = useLocalStorage<TodoItem[]>('Tasks', []);
  const [value, setValue] = useState(tasks.initialValue)

  const sort = useLocalStorage<string>('Theme', 'light')
  const [theme, setTheme] = useState(sort.initialValue)
  const themeToProvide = theme === 'light' ? lightTheme : blackTheme

  useEffect(() => {
    tasks.setStoredValue(value)
    sort.setStoredValue(theme)
  }, [value, theme])
  
  return (
    <>
      <ThemeProvider theme={themeToProvide}>
        <Container>
          <Header>
            <ThemeChange setTheme={setTheme} />
          </Header>
          <AddTodo setValue={setValue}/>
            <TodoList setValue={setValue}>
              {(props) => <EditTodo {...props} />}
            </TodoList>
        </Container>
      </ThemeProvider>
    </>
  ) 
}

export default App
