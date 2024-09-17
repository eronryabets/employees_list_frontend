import React, {useState} from 'react';
import {Card, ListGroup, Button} from 'react-bootstrap';
import styles from './EmployeeCard.module.scss';
import {ModalDeleteButton} from "../Modals/ModalDeleteButton";

import {useDispatch} from 'react-redux';
import {AppDispatch} from 'store/store';
import {
    updateEmployeeRating,
    deleteEmployee
} from '../../slices/employeeSlice';
import {LocalEmployee} from "../../types";
import {useNavigate} from 'react-router-dom';

interface EmployeeCardProps {
    employee: LocalEmployee;
}

export const EmployeeCard = ({employee}: EmployeeCardProps) => {
    const dispatch: AppDispatch = useDispatch();

    const [localRating, setLocalRating] = useState(employee.rating);
    const navigate = useNavigate();

    const handleIncrease = () => {
        setLocalRating(localRating + 1);
    };

    const handleDecrease = () => {
        setLocalRating(localRating > 0 ? localRating - 1 : 0);
    };

    const handleSave = () => {
        dispatch(updateEmployeeRating({id: employee.id, rating: localRating}));
    };


    const handleDelete = () => {
        dispatch(deleteEmployee(employee.id)).then((action) => {
            if (deleteEmployee.fulfilled.match(action)) {
                navigate('/');
            }
        });
    };

    return (
        <Card style={{width: 'auto'}} className={styles.cardBootstrap}>
            <div className={styles.cardContent}>
                <Card.Img variant="top" src={employee.avatar} className={styles.fixedImg}/>
                <Card.Body>
                    <Card.Title>{`${employee.first_name} ${employee.last_name}`}</Card.Title>
                    <Card.Text>'Good employee'</Card.Text>
                </Card.Body>
                <ModalDeleteButton onDelete={handleDelete}/>
            </div>

            <div className={styles.cardContent}>
                <ListGroup className="list-group-flush">
                    {/*<div className={styles.cardContent}>*/}
                    <ListGroup.Item className={styles.item}>Age: {employee.age}</ListGroup.Item>
                    <ListGroup.Item className={styles.item}>Position: {employee.position}</ListGroup.Item>

                    {/* Рейтинг */}
                    <ListGroup.Item className={styles.item}>
                        Rating: {localRating}
                        <div className={styles.buttons}>
                            <Button variant="success" className={styles.button} onClick={handleIncrease}>+</Button>{' '}
                            <Button variant="dark" className={styles.button} onClick={handleDecrease}>-</Button>{' '}
                            <Button variant="primary" className={styles.button} onClick={handleSave}>Save</Button>
                        </div>
                    </ListGroup.Item>
                    {/*</div>*/}
                </ListGroup>
            </div>

            <Card.Body>
                {/* Отображение ссылки вместо card_links */}
                {employee.facebook_link && (
                    <Card.Link href={employee.facebook_link}>
                        Facebook
                    </Card.Link>
                )}
            </Card.Body>
        </Card>
    );
};
