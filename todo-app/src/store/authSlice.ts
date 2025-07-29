import { createSlice } from "@reduxjs/toolkit";
import { ChangePass, fetchLogin, fetchProfile, fetchRefresh, fetchRegister } from "../api/auth";
import { fetchTodos } from "../api/todos";

interface User {
    id: number;
    email: string;
    age?: number;
    createdAt: string;
}

interface AuthState {
    isAuth: boolean;
    user: User | null;
    token: string | null;
    refresh: string | null;
    status: 'idle' | 'loading' | 'failed' | 'successful';
 }

const initialState: AuthState = {
    isAuth: false,
    user: null,
    refresh: null,
    token: null,
    status: 'idle'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser(state) {
            state.token = '',
            state.status = 'idle';
            state.isAuth = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.status = 'successful';
                state.user = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.status = 'failed';
                if ( action.payload === 'Ошибка авторизации' ) {
                    state.isAuth = false;
                }
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                if ( action.payload === 'Ошибка авторизации' ) {
                    state.isAuth = false;
                }
            })
            .addCase(fetchRegister.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.status = 'successful';
                state.isAuth = true,
                state.token = action.payload.accessToken;
                state.refresh = action.payload.refreshToken;
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchLogin.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.status = 'successful';
                state.isAuth = true,
                state.token = action.payload.accessToken;
            })
            .addCase(fetchLogin.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchRefresh.fulfilled, (state, action) => {
                state.token = action.payload.accessToken;
            })
            .addCase(ChangePass.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(ChangePass.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(ChangePass.fulfilled, (state) => {
                state.status = 'successful';
            });
    },
})

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;