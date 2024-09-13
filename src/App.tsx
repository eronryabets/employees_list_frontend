import React, {useState, useEffect} from 'react';
import {Container} from "./components/Container";
import {FormNewEmployee} from "./components/FormNewEmployee";
import {SimpleNavbar} from "./components/SimpleNavbar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import {EmployeePage} from "./components/EmployeePage";


const BASE_URL = 'http://localhost:8005/api/employee/';

function App() {
    const [formError, setFormError]
        = useState<{ [key: string]: string[] }>({});
    const [successMessage, setSuccessMessage]
        = useState<boolean>(false);



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
                // fetchEmployees();
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
                    <Route path="/" element={<EmployeePage/>} />
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
