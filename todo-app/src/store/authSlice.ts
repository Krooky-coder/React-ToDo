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
    refreshToken: string | null;
    user: User | null;
    token: string | null;
    status: 'idle' | 'loading' | 'failed' | 'successful';
    errorMessage?: string; 
}

const initialState: AuthState = {
    refreshToken: null,
    user: null,
    token: null,
    status: 'idle',
    errorMessage: undefined,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser(state) {
            state.user = null,
            state.token = null,
            state.refreshToken = null,
            state.status = 'idle';
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
                if ( action.payload === 'Ошибка сервера' ) {
                    state.errorMessage = 'Ошибка сервера'
                }
                if ( action.payload === 'Ошибка авторизации' ) {
                    state.errorMessage = 'Ошибка авторизации'
                    state.token = null;
                }
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                if ( action.payload === 'Ошибка сервера' ) {
                    state.errorMessage = action.payload
                }
                if ( action.payload === 'Ошибка авторизации' ) {
                    state.errorMessage = action.payload
                    state.token = null;
                }
            })
            .addCase(fetchTodos.fulfilled, (state) => {
                state.status = 'successful';
                }
            )
            .addCase(fetchRegister.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.status = 'successful';
                state.token = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.status = 'failed';
                state.errorMessage = 'E-mail or Password wrong';
            })
            .addCase(fetchLogin.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.status = 'successful';
                state.token = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
            })
            .addCase(fetchLogin.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchRefresh.fulfilled, (state, action) => {
                state.token = action.payload.accessToken;
                state.token = action.payload.refreshToken;
            })
            .addCase(fetchRefresh.rejected, (state, action) => {
                state.errorMessage = action.payload;
            })
            .addCase(ChangePass.rejected, (state, action) => {
                state.status = 'failed';
                state.errorMessage = action.payload;
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