import React, { useEffect } from 'react';
import { type TodoItem } from './TodoItem'
import useLocalStorage from '../utils/localStorage';
import styled from 'styled-components';

interface TodoListProps {
    setValue: (newValue: TodoItem[]) => void
    children: (props: { index: number, setValue: (newValue: TodoItem[]) => void }) => React.ReactNode;
}

const Button = styled.button`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 5px;
    /* Color the border and text with theme.main */
    color: ${props => props.theme.colors.text};
    border: 2px solid ${props => props.theme.main};
    background: ${props => props.theme.colors.primary};
`;

const ContainerSort = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

interface ListSpanProps {
  status: boolean;
}

const ListSpan = styled.span<ListSpanProps>`
    text-decoration: ${props => props.status ? 'line-through' : 'none'}
`

export default function TodoList ({ setValue, children }: TodoListProps) {

    const [tasks, _] = useLocalStorage<TodoItem[]>('Tasks', []);
    const [sort, setSort] = useLocalStorage<'new'|'old'>('SortType', 'new')

    useEffect(() => {
              
    },[tasks])

    const handleClickSetDone = (index: number) => {
        const newDone = [...tasks];
        newDone[index].status = !newDone[index].status;
        setValue(newDone)
    }
    
    const handleClickDelete = (index: number) => {
        const newDone = [...tasks];
        const newTasks = newDone.filter((_, i) => i !== index);
        setValue(newTasks)
    }

    const compareFn = (a: TodoItem, b: TodoItem) => {
                
        const timeA = new Date(a.date).getTime()
        const timeB = new Date(b.date).getTime()

        return timeA > timeB ? timeB - timeA : timeA - timeB  
    };

    const handleClickSort = () => {
        setSort(sort === 'new' ? 'old' : 'new')
        const newDone = [...tasks]
        newDone.sort(compareFn)
        setValue(newDone)
    } 
    

        return (
        <>  
            <ContainerSort>
                {tasks.length === 0 ? null : <><span>Sort: {sort}</span> 
                <Button onClick={handleClickSort}>⏰</Button></>}
            </ContainerSort>
            <ul>
                {tasks.map((item: TodoItem, index: number) =>
                <li>
                    <ListSpan status={item.status}>{item.text}</ListSpan>
                    <Button id={`${index}`} onClick={() => handleClickSetDone(index)}>
                        {item.status ? '✅' : '❌'}
                    </Button>
                    
                    <Button  onClick={() => handleClickDelete(index)}>deleate</Button>
                    {children({ index, setValue })}
                </li>
                )}
            </ul>
        </>
    )
}