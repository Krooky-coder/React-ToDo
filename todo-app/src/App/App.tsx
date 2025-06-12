import AddTodo from '../components/AddTodo'
import './App.css'
import useLocalStorage from '../utils/localStorage';
import TodoList from '../components/TodoList';
import type TodoItem from '../TodoItem'
import ThemeChange from '../components/ThemeChange';
import { ThemeProvider } from 'styled-components';
import { blackTheme, lightTheme } from '../Theme';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { Container } from './style';


function App() {
  const { initialValue: tasksValue, setStoredValue: storeTasksValue} = useLocalStorage<TodoItem[]>('Tasks', []);
  const { initialValue: themeValue, setStoredValue: storeThemeValue } = useLocalStorage<string>('Theme', 'light')
  const { initialValue : sortValue, setStoredValue : storeSortValue} = useLocalStorage<'new'|'old'>('SortType', 'new')
  
  const [values, setValue] = useState<TodoItem[]>(tasksValue)
  const [theme, setTheme] = useState<string>(themeValue)
  const [sort, setSort] = useState<'new'|'old'>(sortValue)
  const themeToProvide = theme === 'light' ? lightTheme : blackTheme

  useEffect(() => {
    storeTasksValue(values)
    storeThemeValue(theme)
    storeSortValue(sort)
  }, [values, theme, sort])
  
  return (
    <>
      <ThemeProvider theme={themeToProvide}>
        <Container>
          <Header>
            <ThemeChange theme={theme} setTheme={setTheme} />
          </Header>
          <AddTodo sort={sort} value={values} setValue={setValue}/>
            <TodoList sort={sort} setSort={setSort} values={values} setValue={setValue}>
            </TodoList>
        </Container>
      </ThemeProvider>
    </>
  ) 
}

export default App
