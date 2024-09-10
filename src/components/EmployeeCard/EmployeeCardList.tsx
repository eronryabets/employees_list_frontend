import React from 'react';
import { LocalEmployee } from 'types';
import { CardBootstrap } from '../CardBootstrap';
import { useDispatch } from 'react-redux';
// import { updateEmployeeRating } from '../../slice/employeeSlice';

interface EmployeeCardProps extends LocalEmployee {}

export const EmployeeCardList = ({ employees }: { employees: EmployeeCardProps[] }) => {
    // const dispatch = useDispatch();
    // const handleRatingChange = (id: string, newRating: number) => {
    //     dispatch(updateEmployeeRating({ id, newRating }));
    // };

    return (
        <div>
            {employees.map((employee) => (
                <CardBootstrap
                    key={employee.id}
                    width={'auto'}
                    variant={'top'}
                    img_src={employee.avatar_link}
                    card_title={`${employee.first_name} ${employee.last_name}`}
                    card_text={`Good man! Very interesting person :)`}
                    card_row_text={[
                        `Age: ${employee.age}`,
                        `Position: ${employee.position}`,
                        `Rating: ${employee.rating}`
                    ]}
                    card_links={[{ url: "https://example.com", label: "Link" }]}
                    // onRatingIncrease={() => handleRatingChange(employee.id, employee.rating + 1)}
                    // onRatingDecrease={() => handleRatingChange(employee.id, employee.rating - 1)}
                    onRatingIncrease={() => {}}
                    onRatingDecrease={() => {}}
                    onRatingSave={() => {}}
                />
            ))}
        </div>
    );
};
