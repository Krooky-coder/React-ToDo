import { useEffect, useState } from "react";
import { type TodoItem } from '../App.tsx'

interface TodoListProps {
    tasks: TodoItem[];
    setTasks: (newValue: TodoItem[]) => void
}

export default function TodoList ({ tasks, setTasks }: TodoListProps) {

    const [isDone, setIsDone] = useState<TodoItem[]>([])
    useEffect (() => {
        setIsDone(tasks)

    }, [tasks])

    const handleClickSetDone = (index: number) => {
        const newDone = [...isDone];
        newDone[index].status = !newDone[index].status;

        setIsDone(newDone)
        setTasks(newDone)
    }

    const handleClickDelete = (index: number) => {
        
    }

    const taskList = tasks.map((item: TodoItem, index: number) => {
        return (
            <li>
                <button id={`${index}`} onClick={() => handleClickSetDone(index)}>
                    {item.status ? item.text + ' ✅' : item.text + ' ❌'}
                </button>
                
                <button onClick={() => handleClickDelete(index)}>удалить</button>
            </li>)
    })

    return (
        <ul>
            {taskList}
        </ul>
    )
}