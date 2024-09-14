import React, {useState} from "react";
import {FormNewEmployee} from "../FormNewEmployee";
import {BASE_URL_EMP} from "../../config";
import {Helmet} from "react-helmet-async";

export const AddNewEmployeePage = () => {
    const [formError, setFormError]
        = useState<{ [key: string]: string[] }>({});
    const [successMessage, setSuccessMessage]
        = useState<boolean>(false);

    const addNewEmployee = async (employeeData: any) => {
        try {
            const formData = new FormData();
            for (const key in employeeData) {
                formData.append(key, employeeData[key]);
            }

            const response = await fetch(BASE_URL_EMP, {
                method: 'POST',
                headers: {},
                body: formData,
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
        <div>
            <Helmet>
                <title>Add New Employee</title>
            </Helmet>
            <FormNewEmployee
                onSubmit={addNewEmployee}
                formError={formError}
                successMessage={successMessage}
            />
        </div>
    );

};
