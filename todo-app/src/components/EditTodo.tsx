import styled from "styled-components"
import useLocalStorage from "../utils/localStorage"
import { type TodoItem } from './TodoItem'
import { useState, type ChangeEvent} from "react"

export interface EditProps {
    index: number
    setValue: (newValue: TodoItem[]) => void
}

const Button = styled.button`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 5px;
    /* Color the border and text with theme.main */
    color: ${props => props.theme.colors.text};
    border: 2px solid ${props => props.theme.main};
    background: ${props => props.theme.colors.primary};
`;

const CustomInput = styled.input`
    background: ${props => props.theme.colors.primary};
    padding: 10px 12px;
    border: 2px solid ${props => props.theme.main};
    border-radius: 8px;
    font-size: 16px;
    font-family: "Rubik Bubbles", system-ui;
    color: ${props => props.theme.colors.text};
`

export default function EditTodo ({ index, setValue }: EditProps) {

    const [tasks, _] = useLocalStorage<TodoItem[]>('Tasks', [])
    const [valueInput, setInputValue] = useState<string>(tasks[index].text || '')
    const [isEditing, setIsEditing] = useState<boolean>(false)

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