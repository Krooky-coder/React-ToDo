import { createSlice } from "@reduxjs/toolkit";
import { fetchLogin, fetchRefresh, fetchRegister } from "../api/auth";

interface AuthState {
   user: {
     id: number;
     email: string;
     age?: number;
   } | null;
   token: string | null;
   status: 'idle' | 'loading' | 'failed' | 'successful';
 }

const initialState: AuthState = {
    user: null,
    token: null,
    status: 'idle'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRegister.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.status = 'successful'
                state.token = action.payload.accessToken
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(fetchLogin.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.status = 'successful'
                state.token = action.payload.accessToken
            })
            .addCase(fetchLogin.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(fetchRefresh.fulfilled, (state, action) => {
                state.token = action.payload.accessToken
            })
    },
})


export default authSlice.reducer;