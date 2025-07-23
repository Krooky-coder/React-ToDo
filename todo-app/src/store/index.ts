import { configureStore } from "@reduxjs/toolkit";
import todoReduser from './todoSlice';
import authReduser from './authSlice'

export const store = configureStore({
    reducer: {
        todos: todoReduser,
        auth: authReduser,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;