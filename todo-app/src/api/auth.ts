import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:3001';

interface RegisterParams { 
    email: string;
    password: string;
    age?: number;
}

interface RegisterResponse {
    accessToken: string;
    refreshToken: string;
}

export const fetchRegister = createAsyncThunk<
    RegisterResponse,
    RegisterParams
>(
    `auth/register`,
    async ({email, password, age}, _) => {
        const response = await axios.post(`${API_URL}/auth/register`, { email, password, age });
        return response.data
    }    
)


interface LoginParams { 
    email: string;
    password: string;
    age?: number;
}

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export const fetchLogin = createAsyncThunk<
    LoginResponse,
    LoginParams
>(
    `auth/login`,
    async ({email, password, age}, _) => {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password, age });
        return response.data
    }    
)

interface RefreshParams {
    refreshToken: string;
}

interface RefreshResponse {
    accessToken: string;
}

export const fetchRefresh = createAsyncThunk<
    RefreshResponse,
    RefreshParams
>(
    `auth/refresh`,
    async ({ refreshToken }, _) => {
        const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
        return response.data
    }    
)
