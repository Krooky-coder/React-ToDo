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
    border-radius: 5px;
    /* Color the border and text with theme.main */
    color: ${props => props.theme.colors.text};
    border: 2px solid ${props => props.theme.main};
    background: ${props => props.theme.colors.primary};
`;
const SpanError = styled.span`
    color: ${props => props.theme.colors.secondary}  
`
const Container = styled.div`
    min-height: 100px;
    margin-top: 20px;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
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


export default function AddTodo ({ setValue }: AddTodoProps) {

    const [inputValue, setInputValue] = useState('')
    const [onError, setOnError] = useState(false)
    const [sort, _t] = useLocalStorage('SortType', 'new')
    const [tasks, _] = useLocalStorage('Tasks', [])

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value)
    }

    function handleOnClick () {
        if (inputValue) {
            setOnError(false)  
            if (sort === 'new') {
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
        <Container>
            <CustomInput
                value={inputValue}
                onChange={handleOnChange}
                type="text"
                placeholder="Введите данные" />
            <Button onClick={handleOnClick}>Добавить</Button>
            <div>{onError && <SpanError>ОШИБКА: ВВЕДИТЕ ЗНАЧЕНИЕ</SpanError>}</div>
        </Container>
    )
}