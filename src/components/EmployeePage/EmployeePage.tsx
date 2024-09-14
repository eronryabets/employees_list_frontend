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
    const [ageFlag, setAgeFlag] = useState<boolean>(false)
    const [ratingFlag, setRatingFlag] = useState<boolean>(false)

    const fetchEmployees = async (page = 1,
                                  search = '',
                                  age = false,
                                  rating = false) => {
        try {
            const searchParam = search ? `&search=${search}` : '';
            const ageParam = age ? `&sort_by=age` : '';
            const ratingParam = rating ? `&sort_by=rating` : '';
            const res = await fetch(`${BASE_URL_EMP}?page=
            ${page}
            ${searchParam}
            ${ageParam}
            ${ratingParam}`);
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
        fetchEmployees(currentPage, searchText, ageFlag, ratingFlag);
    }, [currentPage, searchText, ageFlag, ratingFlag]);

    useEffect(() => {
        // Сбрасываем поиск при переходе на главную страницу
        if (location.pathname === '/') {
            resetSearch(); // Сбрасываем поиск
            resetAgeSort(); //Сбрасываем сортировку по возрасту
            resetRatingSort(); //Сбрасываем сортировку по рейтингу
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

    const handleAgeSort = () => {
        setAgeFlag(!ageFlag);
    }

    const resetAgeSort = () => {
        setAgeFlag(false);
    }

    const handleRatingSort = () => {
        setRatingFlag(!ratingFlag);
    }

    const resetRatingSort = () => {
        setRatingFlag(false);
    }

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
                    <SortingOptions ageSort={handleAgeSort}
                                    ratingSort={handleRatingSort}
                                    ageFlag={ageFlag}
                                    ratingFlag={ratingFlag}/>
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