import { useState, type ChangeEvent} from 'react';
import { type TodoItem } from './TodoItem'
import styled, { useTheme } from 'styled-components';
interface AddTodoProps {
    onAdd: (task: TodoItem) => void
}

const theme = useTheme()

const Button = styled.button`
font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border-radius: 3px;

/* Color the border and text with theme.main */
color: ${theme.main};
border: 2px solid ${theme.main};
`;

const Container = styled.div`
padding: 20px;
background-color: ${theme.colors.background};
color: ${theme.colors.text};
`;

export default function AddTodo ({ onAdd }: AddTodoProps) {

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
            {onError && <span>Да</span>}
            </div>
            <Container>
                <input
                    value={inputValue}
                    onChange={handleOnChange}
                    type="text"
                    placeholder="Введите данные"
                />
                <Button onClick={handleOnClick} >Добавить</Button>
            </Container>
        </div>
    )
}