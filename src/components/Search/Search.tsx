import { ReactComponent as SearchIcon } from 'assets/icon-search.svg';
import styles from './Search.module.scss';
import React from "react";
import { Button } from "../Button";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setSearchText, setHasError } from '../../slices/paginationSlice';

export const Search = () => {
  const dispatch = useDispatch();

  const searchText = useSelector((state: RootState) =>
      state.pagination.searchText);

  const hasError = useSelector((state: RootState) =>
      state.pagination.hasError);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = event.currentTarget.search.value;

    if (text.trim()) {
      dispatch(setSearchText(text));
    } else {
      dispatch(setHasError(true)); // Устанавливаем ошибку, если строка пустая
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className={styles.search}>
        <label htmlFor="search" className={styles.label}>
          <SearchIcon /> {/* Иконка поиска */}
        </label>
        <input
          type="text"
          className={styles.textField}
          id="search"
          name="search"
          value={searchText}
          onChange={(e) => dispatch(setSearchText(e.target.value))}
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
