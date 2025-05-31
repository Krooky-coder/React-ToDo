import { useEffect, useState } from "react";
interface TodoListProps {
    tasks: string[];
    tasksDoned: {
        isDone: boolean[];
        setIsDone: (newValue: boolean[]) => void;
    }
}


export default function TodoList ({ tasks, tasksDoned }: TodoListProps) {

    const [isDone, setIsDone] = useState<boolean[]>([])
    useEffect (() => {
        setIsDone(tasksDoned.isDone)
    }, [tasksDoned.isDone])

    const handleClickSetDone = (index: number) => {
        const newDone = [...isDone];
        newDone[index] = !newDone[index];

        setIsDone(newDone)
        tasksDoned.setIsDone(newDone)
    }


    const handleClickDelete = () => {
    }

    const taskList = tasks.map((item: string, index: number) => {
        return (
            <li >
                <button id={`${index}`} onClick={() => handleClickSetDone(index)}>
                    {isDone[index] ? item + ' ✅' : item + ' ❌'}
                </button>
                
                <button onClick={handleClickDelete}>удалить</button>
            </li>)
    })

    return (
        <ul>
            {taskList}
        </ul>
    )
}