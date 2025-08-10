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
    RegisterParams,
    { rejectValue: string }
>(
    `auth/register`,
    async ({email, password, age}, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, { email, password, age });
            return response.data
        }   catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    return thunkAPI.rejectWithValue(err.response.data.error || err.message);
                }
                return thunkAPI.rejectWithValue(err.message);
            }
            return thunkAPI.rejectWithValue('Unknown error occurred');
        }
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
    LoginParams,
    { rejectValue: string }
>(
    `auth/login`,
    async ({email, password}, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });
            return response.data
        }   catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    return thunkAPI.rejectWithValue(err.response.data.error || err.message);
                }
                return thunkAPI.rejectWithValue(err.message);
            }
            return thunkAPI.rejectWithValue('Unknown error occurred');
        }
    }    
)

interface RefreshParams {
    refreshToken: string;
}

interface RefreshResponse {
    accessToken: string;
    refreshToken: string;
}

export const fetchRefresh = createAsyncThunk<
    RefreshResponse,
    RefreshParams,
    { rejectValue: string }
>(
    `auth/refresh`,
    async ({ refreshToken }, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
            return response.data
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data?.errorMessage)
            }
            return thunkAPI.rejectWithValue("Unknown error")
        }
    }    
)

interface ProfileParams {
    accessToken: string;
}

interface ProfileResponse {
    id: number,
    email: string,
    age: number,
    createdAt: string,
}

export const fetchProfile = createAsyncThunk<
    ProfileResponse,
    ProfileParams,
    { rejectValue: string}
> (
    'auth/me',
    async ({ accessToken }, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/auth/me`, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    } 
                }
            )
            return response.data;
        }
        catch (error) {
           if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status === 401) {
                    return thunkAPI.rejectWithValue('Ошибка авторизации');
                    }
                    if (error.response.status === 500) {
                        return thunkAPI.rejectWithValue('Ошибка сервера');
                    }
                }   else {
                return thunkAPI.rejectWithValue('Произошла непредвиденная ошибка');
                };
            } 
        }
    }
);

interface ChangePassParams {
    accessToken: string;
    oldPassword: string;
    newPassword: string;
}

export const ChangePass = createAsyncThunk<
    any,
    ChangePassParams,
    { rejectValue: string}
> (
    'auth/change-password',
    async ({ oldPassword, newPassword, accessToken}, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/auth/change-password`, 
                { 
                    oldPassword,
                    newPassword,
                },
                {
                    headers: {
                        'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${accessToken}`
                    } 
                }
            )
            return response.data;
        }   catch (err) {
                if (axios.isAxiosError(err)) {
                    if (err.response) {
                    return thunkAPI.rejectWithValue(err.response.data.error || err.message);
                    }
                    return thunkAPI.rejectWithValue(err.message);
                }
                return thunkAPI.rejectWithValue('Unknown error occurred');
            }
    }
);