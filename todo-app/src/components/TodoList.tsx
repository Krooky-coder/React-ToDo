import React, { useEffect, useState } from 'react';
import { type TodoItem } from './TodoItem'
import useLocalStorage from '../utils/localStorage';

interface TodoListProps {
    setValue: (newValue: TodoItem[]) => void
    children: (props: { index: number, setValue: (newValue: TodoItem[]) => void }) => React.ReactNode;
}

export default function TodoList ({ setValue, children }: TodoListProps) {

    const [tasks, _] = useLocalStorage<TodoItem[]>('Tasks', []);

    const [sort, setSort] = useState('Новые')

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

    const handleClickSort = () => {
        const newDone = [...tasks]
        const compareFn = (a: TodoItem, b: TodoItem) => {
                    
            const timeA = new Date(a.date).getTime()
            const timeB = new Date(b.date).getTime()
            if (timeA > timeB) {
                setSort('Старые')
            }
            else {
                setSort('Новые')
            }
            return timeA > timeB ? timeB - timeA : timeA - timeB  
        };
        newDone.sort(compareFn)
        setValue(newDone)
    } 

        return (
        <>  
            {tasks.length === 0 ? null : <><span>сортировка: {sort}</span> 
            <button onClick={handleClickSort}>⏰</button></>}
            <ul>
                {tasks.map((item: TodoItem, index: number) =>
                <li>
                    <span>{item.text}</span>
                    <button id={`${index}`} onClick={() => handleClickSetDone(index)}>
                        {item.status ? '✅' : '❌'}
                    </button>
                    
                    <button  onClick={() => handleClickDelete(index)}>deleate</button>
                    {children({ index, setValue })}
                </li>
                )}
            </ul>
        </>
    )
}