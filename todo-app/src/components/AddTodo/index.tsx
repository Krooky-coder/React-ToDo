import {  useState, type ChangeEvent, type KeyboardEvent} from 'react';
import { Button, CustomInput, SpanError, Container} from './style';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import { postTodos, fetchTodos } from '../../api/todos';
import useLocalStorage from '../../utils/localStorage';

export default function AddTodo () {
    const [inputValue, setInputValue] = useState<string>('');
    const [onError, setOnError] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();

    const { initialValue: page} = useLocalStorage('CurrentPage', 1);
    const { initialValue: limit} = useLocalStorage('Limit', 2);

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value);
    };

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            handleOnClick();
        };
    };

    async function handleOnClick () {
        if (inputValue) {
            setOnError(false);
            await dispatch(postTodos({ text: inputValue }));
            await dispatch(fetchTodos({ page, limit }));
            setInputValue('');
        }
        else {
            setOnError(true)
        };
    };

    return (
        <Container>
            <CustomInput
                value={inputValue}
                onChange={handleOnChange}
                type="text"
                placeholder="Введите данные" 
                onKeyDown={handleKeyDown}
            />
            <Button onClick={handleOnClick}>ADD</Button>
            <div>{onError && <SpanError>ERROR: EMPTY INPUT</SpanError>}</div>
        </Container>
    );
};