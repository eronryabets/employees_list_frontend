import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import api from '../api/api';
import {extractLocalEmployees} from '../utils/extract-local-employees';
import {LocalEmployee} from '../types';
import {BASE_URL_EMP} from "../config";

// Thunk для получения списка сотрудников
export const fetchEmployees = createAsyncThunk(
    'employees/fetchEmployees',
    async ({page = 1, search = '', age = false, rating = false}:
               { page?: number, search?: string, age?: boolean, rating?: boolean },
           {rejectWithValue}) => {
        try {
            const searchParam = search ? `&search=${search}` : '';
            const ageParam = age ? `&sort_by=age` : '';
            const ratingParam = rating ? `&sort_by=rating` : '';
            const response =
                await api.get(`${BASE_URL_EMP}?page=${page}${searchParam}${ageParam}${ratingParam}`);
            return response.data;
        } catch (error) {
            return rejectWithValue('Failed to fetch employees');
        }
    }
);

interface EmployeeState {
    employees: LocalEmployee[];
    currentPage: number;
    totalCount: number;
    nextPageUrl: string | null;
    searchText: string;
    ageFlag: boolean;
    ratingFlag: boolean;
    hasError: boolean;
    loading: boolean;
}

const initialState: EmployeeState = {
    employees: [],
    currentPage: 1,
    totalCount: 0,
    nextPageUrl: null,
    searchText: '',
    ageFlag: false,
    ratingFlag: false,
    hasError: false,
    loading: false,
};



const paginationSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        toggleAgeFlag: (state) => {
            state.ageFlag = !state.ageFlag;
        },
        toggleRatingFlag: (state) => {
            state.ratingFlag = !state.ratingFlag;
        },
        resetFilters: (state) => {
            state.searchText = '';
            state.ageFlag = false;
            state.ratingFlag = false;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setSearchText: (state, action: PayloadAction<string>) => {
            state.searchText = action.payload;
        },
        setHasError(state, action: PayloadAction<boolean>) {
            state.hasError = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
                state.hasError = false;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                const localEmployees = extractLocalEmployees(action.payload.results);
                state.employees = localEmployees;
                state.totalCount = action.payload.count;
                state.nextPageUrl = action.payload.next; // Здесь обновляем nextPageUrl
                state.hasError = localEmployees.length === 0 && state.searchText !== '';
            })
            .addCase(fetchEmployees.rejected, (state) => {
                state.loading = false;
                state.hasError = true;
            });
    },
});

export const {
    toggleAgeFlag,
    toggleRatingFlag,
    resetFilters,
    setCurrentPage,
    setSearchText,
    setHasError,
} = paginationSlice.actions;

export default paginationSlice.reducer;
