import { useEffect, useState } from "react";
import useLocalStorage from "../../utils/localStorage";
import { ThemeProvider } from "styled-components";
import Header from "../../components/Header";
import { blackTheme, lightTheme } from "../../Theme";
import { Container } from "./style";
import ThemeChange from "../../components/ThemeChange";
import AddTodo from "../../components/AddTodo";
import TodoList from "../../components/TodoList";

export const HomePage = () => {
    const { initialValue: themeValue, setStoredValue: storeThemeValue } = useLocalStorage<string>('Theme', 'light');
    const { initialValue : sortValue, setStoredValue : storeSortValue} = useLocalStorage<'new'|'old'>('SortType', 'new');
  
    const [theme, setTheme] = useState<string>(themeValue);
    const [sort, setSort] = useState<'new'|'old'>(sortValue);

    const themeToProvide = theme === 'light' ? lightTheme : blackTheme;

    useEffect(() => {
        storeThemeValue(theme)
        storeSortValue(sort)
    }, [theme, sort]);

    return (
        <ThemeProvider theme={themeToProvide}>
            <Container>
                <Header>
                    <ThemeChange theme={theme} setTheme={setTheme} />
                </Header>
                <AddTodo/>
                <TodoList sort={sort} setSort={setSort} />
            </Container>
        </ThemeProvider>
    ) 
}


