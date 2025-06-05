import React, { cloneElement } from 'react';
import useLocalStorage from '../utils/localStorage';
import { type TodoItem } from './TodoItem'
interface TodoListProps {
    setValue: (newValue: TodoItem[]) => void
    children: (props: { index: number }) => React.ReactNode;
}

export default function TodoList ({setValue, children}: TodoListProps) {

    const [tasks, setTasks] = useLocalStorage<TodoItem[]>('Tasks', [])
    
    const handleClickSetDone = (index: number) => {
        const newDone = [...tasks];
        newDone[index].status = !newDone[index].status;
        setValue(newDone)
        setTasks(newDone)
    }
    
    const handleClickDelete = (index: number) => {
        const newDone = [...tasks];
        const newTasks = newDone.filter((_, i) => i !== index);
        setTasks(newTasks)
        setValue(newTasks)
    }

    return (
        <ul>
            {tasks.map((item: TodoItem, index: number) => (
            <li key={index}>
                <span>{item.text}</span>
                <button id={`button-${index}`} onClick={() => handleClickSetDone(index)}>
                    {item.status ?  '✅' :  '❌'}
                </button>
                
                <button  onClick={() => handleClickDelete(index)}>deleate</button>
                {cloneElement(children, { index: index })}
            </li>
            ))}
        </ul>
    )
}