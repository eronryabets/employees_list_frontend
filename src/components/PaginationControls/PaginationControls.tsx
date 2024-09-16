import styles from './PaginationControls.module.scss';
import React from "react";
import {Button} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setCurrentPage } from '../../slices/employeeSlice';


export const PaginationControls = () => {
    const dispatch = useDispatch();

    const currentPage = useSelector((state: RootState) =>
        state.employees.currentPage);
    const nextPageUrl = useSelector((state: RootState) =>
        state.employees.nextPageUrl);

    const handleNextPage = () => {
        if (nextPageUrl) {
            dispatch(setCurrentPage(currentPage + 1));
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            dispatch(setCurrentPage(currentPage - 1));
        }
    };

    return (
        <div className={styles.paginationControls}>
            <div className={styles.container}>
                <Button
                    className={styles.button}
                    variant="primary"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <span className={`mx-3 ${styles.textContent}`}>Page {currentPage}</span>
                <Button
                    className={styles.button}
                    variant="primary"
                    onClick={handleNextPage}
                    disabled={!nextPageUrl}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};