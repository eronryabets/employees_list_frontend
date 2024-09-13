import React, {useState, useEffect} from 'react';
import {Container} from "./components/Container";
import {EmployeeCardList} from "./components/EmployeeCard";
import {FormNewEmployee} from "./components/FormNewEmployee"; // Импортируем компонент
import {LocalEmployee} from "./types";
import {extractLocalEmployees} from "./utils/extract-local-employees";
import {Spinner} from "./components/Spinner";
import {SimpleNavbar} from "./components/SimpleNavbar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Search} from "./components/Search";
import {PaginationControls} from "./components/PaginationControls"; // Импортируем роутинг


const BASE_URL = 'http://localhost:8005/api/employee/';

function App() {
    const [employees, setEmployees]
        = useState<LocalEmployee[]>([]);
    const [formError, setFormError]
        = useState<{ [key: string]: string[] }>({});
    const [successMessage, setSuccessMessage]
        = useState<boolean>(false);
    const [currentPage, setCurrentPage]
        = useState<number>(1); // Стартуем с первой страницы
    const [totalCount, setTotalCount]
        = useState<number>(0);
    const [nextPageUrl, setNextPageUrl]
        = useState<string | null>(null);
    const [searchText, setSearchText]
        = useState<string>('');
    const [hasError, setHasError]
        = useState<boolean>(false);

    const fetchEmployees = async (page = 1, search = '') => {
        try {
            const searchParam = search ? `&search=${search}` : '';
            const res = await fetch(`${BASE_URL}?page=${page}${searchParam}`);
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
        fetchEmployees(currentPage, searchText);
    }, [currentPage, searchText]);

    const handleRatingSave = () => {
        fetchEmployees();
    };

    const handleEmployeeDelete = (id: number) => {
        setEmployees((prevEmployees) =>
            prevEmployees.filter((employee) => employee.id !== id));
    };

    const handleSearchSubmit = (text: string) => {
        setSearchText(text);
        setCurrentPage(1);
    };

    const addNewEmployee = async (employeeData: any) => {
        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employeeData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setFormError(errorData);
                setSuccessMessage(false);
                return;
            }

            const result = await response.json();
            if (result && result.errors) {
                setFormError(result.errors);
                setSuccessMessage(false);
            } else {
                setFormError({});
                fetchEmployees();
                setSuccessMessage(true);
            }
        } catch (error) {
            console.error('Failed to add employee:', error);
            setFormError({});
            setSuccessMessage(false);
        }
    };

    return (
        <Router>
            <Container>
                <SimpleNavbar/>
                <Routes>
                    <Route
                        path="/"
                        element={
                            employees.length > 0 ? (
                                <>
                                    <Search hasError={hasError} onSubmit={handleSearchSubmit}/>
                                    <PaginationControls
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        nextPageUrl={nextPageUrl}
                                    />
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
                                    <Search hasError={hasError} onSubmit={handleSearchSubmit}/>
                                    <Spinner/>
                                </>
                            )
                        }
                    />
                    <Route path="/add" element={
                        <FormNewEmployee
                            onSubmit={addNewEmployee}
                            formError={formError}
                            successMessage={successMessage}
                        />}/>
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
