import styles from './SortingOptions.module.scss';
import {ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {toggleAgeFlag, toggleRatingFlag} from '../../slices/paginationSlice';


export const SortingOptions = () => {
    const dispatch = useDispatch();

    const ageFlag = useSelector((state: RootState) =>
        state.pagination.ageFlag);
    const ratingFlag = useSelector((state: RootState) =>
        state.pagination.ratingFlag);

    const handleAgeSort = () => {
        dispatch(toggleAgeFlag());
    };

    const handleRatingSort = () => {
        dispatch(toggleRatingFlag());
    };

    return (
        <div className={styles.sortingOptions}>
            <div className={styles.container}>
                <span className={`mx-3 ${styles.textContent}`}>Sort By :</span>
                <ToggleButtonGroup type="checkbox" className="mb-2">
                    <ToggleButton id="tbg-check-1"
                                  className={`${styles.button} ${ageFlag ? styles.active : ''}`}
                                  onClick={handleAgeSort}
                                  value={'age'}>
                        Age
                    </ToggleButton>
                    <ToggleButton id="tbg-check-2"
                                  className={`${styles.button} ${ratingFlag ? styles.active : ''}`}
                                  onClick={handleRatingSort}
                                  value={'rating'}>
                        Rating
                    </ToggleButton>
                </ToggleButtonGroup>

            </div>
        </div>
    );
};
