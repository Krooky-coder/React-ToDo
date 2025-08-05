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
        console.log(response)
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
    async ({email, password}, _) => {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
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
    RefreshParams,
    { rejectValue: string}
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
    ChangePassParams
> (
    'auth/change-password',
    async ({ oldPassword, newPassword, accessToken}, _) => {
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
    }
);