import { Button, CustomInput } from "./style"
import  type TodoItem  from '../../TodoItem'
import { useState, type ChangeEvent} from "react"

export interface EditProps {
    values: TodoItem[],
    setValue: (newValue: TodoItem[]) => void,
    itemId: string,
}

export default function EditTodo ({ setValue, itemId, values }: EditProps) {
    const [valueInput, setInputValue] = useState<string>('')
    const [isEditing, setIsEditing] = useState<boolean>(false)

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleClickEdit = () => {
        const addValue = values.find((item) => item.id === itemId)
        setInputValue(addValue ? addValue.text : '')
        setIsEditing(true)
    }

    const handleClickSave = () => {
        if (valueInput) {
            const newArr = values.map((item) => {
                if (item.id === itemId) {
                    return {...item, text: valueInput} 
                }
                return item
            })
            setValue(newArr)
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