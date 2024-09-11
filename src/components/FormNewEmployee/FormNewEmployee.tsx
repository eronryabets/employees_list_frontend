import React, {useState} from 'react';
import styles from './FormNewEmployee.module.scss';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import {ModalSuccess} from "../Modals/ModalSuccess";

interface FormNewEmployeeProps {
    onSubmit: (employeeData: any) => void;
    formError: { [key: string]: string[] }; // Ошибки, переданные с сервера
    successMessage: boolean; // Опциональное сообщение об успехе
}

export const FormNewEmployee = ({onSubmit, formError, successMessage }: FormNewEmployeeProps) => {
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
        const {name, value} = e.target;
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
                        isInvalid={!!formError.first_name}
                    />
                    {formError.first_name && (
                        <Form.Control.Feedback type="invalid">
                            {formError.first_name[0]}
                        </Form.Control.Feedback>
                    )}
                </InputGroup>

                {/*<ModalSuccess success={true}/>*/}

                <InputGroup className="mb-3">
                    <InputGroup.Text>Last Name</InputGroup.Text>
                    <Form.Control
                        name="last_name"
                        placeholder="Last Name"
                        aria-label="Last Name"
                        value={employeeData.last_name}
                        onChange={handleChange}
                        isInvalid={!!formError.last_name}
                    />
                    {formError.last_name && (
                        <Form.Control.Feedback type="invalid">
                            {formError.last_name[0]}
                        </Form.Control.Feedback>
                    )}
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text>Date of Birth</InputGroup.Text>
                    <Form.Control
                        name="date_of_birth"
                        type="date"
                        aria-label="Date of Birth"
                        value={employeeData.date_of_birth}
                        onChange={handleChange}
                        isInvalid={!!formError.date_of_birth}
                    />
                    {formError.date_of_birth && (
                        <Form.Control.Feedback type="invalid">
                            {formError.date_of_birth[0]}
                        </Form.Control.Feedback>
                    )}
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
                        isInvalid={!!formError.age}
                    />
                    {formError.age && (
                        <Form.Control.Feedback type="invalid">
                            {formError.age[0]}
                        </Form.Control.Feedback>
                    )}
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text>Position</InputGroup.Text>
                    <Form.Control
                        name="position"
                        placeholder="Position"
                        aria-label="Position"
                        value={employeeData.position}
                        onChange={handleChange}
                        isInvalid={!!formError.position}
                    />
                    {formError.position && (
                        <Form.Control.Feedback type="invalid">
                            {formError.position[0]}
                        </Form.Control.Feedback>
                    )}
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text>Profession</InputGroup.Text>
                    <Form.Control
                        name="profession"
                        placeholder="Profession"
                        aria-label="Profession"
                        value={employeeData.profession}
                        onChange={handleChange}
                        isInvalid={!!formError.profession}
                    />
                    {formError.profession && (
                        <Form.Control.Feedback type="invalid">
                            {formError.profession[0]}
                        </Form.Control.Feedback>
                    )}
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
                        isInvalid={!!formError.years_worked}
                    />
                    {formError.years_worked && (
                        <Form.Control.Feedback type="invalid">
                            {formError.years_worked[0]}
                        </Form.Control.Feedback>
                    )}
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
                        isInvalid={!!formError.phone_number}
                    />
                    {formError.phone_number && (
                        <Form.Control.Feedback type="invalid">
                            {formError.phone_number[0]}
                        </Form.Control.Feedback>
                    )}
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
                        isInvalid={!!formError.email}
                    />
                    {formError.email && (
                        <Form.Control.Feedback type="invalid">
                            {formError.email[0]}
                        </Form.Control.Feedback>
                    )}
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
                        isInvalid={!!formError.facebook_link}
                    />
                    {formError.facebook_link && (
                        <Form.Control.Feedback type="invalid">
                            {formError.facebook_link[0]}
                        </Form.Control.Feedback>
                    )}
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
                        isInvalid={!!formError.avatar_link}
                    />
                    {formError.avatar_link && (
                        <Form.Control.Feedback type="invalid">
                            {formError.avatar_link[0]}
                        </Form.Control.Feedback>
                    )}
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
                        isInvalid={!!formError.rating}
                    />
                    {formError.rating && (
                        <Form.Control.Feedback type="invalid">
                            {formError.rating[0]}
                        </Form.Control.Feedback>
                    )}
                </InputGroup>

                <Button type="submit" variant="primary">
                    Add Employee
                </Button>

                {successMessage && (
                    <div className={styles.textSuccess}>
                        {/*{successMessage}*/}
                        <ModalSuccess success={successMessage}/>
                    </div>
                )}

            </Form>
        </div>
    );
};
