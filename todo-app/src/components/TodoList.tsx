import { useEffect, useState } from "react";
import { type TodoItem } from '../App.tsx'

interface TodoListProps {
    tasks: TodoItem[];
    setTasks: (newValue: TodoItem[]) => void
}

export default function TodoList ({ setTasks, tasks }: TodoListProps) {

    const [isDone, setIsDone] = useState<TodoItem[]>([])
    useEffect (() => {
        setIsDone(tasks)
    }, [tasks])

    const newDone = [...isDone];
    const handleClickSetDone = (index: number) => {
        newDone[index].status = !newDone[index].status;

        setIsDone(newDone)
        setTasks(newDone)
    }

    const handleClickDelete = (index: number) => {
        const newTasks = newDone.filter((_, i) => i !== index);
        setIsDone(newTasks)
        setTasks(newTasks)
    }

    const taskList = tasks.map((item: TodoItem, index: number) => {
        return (
            <li>
                <button id={`${index}`} onClick={() => handleClickSetDone(index)}>
                    {item.status ? item.text + ' ✅' : item.text + ' ❌'}
                </button>
                
                <button  onClick={() => handleClickDelete(index)}>удалить</button>
            </li>)
    })

    return (
        <ul>
            {taskList}
        </ul>
    )
}