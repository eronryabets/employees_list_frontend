import { ReactComponent as SearchIcon } from 'assets/icon-search.svg';
import styles from './Search.module.scss';
import React, { useState } from "react";
import { Button } from "../Button";

interface SearchProps {
  hasError: boolean;
  onSubmit: (text: string) => void;
}

type FormFields = {
  username: HTMLInputElement;
}

export const Search = ({ hasError, onSubmit }: SearchProps) => {
  const [searchText, setSearchText]
      = useState('');

   const handleSubmit = (event: React.FormEvent<HTMLFormElement & FormFields>) => {
    event.preventDefault();
    const text = event.currentTarget.username.value;

    if (text.trim()) {
      onSubmit(text);
      // event.currentTarget.reset();
      // setSearchText('');
    }
  };

   return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className={styles.search}>
        <label htmlFor="search" className={styles.label}>
          <SearchIcon />  {/* Иконка поиска */}
        </label>
        <input
          type="text"
          className={styles.textField}
          id="search"
          name="username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
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
