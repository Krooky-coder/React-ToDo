import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type TodoItem from '../TodoItem';

const API_URL = 'http://localhost:3001';

interface FetchTodosParams {
  page: number;
  limit: number;
};

interface ResponseFetchItem {
  data: TodoItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export const fetchTodos = createAsyncThunk<
  ResponseFetchItem,
  FetchTodosParams,
  { rejectValue: string}
>(
  'todos/fetchTodos',
  async ({page, limit}, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/todos?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return thunkAPI.rejectWithValue('Ошибка');
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
};

export const postTodos = createAsyncThunk<
  TodoItem,
  PostTodosParams
>(
  'todos/postTodos',
  async (text, _) => {
    const response = await axios.post(`${API_URL}/todos`, text);
    return response.data;
  }
);

interface PutTodosParams {
  id: string,
  text: string,
  completed?: boolean,
};

export const putTodos = createAsyncThunk<
  TodoItem,
  PutTodosParams
>(
  `todos/putTodos`,
  async ({ id, text, completed }, _) => {
    const response = await axios.put(`${API_URL}/todos/${id}`, { text, completed });
    return response.data;
  }
);

interface DeleteTodosParams {
  id: string
};

export const deleteTodos = createAsyncThunk<
  number,
  DeleteTodosParams
>(
  `todos/deleteTodos`,
  async ({ id }, _) => {
    const response = await axios.delete(`${API_URL}/todos/${id}`);
    return response.status;
  }
);

interface PatchTodosParams {
  id: string, 
  completed: boolean,
};

export const patchTodos = createAsyncThunk<
  unknown,
  PatchTodosParams
>(
  `todos/patchTodos`,
  async ({ id, completed}, _) => {
    const response = await axios.patch(`${API_URL}/todos/${id}/toggle`, { completed });
    return response.status;
  }
);