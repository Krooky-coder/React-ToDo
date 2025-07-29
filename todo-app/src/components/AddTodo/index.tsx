import {  useEffect, useState, type ChangeEvent, type KeyboardEvent} from 'react';
import { Button, CustomInput, SpanError, Container} from './style';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import { postTodos, fetchTodos } from '../../api/todos';
import useLocalStorage from '../../utils/localStorage';
import { useAppSelector } from '../../utils/useAppSeleсtor';

export default function AddTodo () {
    const [inputValue, setInputValue] = useState<string>('');
    const [onError, setOnError] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();

    const { initialValue: accessToken } = useLocalStorage('Access Token', '');
    const { initialValue: page} = useLocalStorage('CurrentPage', 1);
    const { initialValue: limit} = useLocalStorage('Limit', 2);

    const errorMessage = useAppSelector((state) => state.todos.error);
    const status = useAppSelector((state) => state.auth.status);
    
    useEffect(() => {
        dispatch(fetchTodos({page, limit, accessToken}));
    },[errorMessage, status])

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