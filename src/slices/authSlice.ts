import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ACCOUNT_URL } from '../config';
import api from "../api/api";

interface AuthState {
    isAuthenticated: boolean;
    loading: boolean;
    username: string | null;
    email: string | null;
    role: string | null;
    errorMessage: string;
}

const initialState: AuthState = {
    isAuthenticated: false,
    loading: false,
    username: null,
    email: null,
    role: null,
    errorMessage: '',
};

// Асинхронный thunk для логина
export const login = createAsyncThunk(
    'auth/login',
    async (userData: { username: string; password: string }, { rejectWithValue }) => {
        try {
            // Отправляем запрос на логин
            await axios.post(`${ACCOUNT_URL}login/`, userData, {
                withCredentials: true, // Включаем cookie в запросе
            });
            return true; // Возвращаем признак успешного логина
        } catch (error: any) {
            return rejectWithValue('Login failed, please try again.');
        }
    }
);

// Асинхронный thunk для получения данных профиля
export const fetchProfile = createAsyncThunk(
    'auth/fetchProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`${ACCOUNT_URL}profile/`, {
            });
            const { username, email, role } = response.data;
            return { username, email, role };
        } catch (error: any) {
            return rejectWithValue('Failed to fetch profile data.');
        }
    }
);

// Асинхронный thunk для логаута
export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            // Отправляем запрос на логаут (cookies автоматически отправятся)
            await api.post(`${ACCOUNT_URL}logout/`, {}, {
            });

            // После успешного логаута очищаем Redux store
            dispatch(clearAuth());
        } catch (error: any) {
            return rejectWithValue('Logout failed.');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearAuth: (state) => {
            state.isAuthenticated = false;
            state.username = null;
            state.email = null;
            state.role = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.errorMessage = '';
        });
        builder.addCase(login.fulfilled, (state) => {
            state.loading = false;
            state.isAuthenticated = true; // Аутентификация прошла успешно
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload as string;
        });

        builder.addCase(fetchProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.role = action.payload.role;
            // Пользователь аутентифицирован, если профиль успешно получен
            state.isAuthenticated = true;
        });
        builder.addCase(fetchProfile.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload as string;
            // Если не удалось получить профиль, сбрасываем авторизацию
            state.isAuthenticated = false;
        });

        builder.addCase(logout.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.username = null;
            state.email = null;
            state.role = null;
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload as string;
        });
    },
});

export const { clearAuth } = authSlice.actions;

export default authSlice.reducer;
