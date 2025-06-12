import React from 'react';
import  type TodoItem  from '../../TodoItem'
import useLocalStorage from '../../utils/localStorage';
import { Button, ContainerSort, ListSpan } from './style'

interface TodoListProps {
    setValue: (newValue: TodoItem[]) => void
    children: (props: { index: number, setValue: (newValue: TodoItem[]) => void }) => React.ReactNode;
}

export default function TodoList ({ setValue, children }: TodoListProps) {

    const tasks = useLocalStorage<TodoItem[]>('Tasks', []).initialValue;
    const { initialValue, setStoredValue} = useLocalStorage<'new'|'old'>('SortType', 'new')

    const handleClickSetDone = (itemId: string) => {
        const newDone = tasks.map(item => 
            item.id === itemId ? { ...item, status: !item.status } : item
        );
        setValue(newDone);
    }

    const handleClickDelete = (itemId: string) => {
        const newTasks = tasks.filter(item => item.id !== itemId);
        setValue(newTasks);
    }

    const handleClickSort = () => {
        setStoredValue(initialValue === 'new' ? 'old' : 'new')
        const newDone = [...tasks]
        newDone.sort((a: TodoItem, b: TodoItem) => {
            const timeA = new Date(a.date).getTime()
            const timeB = new Date(b.date).getTime()
            return timeA > timeB ? timeB - timeA : timeA - timeB
        })
        setValue(newDone)
    } 
    
        return (
        <>  
            <ContainerSort>
                {tasks.length < 2 ? null : <><span>Sort: { initialValue }</span> 
                <Button onClick={handleClickSort}>⏰</Button></>}
            </ContainerSort>
            <ul>
                {tasks.map((item: TodoItem, index: number) =>
                <li key={item.id} id={item.id}>
                    <ListSpan $status={item.status}>{item.text}</ListSpan>
                    <Button onClick={() => handleClickSetDone(item.id)}>
                        {item.status ? '✅' : '❌'}
                    </Button>
                    <Button onClick={() => handleClickDelete(item.id)}>delete</Button>
                    {children({ index, setValue })}
                </li>
                )}
            </ul>
        </>
    )
}