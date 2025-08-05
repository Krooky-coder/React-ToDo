import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type TodoItem from '../TodoItem';

const API_URL = 'http://localhost:3001';

interface FetchTodosParams {
  page: number;
  limit: number;
  accessToken: string;
};

interface ResponseFetchItem {
  data: TodoItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  accessToken: null
};

export const fetchTodos = createAsyncThunk<
  ResponseFetchItem,
  FetchTodosParams,
  { rejectValue: string}
>(
  'todos/fetchTodos',
  async ({page, limit, accessToken}, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/todos?page=${page}&limit=${limit}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
    });
    return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            return thunkAPI.rejectWithValue('Ошибка авторизации');
          }
          return thunkAPI.rejectWithValue('Ошибка сервера');
        } else {
          return thunkAPI.rejectWithValue('Ошибка при загрузке задач');
        }
      } else {
        return thunkAPI.rejectWithValue('Произошла непредвиденная ошибка');
      };
    };
  }
);

interface PostTodosParams {
  text: string;
  accessToken:string;
};

export const postTodos = createAsyncThunk<
  TodoItem,
  PostTodosParams
>(
  'todos/postTodos',
  async ({ text, accessToken}, _) => {
    const response = await axios.post(`${API_URL}/todos`,
      { text },
      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
      });
    return response.data;
  }
);

interface PutTodosParams {
  accessToken: string,
  id: string,
  text: string,
  completed?: boolean,
};

export const putTodos = createAsyncThunk<
  TodoItem,
  PutTodosParams
>(
  `todos/putTodos`,
  async ({ id, text, completed, accessToken }, _) => {
    const response = await axios.put(`${API_URL}/todos/${id}`, 
      { text, completed },
      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
      });
    return response.data;
  }
);

interface DeleteTodosParams {
  accessToken: string,
  id: string
};

export const deleteTodos = createAsyncThunk<
  number,
  DeleteTodosParams
>(
  `todos/deleteTodos`,
  async ({ id, accessToken }, _) => {
    const response = await axios.delete(`${API_URL}/todos/${id}`, 
      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
      }
    );
    return response.status;
  }
);

interface PatchTodosParams {
  accessToken: string,
  id: string, 
  completed: boolean,
};

export const patchTodos = createAsyncThunk<
  unknown,
  PatchTodosParams
>(
  `todos/patchTodos`,
  async ({ id, completed, accessToken}, _) => {
    const response = await axios.patch(`${API_URL}/todos/${id}/toggle`,
      { completed },
      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
      });
    return response.status;
  }
);