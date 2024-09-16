import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search } from "../Search";
import { EmployeeCardList } from '../EmployeeCard';
import { PaginationControls } from '../PaginationControls';
import { Spinner } from '../Spinner';
import { SortingOptions } from "../SortingOptions";
import styles from './EmployeePage.module.scss';
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'store/store';
import {
  fetchEmployees,
  resetFilters,
  setCurrentPage,
} from '../../slices/employeeSlice';

export const EmployeePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    employees,
    currentPage,
    searchText,
    ageFlag,
    ratingFlag,
    loading,
  } = useSelector((state: RootState) => state.employees);

  const location = useLocation();

  useEffect(() => {
    // Загружаем сотрудников при изменении searchText или currentPage
    dispatch(fetchEmployees({
      page: currentPage,
      search: searchText,
      age: ageFlag, rating:
      ratingFlag }));
  }, [dispatch, currentPage, searchText, ageFlag, ratingFlag]);

  useEffect(() => {
    // Сбрасываем фильтры при переходе на главную страницу
    if (location.pathname === '/') {
      dispatch(resetFilters());
      dispatch(setCurrentPage(1));
    }
  }, [location, dispatch]);


  const handleRatingSave = () => {
    dispatch(fetchEmployees({
      page: currentPage,
      search: searchText,
      age: ageFlag,
      rating: ratingFlag }));
  };


  return (
    <div>
      <Helmet>
        <title>Employee List</title>
      </Helmet>
      <Search/>
      {loading ? (
        <Spinner />
      ) : employees.length > 0 ? (
        <>
          <div className={styles.content}>
            <PaginationControls/>
            <SortingOptions/>
          </div>
          <EmployeeCardList
            employees={employees}
            onRatingSave={handleRatingSave}
          />
          <PaginationControls/>
        </>
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
};
