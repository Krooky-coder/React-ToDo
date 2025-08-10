import { Button, CustomInput } from "./style";
import { useState, type ChangeEvent} from "react";
import { putTodos, fetchTodos } from "../../api/todos";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useAppSelector } from "../../hooks/useAppSeleсtor";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export interface EditProps {
    itemId: string,
};

export default function EditTodo ({ itemId }: EditProps) {
    const [valueInput, setInputValue] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    
    const { initialValue: accessToken } = useLocalStorage<string>('Access Token', '');
    const { initialValue: page} = useLocalStorage<number>('CurrentPage', 1);
    const { initialValue: limit} = useLocalStorage<number>('Limit', 2);

    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state) => state.todos.todos);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value);
    };

    const handleClickSave = async (id: string): Promise<void> => {
        if (valueInput) {
            await dispatch(putTodos({ id, text: valueInput, accessToken }));
            dispatch(fetchTodos({page, limit, accessToken}));
        }
        setIsEditing(false);
    };
    
    const handleClickEdit = (): void => {
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