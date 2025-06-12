import { Button, CustomInput } from "./style"
import  type TodoItem  from '../../TodoItem'
import { useState, type ChangeEvent} from "react"

export interface EditProps {
    values: TodoItem[]
    setValue: (newValue: TodoItem[]) => void
    itemId: string
}

export default function EditTodo ({ setValue, itemId, values }: EditProps) {
    const [valueInput, setInputValue] = useState<string>('')
    const [isEditing, setIsEditing] = useState<boolean>(false)

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleClickEdit = () => {
        values.forEach ((item, index) => {
            if (item.id === itemId) {
                setInputValue(values[index].text)
            } 
        })
        setIsEditing(true)
    }

    const handleClickSave = () => {
        if (valueInput) {
            const editTasks = [...values] 
            editTasks.map((item) => {
                if (item.id === itemId) {
                    item.text = valueInput
                }
            })
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