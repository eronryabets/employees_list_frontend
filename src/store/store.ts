
import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../slices/employeeSlice';
import paginationReducer from '../slices/paginationSlice';
import formEmployee from '../slices/formEmployeeSlice';
import {useDispatch} from "react-redux";

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    pagination: paginationReducer,
    formEmployee: formEmployee,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();