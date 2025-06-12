import { useState, type ChangeEvent} from 'react';
import  type TodoItem  from '../../TodoItem'
import useLocalStorage from '../../utils/localStorage';
import { Button, CustomInput, SpanError, Container} from './style'

interface AddTodoProps {
    setValue: (newValue: TodoItem[]) => void
}

export default function AddTodo ({ setValue }: AddTodoProps) {

    const [inputValue, setInputValue] = useState<string>('')
    const [onError, setOnError] = useState<boolean>(false)

    const { initialValue } = useLocalStorage<'new' | 'old'>('SortType', 'new')
    const tasks = useLocalStorage<TodoItem[]>('Tasks', []).initialValue

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value)
    }

    function handleOnClick () {
        if (inputValue) {
            setOnError(false)  
            if (initialValue === 'new') {
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
            <Button onClick={handleOnClick}>ADD</Button>
            <div>{onError && <SpanError>ERROR: EMPTY INPUT</SpanError>}</div>
        </Container>
    )
}