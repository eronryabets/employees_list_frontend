import React, {useState, useEffect} from 'react';
import {Container} from "./components/Container";
import {TheHeader} from "./components/TheHeader";
import {EmployeeCardList} from "./components/EmployeeCard";
import {FormNewEmployee} from "./components/FormNewEmployee"; // Импортируем компонент
import {LocalEmployee} from "./types";
import {extractLocalEmployees} from "./utils/extract-local-employees";
import {Spinner} from "./components/Spinner";
import {SimpleNavbar} from "./components/SimpleNavbar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; // Импортируем роутинг


const BASE_URL = 'http://localhost:8005/api/employee/';

function App() {
    const [employees, setEmployees] = useState<LocalEmployee[]>([]);

    const fetchEmployees = async () => {
        try {
            const res = await fetch(BASE_URL);
            const apiEmployees = await res.json();
            const localEmployees = extractLocalEmployees(apiEmployees);
            setEmployees(localEmployees);
        } catch (error) {
            console.error('Failed to fetch employees:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleRatingSave = () => {
        fetchEmployees();
    };

    const handleEmployeeDelete = (id: number) => {
        setEmployees((prevEmployees) =>
            prevEmployees.filter((employee) => employee.id !== id));
    };

     // Функция для добавления нового сотрудника
    const addEmployee = async (employeeData: LocalEmployee) => {
        try {
            const res = await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employeeData),
            });
            if (!res.ok) {
                throw new Error('Failed to add employee');
            }
            fetchEmployees(); // Обновляем список после добавления
        } catch (error) {
            console.error('Failed to add employee:', error);
        }
    };

    return (
        <Router> {/* Добавляем роутер */}
            <Container>
                <SimpleNavbar/>
                <Routes> {/* Добавляем маршруты */}
                    <Route
                        path="/"
                        element={
                            employees.length > 0 ? (
                                <EmployeeCardList
                                    employees={employees}
                                    onRatingSave={handleRatingSave}
                                    onEmployeeDelete={handleEmployeeDelete}
                                />
                            ) : (
                                <Spinner/>
                            )
                        }
                    />
                    <Route path="/add" element={
                        <FormNewEmployee
                            onSubmit={addEmployee}
                        />} /> {/* Маршрут для формы добавления */}
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
