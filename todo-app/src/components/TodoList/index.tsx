import  type TodoItem  from '../../TodoItem';
import { Button, ButtonPages, ContainerSort, ListSpan } from './style';
import EditTodo from '../EditTodo/index';
import { Pagination, Stack } from "@mui/material";
import { useEffect, useState } from 'react';
import { deleteTodos, fetchTodos, patchTodos } from '../../api/todos';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import useLocalStorage from '../../utils/localStorage';
import { switchStatus } from '../../store/todoSlice';
import { useAppSelector } from '../../utils/useAppSeleсtor';

interface TodoListProps {
    sort: string;
    setSort: (newValue: "new" | "old") => void;
};

export default function TodoList ({ sort, setSort }: TodoListProps) {
    const pageLimitFromServer = useAppSelector((state) => state.todos.limit);
    const currentPageFromServer = useAppSelector((state) => state.todos.currentPage);
    const pageQtyFromServer = useAppSelector((state) => state.todos.pages);
    const onError = useAppSelector((state) => state.todos.error);
    const loadingStatus = useAppSelector((state) => state.todos.onLoading);
    const tasksFromServer = useAppSelector((state) => state.todos.todos);
    
    const { initialValue: CurrentPage, setStoredValue: storeCurrentPage } = useLocalStorage<number>('CurrentPage', currentPageFromServer);
    const { initialValue: LocalPagelimit, setStoredValue: storePagelimit } = useLocalStorage<number>('Limit', pageLimitFromServer);
    
    const [limit, setLimit] = useState(LocalPagelimit);
    const [page, setPage] = useState<number>(CurrentPage);
    const [pageQty, setpageQty] = useState(pageQtyFromServer);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        storePagelimit(limit);
        storeCurrentPage(page);
        dispatch(fetchTodos({page, limit}));
        setpageQty(pageQtyFromServer);

        if (currentPageFromServer > pageQtyFromServer) {
            setPage(1);
        };
    }, [page, limit, pageQtyFromServer]);

    const handleOnChangePage = (_: unknown, num: number) => {
        setPage(num);
    };
    
    const handleClickSetDone = async (itemId: string, completed: boolean) => {
        await dispatch(patchTodos({ id: itemId, completed: !completed }));
        dispatch(switchStatus({ itemId, completed }));
    };
    
    const handleClickDelete = async (itemId: string) => {
        await dispatch(deleteTodos({ id: itemId }));
        await dispatch(fetchTodos({page, limit}));
    };
    
    const handleClickSort = async () => {
        setSort(sort === 'new' ? 'old' : 'new')
    };
    
    const taskToRender = [...tasksFromServer];

    if (sort === 'new') {
        taskToRender.sort((a: TodoItem, b: TodoItem) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return timeB - timeA;
    });
    } else {
    taskToRender.sort((a: TodoItem, b: TodoItem) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return timeA - timeB;
    });
    }

    return (
    <>  
        { onError ? <span>{onError}</span> :
        <> 
        { loadingStatus ? <span>loading...</span> :  
            <>
                <ContainerSort>
                    {taskToRender.length < 1 ? null : <><span>Sort: { sort }</span> 
                    <Button onClick={handleClickSort}>⏰</Button></>}
                </ContainerSort>
                <Stack sx={{minHeight: '300px'}}>
                    <ul>
                        {taskToRender.map((item: TodoItem) =>
                        <li key={item.id} id={`${item.id}`}>
                            <ListSpan $status={item.completed}>{item.text}</ListSpan>
                            <Button onClick={() => handleClickSetDone(`${item.id}`, item.completed)}>
                                {item.completed ? '✅' : '❌'}
                            </Button>
                            <Button onClick={() => handleClickDelete(`${item.id}`)}>delete</Button>
                            <EditTodo 
                                itemId={`${item.id}`}
                            />
                        </li>
                        )}
                    </ul>
                </Stack>
                <Stack>
                    {!!tasksFromServer.length &&
                    <>
                        <Pagination
                            sx={{marginX: 'auto'}}
                            count={pageQty}
                            page={page}
                            onChange={handleOnChangePage}
                        />
                        <div>
                            {[2, 4, 6].map((val) => (
                            <ButtonPages
                                key={val}
                                $active={limit === val}
                                onClick={() => setLimit(val)}
                            >
                                {val}
                            </ButtonPages>
                            ))}
                        </div>
                    </>
                    }
                </Stack>
            </>}
        </>}
    </>
    );
};