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

    const fetchEmployees = async (page = 1) => {
        try {
            const res = await fetch(`${BASE_URL}?page=${page}`);
            const apiData = await res.json();
            const localEmployees = extractLocalEmployees(apiData.results);

            setEmployees(localEmployees);
            setTotalCount(apiData.count); // Сохраняем общее количество сотрудников
            setNextPageUrl(apiData.next); // Сохраняем URL следующей страницы (или null)
        } catch (error) {
            console.error('Failed to fetch employees:', error);
        }
    };

    useEffect(() => {
        // Загружаем сотрудников для текущей страницы
        fetchEmployees(currentPage);
        // Запускать при изменении страницы
    }, [currentPage]);

    const handleRatingSave = () => {
        fetchEmployees();
    };

    const handleEmployeeDelete = (id: number) => {
        setEmployees((prevEmployees) =>
            prevEmployees.filter((employee) => employee.id !== id));
    };

    // Функция для добавления нового сотрудника
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
                setFormError(errorData); // Сохраняем ошибки в состоянии
                setSuccessMessage(false); // Сбросить сообщение об успехе при ошибке
                return;
            }

            // Если запрос успешен, но есть ошибки валидации
            const result = await response.json();
            if (result && result.errors) {
                setFormError(result.errors); // Сохраняем ошибки в состоянии
                setSuccessMessage(false); // Сбросить сообщение об успехе
            } else {
                // Если всё прошло успешно, обновляем список сотрудников и показываем сообщение об успехе
                setFormError({});
                fetchEmployees();
                setSuccessMessage(true); // Установить сообщение об успехе
            }
        } catch (error) {
            console.error('Failed to add employee:', error);
            setFormError({});
            setSuccessMessage(false); // Сбросить сообщение об успехе при ошибке
        }
    };

    return (
        <Router> {/* Добавляем роутер */}
            <Container>
                <SimpleNavbar/>
                <Search hasError={true} onSubmit={() => {
                }}/>
                <PaginationControls
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        nextPageUrl={nextPageUrl}
                                    />
                <Routes> {/* Добавляем маршруты */}
                    <Route
                        path="/"
                        element={
                            employees.length > 0 ? (
                                <>
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
                                <Spinner/>
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
