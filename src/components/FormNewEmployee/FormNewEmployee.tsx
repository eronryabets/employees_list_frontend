import React, { useState } from 'react';
import styles from './FormNewEmployee.module.scss';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import {Alert} from "react-bootstrap";

interface FormNewEmployeeProps {
    onSubmit: (employeeData: any) => void;
    formError: string | null;
}

export const FormNewEmployee = ({ onSubmit, formError}: FormNewEmployeeProps) => {
    const [employeeData, setEmployeeData] = useState({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        age: 0,
        position: '',
        profession: '',
        years_worked: 0,
        phone_number: '',
        email: '',
        facebook_link: '',
        avatar_link: '',
        rating: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmployeeData({
            ...employeeData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(employeeData);
        // Передаем данные о сотруднике в родительский компонент
    };

    return (
        <div className={styles.formNewEmployee}>
            <Form onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                    <InputGroup.Text>First Name</InputGroup.Text>
                    <Form.Control
                        name="first_name"
                        placeholder="First Name"
                        aria-label="First Name"
                        value={employeeData.first_name}
                        onChange={handleChange}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text>Last Name</InputGroup.Text>
                    <Form.Control
                        name="last_name"
                        placeholder="Last Name"
                        aria-label="Last Name"
                        value={employeeData.last_name}
                        onChange={handleChange}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text>Date of Birth</InputGroup.Text>
                    <Form.Control
                        name="date_of_birth"
                        type="date"
                        aria-label="Date of Birth"
                        value={employeeData.date_of_birth}
                        onChange={handleChange}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text>Age</InputGroup.Text>
                    <Form.Control
                        name="age"
                        type="number"
                        placeholder="Age"
                        aria-label="Age"
                        value={employeeData.age}
                        onChange={handleChange}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text>Position</InputGroup.Text>
                    <Form.Control
                        name="position"
                        placeholder="Position"
                        aria-label="Position"
                        value={employeeData.position}
                        onChange={handleChange}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text>Profession</InputGroup.Text>
                    <Form.Control
                        name="profession"
                        placeholder="Profession"
                        aria-label="Profession"
                        value={employeeData.profession}
                        onChange={handleChange}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text>Years Worked</InputGroup.Text>
                    <Form.Control
                        name="years_worked"
                        type="number"
                        placeholder="Years Worked"
                        aria-label="Years Worked"
                        value={employeeData.years_worked}
                        onChange={handleChange}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text>Phone Number</InputGroup.Text>
                    <Form.Control
                        name="phone_number"
                        type="tel"
                        placeholder="Phone Number"
                        aria-label="Phone Number"
                        value={employeeData.phone_number}
                        onChange={handleChange}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text>Email</InputGroup.Text>
                    <Form.Control
                        name="email"
                        type="email"
                        placeholder="Email"
                        aria-label="Email"
                        value={employeeData.email}
                        onChange={handleChange}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text>Facebook Link</InputGroup.Text>
                    <Form.Control
                        name="facebook_link"
                        type="url"
                        placeholder="Facebook Link"
                        aria-label="Facebook Link"
                        value={employeeData.facebook_link}
                        onChange={handleChange}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text>Avatar Link</InputGroup.Text>
                    <Form.Control
                        name="avatar_link"
                        type="url"
                        placeholder="Avatar Link"
                        aria-label="Avatar Link"
                        value={employeeData.avatar_link}
                        onChange={handleChange}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text>Rating</InputGroup.Text>
                    <Form.Control
                        name="rating"
                        type="number"
                        placeholder="Rating"
                        aria-label="Rating"
                        min="0"
                        max="100"
                        value={employeeData.rating}
                        onChange={handleChange}
                    />
                </InputGroup>

                 {/* Вывод ошибки, если она есть */}
                {formError && <Alert variant="danger">{formError}</Alert>}

                <Button type="submit" variant="primary">
                    Add Employee
                </Button>
            </Form>
        </div>
    );
};
