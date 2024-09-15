import React, {useState} from "react";
import {FormNewEmployee} from "../FormNewEmployee";
import {Helmet} from "react-helmet-async";
import api from "../../api/api";

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

            const response = await api.post('/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Для отправки файлов
                },
            });

            if (response.data && response.data.errors) {
                setFormError(response.data.errors);
                setSuccessMessage(false);
            } else {
                setFormError({});
                setSuccessMessage(true); // Успешное добавление
            }
        } catch (error: any) {
            if (error.response && error.response.data) {
                setFormError(error.response.data);
            } else {
                console.error('Failed to add employee:', error);
                setFormError({});
            }
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
