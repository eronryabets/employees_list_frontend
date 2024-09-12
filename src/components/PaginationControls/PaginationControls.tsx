import styles from './PaginationControls.module.scss';
import React from "react";
import {Button} from "react-bootstrap";

interface PaginationControlsProps {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    nextPageUrl: string | null;
}

export const PaginationControls = ({
                                       currentPage,
                                       setCurrentPage,
                                       nextPageUrl,
                                   }: PaginationControlsProps) => {
    return (
        <div className={styles.paginationControls}>
            <div className={styles.container}>
                <Button
                    className={styles.button}
                    variant="primary"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <span className={`mx-3 ${styles.textContent}`}>Page {currentPage}</span>
                <Button
                    className={styles.button}
                    variant="primary"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={!nextPageUrl}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};