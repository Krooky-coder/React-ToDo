import { Button, CustomInput } from "./style"
import useLocalStorage from "../../utils/localStorage"
import  type TodoItem  from '../../TodoItem'
import { useState, type ChangeEvent} from "react"

export interface EditProps {
    index: number
    setValue: (newValue: TodoItem[]) => void
}


export default function EditTodo ({ index, setValue }: EditProps) {

    const { initialValue } = useLocalStorage<TodoItem[]>('Tasks', [])
    const [valueInput, setInputValue] = useState<string>(initialValue[index].text || '')
    const [isEditing, setIsEditing] = useState<boolean>(false)

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleClickEdit = () => {
        setInputValue(initialValue[index].text)
        setIsEditing(true)
    }

    const handleClickSave = () => {
        if (valueInput) {
            const editTasks = [...initialValue] 
            editTasks[index].text = valueInput
            setValue(editTasks)

        }
        setIsEditing(false)
    }

    return (
        <>
            {isEditing ? (
                <>
                    <CustomInput 
                        name="editInput"
                        value={valueInput}
                        onChange={handleOnChange}
                        type="text"
                    />
                    <Button onClick={handleClickSave}>Save</Button>
                </>
            ) : (
            <Button onClick={handleClickEdit}>edit</Button>
            )}
        </>
    )



}