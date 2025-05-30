interface TodoListProps {
    tasks: string[];
}

export default function TodoList ({ tasks }: TodoListProps) {

    const handleClickDelete = () => {
    }
    
    const taskList = tasks.map((item: string, index: number) => {
        return (
            <li key={index}>
                {item}
                <button onClick={handleClickDelete}>удалить</button>
            </li>)
    })

    return (
        <ul>
            {taskList}
        </ul>
    )
}