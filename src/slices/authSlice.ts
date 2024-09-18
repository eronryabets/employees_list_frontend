import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ACCOUNT_URL } from '../config';

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    username: string | null;
    email: string | null;
    role: string | null;
    errorMessage: string;
}

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
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
            const response = await axios.post(`${ACCOUNT_URL}login/`, userData);
            const { access, refresh } = response.data;
            // Сохраняем токены в localStorage
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);
            // перенаправляем на главную страницу
            window.location.href = '/';
            return { access, refresh };
        } catch (error: any) {
            return rejectWithValue('Login failed, please try again.');
        }
    }
);

// Асинхронный thunk для получения данных профиля
export const fetchProfile = createAsyncThunk(
    'auth/fetchProfile',
    async (_, { getState, rejectWithValue }) => {
        const state = getState() as { auth: AuthState };
        const accessToken = state.auth.accessToken;

        try {
            const response = await axios.get(`${ACCOUNT_URL}profile/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const { username, email, role } = response.data;
            return { username, email, role };
        } catch (error: any) {
            return rejectWithValue('Failed to fetch profile data.');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.username = null;
            state.email = null;
            state.role = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        },
    },
    extraReducers: (builder) => {
        // Обработка логина
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.errorMessage = '';
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.accessToken = action.payload.access;
            state.refreshToken = action.payload.refresh;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload as string;
        });

        // Обработка профиля
        builder.addCase(fetchProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.role = action.payload.role;
        });
        builder.addCase(fetchProfile.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload as string;
        });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;