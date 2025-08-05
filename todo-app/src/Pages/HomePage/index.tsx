import { useEffect, useState } from "react";
import useLocalStorage from "../../utils/localStorage";
import { Container } from "./style";
import AddTodo from "../../components/AddTodo";
import TodoList from "../../components/TodoList";
import { Header } from "./style";
import ProfileBurger from "../../components/ProfileBurger";

export const HomePage = () => {
    const { initialValue : sortValue, setStoredValue : storeSortValue} = useLocalStorage<'new'|'old'>('SortType', 'new');
    const { initialValue : accessToken } = useLocalStorage<string>('Access Token', '');

    const [sort, setSort] = useState<'new'|'old'>(sortValue);

    useEffect(() => {
        storeSortValue(sort);
    }, [sort, accessToken]);

    return (
        <Container>
            <Header>
                <span>YouR's ToDo</span>
                <ProfileBurger />
            </Header>
            <AddTodo/>
            <TodoList sort={sort} setSort={setSort} />
        </Container>
    ) 
}


