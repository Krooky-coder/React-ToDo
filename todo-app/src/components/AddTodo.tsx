import { useState, type ChangeEvent} from 'react';
import { type TodoItem } from './TodoItem'
import styled from 'styled-components';
import useLocalStorage from '../utils/localStorage';

interface AddTodoProps {
    setValue: (newValue: TodoItem[]) => void
}

const Button = styled.button`
font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border-radius: 3px;

/* Color the border and text with theme.main */
color: ${props => props.theme.main};
border: 2px solid ${props => props.theme.main};
`;

const Container = styled.div`
padding: 20px;
background-color: ${props => props.theme.colors.background};
color: ${props => props.theme.colors.text};
`;

export default function AddTodo ({ setValue }: AddTodoProps) {

    const [inputValue, setInputValue] = useState('')
    const [onError, setOnError] = useState(false)
    const [sort, _t] = useLocalStorage('SortType', 'Новые')
    const [tasks, _] = useLocalStorage('Tasks', [])

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value)
    }

    function handleOnClick () {
        if (inputValue) {
            setOnError(false)  
            if (sort === 'Новые') {
                setValue([{
                    text: inputValue,
                    status: false,
                    date: new Date()
                }, ...tasks])
            }
            else {
                setValue([...tasks, {
                    text: inputValue,
                    status: false,
                    date: new Date()
                }])
            }
            setInputValue('')           
        }
        else {
            setOnError(true)
        }
    }

    return (
        <div>
            <div>{onError && <span>ОШИБКА: ВВЕДИТЕ ЗНАЧЕНИЕ</span>}</div>
            <Container>
                <input
                    value={inputValue}
                    onChange={handleOnChange}
                    type="text"
                    placeholder="Введите данные"
                />
                <Button onClick={handleOnClick}>Добавить</Button>
            </Container>
        </div>
    )
}