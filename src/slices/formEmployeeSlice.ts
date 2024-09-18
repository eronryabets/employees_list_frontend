import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import api from '../api/api';



interface FormAddEmployeeState {
    employeeData: {
        [key: string]: string | number | File; // Добавляем индексный сигнатурный тип
        first_name: string;
        last_name: string;
        date_of_birth: string;
        age: number;
        position: string;
        profession: string;
        years_worked: number;
        phone_number: string;
        email: string;
        facebook_link: string;
        avatar: string | File;
        rating: number;
    };
    formError: { [key: string]: string[] };
    successMessage: boolean;
    loading: boolean;
}

const initialState: FormAddEmployeeState = {
    employeeData: {
        first_name: '',
        last_name: '',
        date_of_birth: '',
        age: 0,
        position: '',
        profession: '',
        years_worked: 0,
        phone_number: '',
        email: '',
        facebook_link: '',
        avatar: '',
        rating: 0,
    },
    formError: {},
    successMessage: false,
    loading: false,
};

// Thunk для добавления нового сотрудника
export const addNewEmployee = createAsyncThunk(
    'formEmployee/addNewEmployee',
    async (employeeData: any, {rejectWithValue}) => {
        try {
            const formData = new FormData();
            for (const key in employeeData) {
                formData.append(key, employeeData[key]);
            }

            const response = await api.post('/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data && response.data.errors) {
                return rejectWithValue(response.data.errors);
            }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data || 'Failed to add employee');
        }
    }
);

const formEmployeeSlice = createSlice({
    name: 'formEmployee',
    initialState,
    reducers: {
        setEmployeeField: (state, action: PayloadAction<{ name: string; value: any }>) => {
            state.employeeData[action.payload.name] = action.payload.value;
        },
        clearFormError: (state) => {
            state.formError = {};
        },
        resetForm: (state) => {
            state.employeeData = initialState.employeeData;
            state.successMessage = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewEmployee.pending, (state) => {
                state.loading = true;
                state.formError = {};
                state.successMessage = false;
            })
            .addCase(addNewEmployee.fulfilled, (state) => {
                state.loading = false;
                state.successMessage = true;
            })
            .addCase(addNewEmployee.rejected, (state, action) => {
                state.loading = false;
                state.formError = action.payload as { [key: string]: string[] };
                state.successMessage = false;
            });
    },
});

export const {setEmployeeField, clearFormError, resetForm} = formEmployeeSlice.actions;
export default formEmployeeSlice.reducer;
