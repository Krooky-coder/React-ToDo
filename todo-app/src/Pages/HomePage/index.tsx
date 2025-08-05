import { useEffect, useState } from "react";
import useLocalStorage from "../../utils/localStorage";
import { ThemeProvider } from "styled-components";
import { blackTheme, lightTheme } from "../../Theme";
import { Container } from "./style";
import ThemeChange from "../../components/ThemeChange";
import AddTodo from "../../components/AddTodo";
import TodoList from "../../components/TodoList";
import { Header } from "./style";
import { useDispatch } from 'react-redux';
import ProfileBurger from "../../components/ProfileBurger";
import type { AppDispatch } from "../../store";
import { useAppSelector } from "../../utils/useAppSeleсtor";
// import { fetchRefresh } from "../../api/auth";
// import { TokenIsExpired } from "../../utils/RefreshToken";


export const HomePage = () => {
    const { initialValue : sortValue, setStoredValue : storeSortValue} = useLocalStorage<'new'|'old'>('SortType', 'new');
    const { initialValue : accessToken, setStoredValue: storeAccessToken} = useLocalStorage('Access Token', '');
    // const { initialValue : refreshToken, setStoredValue: storeRefreshToken} = useLocalStorage('Refresh Token', '');
    const { initialValue: themeValue, setStoredValue: storeThemeValue } = useLocalStorage<string>('Theme', 'light');

    const refreshFronServer = useAppSelector(state => state.auth.refreshToken);
    const tokenFromServer = useAppSelector(state => state.auth.token);
    const dispath = useDispatch<AppDispatch>();

    const [theme, setTheme] = useState<string>(themeValue);
    const [sort, setSort] = useState<'new'|'old'>(sortValue);

    const themeToProvide = theme === 'light' ? lightTheme : blackTheme;
    
    useEffect(() => {
        // if (tokenFromServer && TokenIsExpired(accessToken)) {
        //     dispath(fetchRefresh({ refreshToken }));
        //     storeAccessToken(tokenFromServer);
        // }
        // if (refreshFronServer) {
        //     storeRefreshToken(refreshFronServer);
        // }
        storeThemeValue(theme);
        storeSortValue(sort);
    }, [theme, sort, accessToken]);

    return (
        <ThemeProvider theme={themeToProvide}>
            <Container>
                <Header>
                    <ThemeChange theme={theme} setTheme={setTheme} />
                    <span>YouR's ToDo</span>
                    <ProfileBurger />
                </Header>
                <AddTodo/>
                <TodoList sort={sort} setSort={setSort} />
            </Container>
        </ThemeProvider>
    ) 
}


