import { createSlice } from '@reduxjs/toolkit'
import type TodoItem from '../TodoItem'
import { fetchTodos, postTodos } from '../api/todos';

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
    reducers: {},
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
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload;
                } else {
                    state.error = action.error.message || 'Произошла ошибка';
                }
                state.onLoading = false;
            })
    }
})

export default todoSlice.reducer;

