import { useState, type ChangeEvent} from 'react';

interface AddTodoProps {
    onAdd: (task: string) => void
}

export default function AddTodo ({ onAdd }: AddTodoProps) {
    const [inputValue, setInputValue] = useState('')
    
    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value)
    }

    function handleOnClick () {
        if (inputValue) {
            onAdd(inputValue)
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