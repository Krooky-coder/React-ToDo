import AddTodo from './components/AddTodo'
import './App.css'
import useLocalStorage from './utils/localStorage';
import TodoList from './components/TodoList';
import { type TodoItem } from './components/TodoItem'
import EditTodo from './components/EditTodo';
import ThemeChange from './components/ThemeChange';
import styled, { ThemeProvider } from 'styled-components';
import { blackTheme, lightTheme } from './utils/Theme';
import Header from './components/Header';

const Container = styled.div`
  border: 2px solid ${props => props.theme.main};
  border-radius: 15px;
  background: ${props => props.theme.colors.background};
  padding: 0px;
  margin: 0px;
  width: 60%;
  color: ${props => props.theme.colors.text};
`

function App() {

  const [_, setTasks] = useLocalStorage<TodoItem[]>('Tasks', []);
  const [theme, setTheme] = useLocalStorage<string>('Theme', 'light')
  const themeToProvide = theme === 'light' ? lightTheme : blackTheme
  
  return (
    <>
      <ThemeProvider theme={themeToProvide}>
        <Container>
          <ThemeChange setTheme={setTheme} />
          <Header />
          <AddTodo setValue={setTasks}/>
            <TodoList setValue={setTasks}>
              {(props) => <EditTodo {...props} />}
            </TodoList>
        </Container>
      </ThemeProvider>
    </>
  ) 
}

export default App
