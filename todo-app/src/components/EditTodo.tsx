import useLocalStorage from "../utils/localStorage"
import { type TodoItem } from './TodoItem'
import { useEffect, useState, type ChangeEvent, type MouseEvent } from "react"



export interface EditProps {
    index: number
    setValue: (newValue: TodoItem[]) => void
}

export default function EditTodo ({index, setValue}: EditProps) {

    const [tasks, setTasks] = useLocalStorage<TodoItem[]>('Tasks', [])
    
    const [valueInput, setInputValue] = useState(tasks[index]?.text || '')
    const [isEditing, setIsEditing] = useState(false)
    useEffect(() => {
        
    }, [])

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleClickEdit = () => {
        setIsEditing(true)
    }

    const handleClickSave = () => {
        if (valueInput.trim()) {
            const editTasks = [...tasks] 
            editTasks[index].text = valueInput
            setTasks(editTasks)
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