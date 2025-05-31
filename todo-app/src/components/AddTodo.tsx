import { useState, type ChangeEvent} from 'react';
import { type TodoItem } from '../App.tsx'
interface AddTodoProps {
    onAdd: (task: TodoItem) => void
}

export default function AddTodo ({ onAdd }: AddTodoProps) {

    const [inputValue, setInputValue] = useState('')
    
    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value)
    }

    function handleOnClick () {
        if (inputValue) {
            onAdd({
                text: inputValue,
                status: false,
                date: new Date()
            })
            setInputValue('')
        }
    }

    return (
        <div>
            <input
                value={inputValue}
                onChange={handleOnChange}
                type="text"
                placeholder="Введите данные"
            />
            <button onClick={handleOnClick} >Добавить</button>
        </div>
)}