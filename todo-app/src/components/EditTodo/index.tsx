import { Button, CustomInput } from "./style";
import type { AppDispatch } from '../../store';
import { useState, type ChangeEvent} from "react";
import { useDispatch } from "react-redux";
import { putTodos, fetchTodos } from "../../api/todos";
import useLocalStorage from "../../utils/localStorage";
import { useAppSelector } from "../../utils/useAppSeleсtor";

export interface EditProps {
    itemId: string,
};

export default function EditTodo ({ itemId }: EditProps) {
    const [valueInput, setInputValue] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    
    const { initialValue: accessToken } = useLocalStorage('Access Token', '');
    const { initialValue: page} = useLocalStorage('CurrentPage', 1);
    const { initialValue: limit} = useLocalStorage('Limit', 2);

    const dispatch = useDispatch<AppDispatch>();
    const tasks = useAppSelector((state) => state.todos.todos);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleClickSave = async (id: string) => {
        if (valueInput) {
            await dispatch(putTodos({ id, text: valueInput, accessToken }));
            dispatch(fetchTodos({page, limit, accessToken}));
        }
        setIsEditing(false);
    };
    
    const handleClickEdit = () => {
        setIsEditing(true);
        const addValue = tasks.find((item) => `${item.id}` === itemId);
        setInputValue(addValue ? addValue.text : '');
    };

    return (
        <>
            {isEditing ? (
                <>
                    <CustomInput 
                        name="editInput"
                        value={valueInput}
                        onChange={handleOnChange}
                        type="text"
                    />
                    <Button onClick={() => handleClickSave(itemId)}>Save</Button>
                </>
            ) : (
            <Button onClick={handleClickEdit}>edit</Button>
            )}
        </>
    );
};