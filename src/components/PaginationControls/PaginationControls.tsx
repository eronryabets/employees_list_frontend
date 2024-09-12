import styles from './PaginationControls.module.scss';
import React from "react";

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
        <div className="pagination-controls">
            <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <span>Page {currentPage}</span>
            <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={!nextPageUrl}
            >
                Next
            </button>
        </div>
    );
};