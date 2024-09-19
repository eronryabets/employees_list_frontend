import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api/api';
import { LocalEmployee } from '../types';
import { RootState } from 'store/store';
import {BASE_URL_EMP} from "../config"; // предположим, что у вас есть RootState

// Thunk для обновления рейтинга сотрудника
export const updateEmployeeRating = createAsyncThunk(
  'employees/updateRating',
  async ({ id, rating }: { id: number, rating: number }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${BASE_URL_EMP}${id}/`, { rating });
      if (response.status !== 200) {
        throw new Error('Failed to update rating');
      }
      return { id, rating };
    } catch (error) {
      return rejectWithValue('Failed to update rating');
    }
  }
);


// Thunk для удаления сотрудника
export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployee',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${BASE_URL_EMP}${id}/`);
      if (response.status !== 204) {
        throw new Error('Failed to delete employee');
      }
      return id;
    } catch (error) {
      return rejectWithValue('Failed to delete employee');
    }
  }
);

interface EmployeeState {
  employees: LocalEmployee[];
  loading: boolean;
  hasError: boolean;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  hasError: false,
};

export const selectEmployeeById = (state: RootState, id: number) =>
  state.employee.employees.find(employee => employee.id === id);

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateEmployeeRating.fulfilled, (state, action:
          PayloadAction<{ id: number, rating: number }>) => {
        const index = state.employees.findIndex(emp => emp.id === action.payload.id);
        if (index !== -1) {
          state.employees[index].rating = action.payload.rating;
        }
      })
      .addCase(deleteEmployee.fulfilled, (state, action: PayloadAction<number>) => {
        state.employees = state.employees.filter(emp => emp.id !== action.payload);
      })
      .addCase(updateEmployeeRating.rejected, (state) => {
        state.hasError = true;
      })
      .addCase(deleteEmployee.rejected, (state) => {
        state.hasError = true;
      });
  },
});


export default employeeSlice.reducer;
