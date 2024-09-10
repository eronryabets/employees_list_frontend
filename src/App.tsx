import React, {useState, useEffect} from 'react';
import {Container} from "./components/Container";
import {TheHeader} from "./components/TheHeader";
import {EmployeeCardList} from "./components/EmployeeCard";
import {LocalEmployee} from "./types";
import {extractLocalEmployees} from "./utils/extract-local-employees";
import {Spinner} from "./components/Spinner";
import {SimpleNavbar} from "./components/SimpleNavbar";


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

    // Обновляем сотрудников после сохранения
    const handleRatingSave = () => {
        fetchEmployees(); // Перезагружаем данные с сервера
    };

    // Обновляем состояние, фильтруя удаленного сотрудника
     const handleEmployeeDelete = (id: number) => {
        setEmployees((prevEmployees) =>
            prevEmployees.filter((employee) => employee.id !== id));
    };

    return (
        <Container>
            <SimpleNavbar/>
            {employees.length > 0 ? (
                <EmployeeCardList employees={employees}
                                  onRatingSave={handleRatingSave}
                                  onEmployeeDelete={handleEmployeeDelete}/>
            ) : (
                // <p>Loading employees...</p>
                <Spinner/>
            )}
        </Container>
    );
}

export default App;
