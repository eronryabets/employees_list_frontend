import styles from './SortingOptions.module.scss';
import {Button} from "react-bootstrap";
import React from "react";

interface SortingOptionsProps { }

export const SortingOptions = ({ }: SortingOptionsProps) => {

    return (
        <div className={styles.sortingOptions}>
            <div className={styles.container}>
                <span className={`mx-3 ${styles.textContent}`}>Sort By :</span>
                <Button
                    className={styles.button}
                    variant="primary"
                    onClick={() => {
                    }}
                    disabled={true}
                >
                    Age
                </Button>
                <Button
                    className={styles.button}
                    variant="primary"
                    onClick={() => {
                    }}
                    disabled={true}
                >
                    Rating
                </Button>
            </div>
        </div>
    );
};
