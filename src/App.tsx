import React, {useState, useEffect} from 'react';
import {Container} from "./components/Container";
import {TheHeader} from "./components/TheHeader";
import {EmployeeCardList} from "./components/EmployeeCard";
import {LocalEmployee} from "./types";
import {extractLocalEmployees} from "./utils/extract-local-employees";

const BASE_URL = 'http://localhost:8005/api/employee/';

function App() {
    // Инициализируем состояние пустым массивом
    const [employees, setEmployees]
        = useState<LocalEmployee[]>([]);

    const fetchEmployees = async () => {
      try {
        const res = await fetch(BASE_URL);
        const apiEmployees = await res.json();
        const localEmployees = extractLocalEmployees(apiEmployees);
        setEmployees(localEmployees); // Устанавливаем данные в состояние
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <Container>
            <TheHeader/>
            {/* Рендерим EmployeeCardList только если массив сотрудников не пустой */}
            {employees.length > 0 ? (
                <EmployeeCardList employees={employees}/>
            ) : (
                <p>Loading employees...</p>
            )}
        </Container>
    );
}

export default App;
