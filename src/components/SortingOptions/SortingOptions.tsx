import styles from './SortingOptions.module.scss';
import {ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import React from "react";

interface SortingOptionsProps {
    ageSort: ()=>void;
    ratingSort: ()=>void;
}


export const SortingOptions = ({ageSort, ratingSort}: SortingOptionsProps) => {

    return (
        <div className={styles.sortingOptions}>
            <div className={styles.container}>
                <span className={`mx-3 ${styles.textContent}`}>Sort By :</span>
                <ToggleButtonGroup type="checkbox" className="mb-2">
                    <ToggleButton id="tbg-check-1"
                                  className={styles.button}
                                  onClick={ageSort}
                                  value={'age'}>
                        Age
                    </ToggleButton>
                    <ToggleButton id="tbg-check-2"
                                  className={styles.button}
                                  onClick={ratingSort}
                                  value={'rating'}>
                        Rating
                    </ToggleButton>
                </ToggleButtonGroup>

            </div>
        </div>
    );
};
