import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Search} from "../Search";
import {EmployeeCardList} from '../EmployeeCard';
import {PaginationControls} from '../PaginationControls';
import {Spinner} from '../Spinner';
import {extractLocalEmployees} from "../../utils/extract-local-employees";
import {LocalEmployee} from "../../types";
import {BASE_URL_EMP} from "../../config";
import {SortingOptions} from "../SortingOptions";
import styles from './EmployeePage.module.scss'


export const EmployeePage = () => {
    const [employees, setEmployees] = useState<LocalEmployee[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
    const [searchText, setSearchText] = useState<string>('');
    const [hasError, setHasError] = useState<boolean>(false);
    const location = useLocation();

    const fetchEmployees = async (page = 1, search = '') => {
        try {
            const searchParam = search ? `&search=${search}` : '';
            const res = await fetch(`${BASE_URL_EMP}?page=${page}${searchParam}`);
            const apiData = await res.json();

            if (apiData.results.length === 0 && search) {
                setHasError(true);
            } else {
                setHasError(false);
            }

            const localEmployees = extractLocalEmployees(apiData.results);
            setEmployees(localEmployees);
            setTotalCount(apiData.count);
            setNextPageUrl(apiData.next);
        } catch (error) {
            console.error('Failed to fetch employees:', error);
        }
    };

    useEffect(() => {
        // Загружаем сотрудников при изменении searchText или currentPage
        fetchEmployees(currentPage, searchText);
    }, [currentPage, searchText]);

    useEffect(() => {
        // Сбрасываем поиск при переходе на главную страницу
        if (location.pathname === '/') {
            resetSearch(); // Сбрасываем поиск
        }
    }, [location]);

    const handleSearchSubmit = (text: string) => {
        setSearchText(text);
        setCurrentPage(1);
    };

    const resetSearch = () => {
        setSearchText(''); // Сброс текста поиска
        setCurrentPage(1); // Сбрасываем страницу на первую
    };

    const handleRatingSave = () => {
        fetchEmployees();
    };

    const handleEmployeeDelete = (id: number) => {
        setEmployees((prevEmployees) =>
            prevEmployees.filter((employee) => employee.id !== id));
    };

    return (
        <div>
            <Search hasError={hasError} onSubmit={handleSearchSubmit}/>
            {employees.length > 0 ? (
                <>

                    <div className={styles.content}>
                      <PaginationControls
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        nextPageUrl={nextPageUrl}
                    />
                    <SortingOptions/>
                    </div>

                    <EmployeeCardList
                        employees={employees}
                        onRatingSave={handleRatingSave}
                        onEmployeeDelete={handleEmployeeDelete}
                    />
                    <PaginationControls
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        nextPageUrl={nextPageUrl}
                    />
                </>
                ) : (
                <>
                    <Spinner/>
                    {hasError && <p>No employees found.</p>}
                </>
                )}
                </div>
            );
            };