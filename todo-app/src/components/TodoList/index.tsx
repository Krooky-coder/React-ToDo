import  type TodoItem  from '../../TodoItem'
import useLocalStorage from '../../utils/localStorage';
import { Button, ContainerSort, ListSpan } from './style'
import EditTodo from '../EditTodo/index'

interface TodoListProps {
    setValue: (newValue: TodoItem[]) => void
}

export default function TodoList ({ setValue }: TodoListProps) {
    const tasks = useLocalStorage<TodoItem[]>('Tasks', []).initialValue;
    const { initialValue, setStoredValue} = useLocalStorage<'new'|'old'>('SortType', 'new')

    const handleClickSetDone = (itemId: string) => {
        const newDone = tasks.map(item => 
            item.id === itemId ? { ...item, status: !item.status } : item
        );
        setValue(newDone);
    }

    const handleClickDelete = (itemId: string) => {
        const newTasks = tasks.filter(item => item.id !== itemId);
        setValue(newTasks);
    }

    const handleClickSort = () => {
        setStoredValue(initialValue === 'new' ? 'old' : 'new')
        const newDone = [...tasks]
        newDone.sort((a: TodoItem, b: TodoItem) => {
            const timeA = new Date(a.date).getTime()
            const timeB = new Date(b.date).getTime()
            return timeA > timeB ? timeB - timeA : timeA - timeB
        })
        setValue(newDone)
    } 
    
        return (
        <>  
            <ContainerSort>
                {tasks.length < 2 ? null : <><span>Sort: { initialValue }</span> 
                <Button onClick={handleClickSort}>⏰</Button></>}
            </ContainerSort>
            <ul>
                {tasks.map((item: TodoItem) =>
                <li key={item.id} id={item.id}>
                    <ListSpan status={item.status}>{item.text}</ListSpan>
                    <Button onClick={() => handleClickSetDone(item.id)}>
                        {item.status ? '✅' : '❌'}
                    </Button>
                    <Button onClick={() => handleClickDelete(item.id)}>delete</Button>
                    <EditTodo 
                        itemId={item.id}
                        setValue={setValue}
                    />
                </li>
                )}
            </ul>
        </>
    )
}