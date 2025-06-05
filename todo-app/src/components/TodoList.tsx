import React from 'react';
import { type TodoItem } from './TodoItem'

interface TodoListProps {
    tasks: TodoItem[];
    setTasks: (newValue: TodoItem[]) => void
    setValue: (newValue: TodoItem[]) => void
    children: (props: { index: number, setValue: (newValue: TodoItem[]) => void }) => React.ReactNode;
}

export default function TodoList ({ setTasks, tasks, setValue }: TodoListProps) {



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

    const taskList = tasks.map((item: TodoItem, index: number) => {
        return (
            <li>
                <button id={`${index}`} onClick={() => handleClickSetDone(index)}>
                    {item.status ? item.text + ' ✅' : item.text + ' ❌'}
                </button>
                
                <button  onClick={() => handleClickDelete(index)}>deleate</button>
                {children({ index, setValue })}
            </li>
            ))}
        </ul>
    )
}