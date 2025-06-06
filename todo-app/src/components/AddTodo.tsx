import { useState, type ChangeEvent} from 'react';
import { type TodoItem } from './TodoItem'
import styled, { useTheme } from 'styled-components';
interface AddTodoProps {
    onAdd: (task: TodoItem) => void
}

export default function AddTodo ({ onAdd }: AddTodoProps) {

    const theme = useTheme()



    const [inputValue, setInputValue] = useState('')
    const [onError, setOnError] = useState(false)

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value)
    }

    function handleOnClick () {
        if (inputValue) {
            setOnError(false)
            onAdd({
                text: inputValue,
                status: false,
                date: new Date()
            })
            setInputValue('')
        }
        else {
            setOnError(true)
        }
    }

    return (
        <div>
            <div>
            <span>СОСАЛ? </span>
            {onError && 
            <span>
                Да
            </span>}
            </div>
            <input
                value={inputValue}
                onChange={handleOnChange}
                type="text"
                placeholder="Введите данные"
            />
            <button onClick={handleOnClick} >Добавить</button>
        </div>
)}