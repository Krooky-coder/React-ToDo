import {  useState, type ChangeEvent, type KeyboardEvent} from 'react';
import { Button, CustomInput, SpanError, Container} from './style';
import { postTodos, fetchTodos } from '../../api/todos';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useAppDispatch } from '../../hooks/useAppDispatch';

export default function AddTodo () {
    const [inputValue, setInputValue] = useState<string>('');
    const [onError, setOnError] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const { initialValue: accessToken } = useLocalStorage<string>('Access Token', '');
    const { initialValue: page} = useLocalStorage<number>('CurrentPage', 1);
    const { initialValue: limit} = useLocalStorage<number>('Limit', 2);

    function handleOnChange(e: ChangeEvent<HTMLInputElement>): void {
        setInputValue(e.target.value);
    };

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>): void {
        if (e.key === 'Enter') {
            handleOnClick();
        };
    };

    async function handleOnClick (): Promise<void>{
        if (inputValue.trim()) {
            setOnError(false);
            await dispatch(postTodos({ text: inputValue, accessToken }));
            await dispatch(fetchTodos({ page, limit, accessToken }));
            setInputValue('');
        } else {
            setOnError(true);
        };
    };

    return (
        <Container>
            <CustomInput
                name='addTodo'
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