import { configureStore, combineReducers } from '@reduxjs/toolkit';
import employeeReducer from '../slices/employeeSlice';
import paginationReducer from '../slices/paginationSlice';
import formEmployeeReducer from '../slices/formEmployeeSlice';
import authReducer from '../slices/authSlice';
import { persistStore, persistReducer } from 'redux-persist';
// По умолчанию используется localStorage для веба
import storage from 'redux-persist/lib/storage';
import { useDispatch } from 'react-redux';

// Конфигурация для Redux Persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Указываем, какие редюсеры сохранять
};

// Комбинируем все редюсеры
const rootReducer = combineReducers({
  employee: employeeReducer,
  pagination: paginationReducer,
  formEmployee: formEmployeeReducer,
  auth: authReducer, // auth будет сохраняться в localStorage
});

// Оборачиваем rootReducer с помощью persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Создаем стор
export const store = configureStore({
  reducer: persistedReducer,
});

// Создаем persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
