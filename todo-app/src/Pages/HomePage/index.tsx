import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Container } from "./style";
import AddTodo from "../../components/AddTodo";
import TodoList from "../../components/TodoList";
import { Header } from "./style";
import ProfileBurger from "../../components/ProfileBurger";

export const HomePage = () => {
    const { initialValue : sortValue } = useLocalStorage<'new'|'old'>('SortType', 'new');

    const [sort, setSort] = useState<'new'|'old'>(sortValue);

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


