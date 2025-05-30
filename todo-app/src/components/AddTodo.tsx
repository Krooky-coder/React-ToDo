import { useState, type ChangeEvent} from 'react';

interface AddTodoProps {
    onAdd: (task: string) => void;
    clearTasks: () => void;
}

export default function AppTodo ({ onAdd, clearTasks }: AddTodoProps) {

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
    function handleOnClickClear () {
        clearTasks()
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
            <button className='button-dellALL' onClick={handleOnClickClear}>Удалить все нахуй</button>
        </div>
)}