import useLocalStorage from "../utils/localStorage"
import { type TodoItem } from './TodoItem'
import { useEffect, useState, type ChangeEvent} from "react"

export interface EditProps {
    index: number
    setValue: (newValue: TodoItem[]) => void
}

export default function EditTodo ({ index, setValue }: EditProps) {

    const [tasks, _] = useLocalStorage<TodoItem[]>('Tasks', [])
    const [valueInput, setInputValue] = useState(tasks[index].text || '')
    const [isEditing, setIsEditing] = useState(false)
    useEffect(() => {

    }, [tasks])

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleClickEdit = () => {
        setInputValue(tasks[index].text)
        setIsEditing(true)
    }

    const handleClickSave = () => {
        if (valueInput) {
            const editTasks = [...tasks] 
            editTasks[index].text = valueInput
            setValue(editTasks)

        }
        setIsEditing(false)
    }

    return (
        <>
            {isEditing ? (
                <>
                    <input 
                        name="editInput"
                        value={valueInput}
                        onChange={handleOnChange}
                        type="text"
                    />
                    <button onClick={handleClickSave}>Save</button>
                </>
            ) : (
            <button onClick={handleClickEdit}>edit</button>
            )}
        </>
    )



}