import React, {useState} from "react";
import {FormNewEmployee} from "../FormNewEmployee";

const BASE_URL = 'http://localhost:8005/api/employee/';

export const AddNewEmployeePage = () => {
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
        <FormNewEmployee
            onSubmit={addNewEmployee}
            formError={formError}
            successMessage={successMessage}
        />
    );

};
