import  type TodoItem  from '../../TodoItem'
import { Button, ContainerSort, ListSpan } from './style'
import EditTodo from '../EditTodo/index'
import { useEffect, useState } from 'react';

interface TodoListProps {
    sort: string
    setSort: (newValue: "new" | "old") => void
    values: TodoItem[]
    setValue: (newValue: TodoItem[]) => void
}

export default function TodoList ({ setValue, values, sort, setSort }: TodoListProps) {
    const handleClickSetDone = (itemId: string) => {
        const newDone = values.map(item => 
            item.id === itemId ? { ...item, status: !item.status } : item
        );
        setValue(newDone);
    }

    const handleClickDelete = (itemId: string) => {
        const newTasks = values.filter(item => item.id !== itemId);
        setValue(newTasks);
    }

    const handleClickSort = () => {
        setSort(sort === 'new' ? 'old' : 'new')
        const newDone = [...values]
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
                {values.length < 2 ? null : <><span>Sort: { sort }</span> 
                <Button onClick={handleClickSort}>⏰</Button></>}
            </ContainerSort>
            <ul>
                {values.map((item: TodoItem) =>
                <li key={item.id} id={item.id}>
                    <ListSpan status={item.status}>{item.text}</ListSpan>
                    <Button onClick={() => handleClickSetDone(item.id)}>
                        {item.status ? '✅' : '❌'}
                    </Button>
                    <Button onClick={() => handleClickDelete(item.id)}>delete</Button>
                    <EditTodo 
                        itemId={item.id}
                        setValue={setValue}
                        values={values}
                    />
                </li>
                )}
            </ul>
        </>
    )
}