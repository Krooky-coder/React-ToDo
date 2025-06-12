import { useId, useState, type ChangeEvent} from 'react';
import  type TodoItem  from '../../TodoItem'
import { Button, CustomInput, SpanError, Container} from './style'

interface AddTodoProps {
    sort: string,
    values: TodoItem[]
    setValues: (newValue: TodoItem[]) => void
}

export default function AddTodo ({ setValues, values, sort }: AddTodoProps) {
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
                date: new Date(),
            }
            sort === 'new' ? setValues([taskToAdd, ...values]) : setValues([...values, taskToAdd])
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