import { createSlice } from '@reduxjs/toolkit'
import type TodoItem from '../TodoItem'
import { fetchTodos, patchTodos, postTodos } from '../api/todos';

interface CounterState {
    todos: Array<TodoItem>;
    currentPage: number;
    pages: number;
    error: string;
    onLoading: boolean;
    limit: number;
}

const initialState: CounterState = {
    todos: [],
    currentPage: 1,
    pages:  2,
    limit: 2,
    error: '',
    onLoading: false,
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        switchStatus(state, action) {
        state.todos = state.todos.map((item: TodoItem) => {
            if (`${item.id}` === action.payload.itemId) {
                return { ...item, completed: !item.completed };
            }
                return item;
        });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.onLoading = true
            }) 
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.onLoading = false,
                state.todos = action.payload.data,
                state.pages = action.payload.totalPages,
                state.currentPage = action.payload.page,
                state.limit = action.payload.limit;
                state.error = ``;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload;
                }
                state.onLoading = false;
            })
            .addCase(patchTodos.pending, (state) => {
                state.onLoading = false
            })
            .addCase(postTodos.rejected, (state) => {
                state.error = 'Ошибка авторизации'
            })
    }
})

export const { switchStatus } = todoSlice.actions;
export default todoSlice.reducer;

