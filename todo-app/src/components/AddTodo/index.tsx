import { useId, useState, type ChangeEvent} from 'react';
import  type TodoItem  from '../../TodoItem'
import { Button, CustomInput, SpanError, Container} from './style'

interface AddTodoProps {
    sort: string,
    value: TodoItem[]
    setValue: (newValue: TodoItem[]) => void
}

export default function AddTodo ({ setValue, value, sort }: AddTodoProps) {
    const [inputValue, setInputValue] = useState<string>('')
    const [onError, setOnError] = useState<boolean>(false)
    const id = useId()

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value)
    }

    function handleOnClick () {
        if (inputValue) {
            setOnError(false)  
            const taskToAdd = {
                id: `${id}-${performance.now()}`,
                text: inputValue,
                status: false,
                date: new Date()
            }
            sort === 'new' ? setValue([taskToAdd, ...value]) : setValue([...value, taskToAdd])
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
                placeholder="Введите данные" 
            />
            <Button onClick={handleOnClick}>ADD</Button>
            <div>{onError && <SpanError>ERROR: EMPTY INPUT</SpanError>}</div>
        </Container>
    )
}