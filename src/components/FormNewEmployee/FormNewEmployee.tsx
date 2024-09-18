import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/store'; // Используем типизированный dispatch
import { RootState } from '../../store/store';
import { setEmployeeField, clearFormError, resetForm, addNewEmployee} from '../../slices/formEmployeeSlice';
import { v4 as uuidv4 } from 'uuid';
import styles from './FormNewEmployee.module.scss';
import { Form, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {ModalSuccess} from "../Modals/ModalSuccess";


export const FormNewEmployee = () => {
    const dispatch = useAppDispatch();


    const { employeeData, formError} = useSelector(
        (state: RootState) => state.formEmployee
    );

    // Локальный стейт для модального окна
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(setEmployeeField({ name, value }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const uniqueFileName = `${uuidv4()}-${file.name}`;
            const newFile = new File([file], uniqueFileName, { type: file.type });
            dispatch(setEmployeeField({ name: 'avatar', value: newFile }));
        }
    };


      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Выполняем действие и обрабатываем успешный результат
            await dispatch(addNewEmployee(employeeData)).unwrap();

            // После успешного добавления сбрасываем форму
            dispatch(resetForm());
            setShowSuccessModal(true); // Показать модальное окно с успехом

            // Скрываем сообщение после определённого времени (например, через 3 секунды)
            setTimeout(() => {
                setShowSuccessModal(false); // Закрыть модальное окно
                dispatch(clearFormError()); // Очистить ошибки формы
            }, 3000); // 3 секунды
        } catch (error) {
            console.error('Failed to add employee:', error);
        }
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

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload your profile photo</Form.Label>
                    <Form.Control
                        type="file"
                        name="avatar"
                        onChange={handleFileChange}
                        isInvalid={!!formError.avatar}
                    />
                    {formError.avatar && (
                        <Form.Control.Feedback type="invalid">
                            {formError.avatar[0]}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

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

                {showSuccessModal  && (
                    <div className={styles.textSuccess}>
                        {/*{successMessage}*/}
                        <ModalSuccess success={showSuccessModal }/>
                    </div>
                )}

            </Form>
        </div>
    );
};