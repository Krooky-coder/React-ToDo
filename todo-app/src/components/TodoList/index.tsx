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
        setStoredValue(initialValue === 'new' ? 'old' : 'new')
        const newDone = [...tasks]
        newDone.sort(compareFn)
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
                <li>
                    <ListSpan status={item.status}>{item.text}</ListSpan>
                    <Button id={`${index}`} onClick={() => handleClickSetDone(index)}>
                        {item.status ? '✅' : '❌'}
                    </Button>
                    
                    <Button  onClick={() => handleClickDelete(index)}>delete</Button>
                    {children({ index, setValue })}
                </li>
                )}
            </ul>
        </>
    )
}