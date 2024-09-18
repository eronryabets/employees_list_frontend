
import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../slices/employeeSlice';
import paginationReducer from '../slices/paginationSlice';
import formEmployeeReducer from '../slices/formEmployeeSlice';
import authReducer from '../slices/authSlice';

import {useDispatch} from "react-redux";

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    pagination: paginationReducer,
    formEmployee: formEmployeeReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();