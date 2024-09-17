import {ReactComponent as SearchIcon} from 'assets/icon-search.svg';
import styles from './Search.module.scss';
import React, {useEffect, useState} from "react";
import {Button} from "../Button";
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {setSearchText, setHasError} from '../../slices/paginationSlice';

export const Search = () => {
    const dispatch = useDispatch();

    // Локальное состояние для строки поиска
    const [localSearchText, setLocalSearchText] = useState('');

    // Получаем строку поиска из Redux
    const savedSearchText = useSelector((state: RootState) =>
        state.pagination.searchText
    );

    // Инициализируем локальное состояние значением из Redux при загрузке компонента
    useEffect(() => {
        setLocalSearchText(savedSearchText);
    }, [savedSearchText]);

    const hasError = useSelector((state: RootState) =>
        state.pagination.hasError);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (localSearchText.trim()) {
            dispatch(setSearchText(localSearchText)); // Обновляем Redux только при нажатии "Search"
            dispatch(setHasError(false)); // Сбрасываем ошибку
        } else {
            dispatch(setHasError(true)); // Устанавливаем ошибку, если строка пустая
        }
    };

    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <div className={styles.search}>
                <label htmlFor="search" className={styles.label}>
                    <SearchIcon/> {/* Иконка поиска */}
                </label>
                <input
                    type="text"
                    className={styles.textField}
                    id="search"
                    name="search"
                    value={localSearchText}
                    onChange={(e) => setLocalSearchText(e.target.value)} // Обновляем локальное состояние
                    placeholder="Search Employees"
                />
                {hasError && (
                    <div className={styles.error}>
                        No result
                    </div>
                )}
                <Button>Search</Button>
            </div>
        </form>
    );
};
