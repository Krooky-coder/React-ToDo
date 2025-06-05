import React from 'react';
import { type TodoItem } from './TodoItem'
import useLocalStorage from '../utils/localStorage';

interface TodoListProps {
    setValue: (newValue: TodoItem[]) => void
    children: (props: { index: number, setValue: (newValue: TodoItem[]) => void }) => React.ReactNode;
}

export default function TodoList ({ setValue, children }: TodoListProps) {

    const [tasks, setTasks] = useLocalStorage<TodoItem[]>('Tasks', []);
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
    )
}