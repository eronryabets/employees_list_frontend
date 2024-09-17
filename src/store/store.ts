
import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../slices/employeeSlice';
import paginationReducer from '../slices/paginationSlice';

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    pagination: paginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
