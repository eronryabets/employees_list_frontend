import React from 'react';
import {LocalEmployee} from 'types';
import {CardBootstrap} from '../CardBootstrap';
import {DEFAULT_AVATAR} from "../../config";
import api from "../../api/api";

interface EmployeeCardProps extends LocalEmployee {
}

export const EmployeeCardList = ({employees, onRatingSave, onEmployeeDelete}: {
    employees: EmployeeCardProps[],
    onRatingSave: () => void,
    onEmployeeDelete: (id: number) => void,
}) => {
    const handleSaveRating = async (id: number, newRating: number) => {
        try {
            const response =
                await api.patch(`${id}/`, {rating: newRating});

            if (response.status !== 200) {
                throw new Error('Failed to save rating');
            }

            console.log(`Rating for employee ${id} saved: ${newRating}`);
            onRatingSave();
        } catch (error) {
            console.error('Error saving rating:', error);
        }
    };

    const handleEmployeeDelete = async (id: number) => {
        try {
            const response = await api.delete(`${id}/`);

            if (response.status !== 204) {
                throw new Error('Failed to delete employee');
            }

            console.log(`Employee deleted`);
            onEmployeeDelete(id);
        } catch (error) {
            console.error('Error delete employee:', error);
        }
    }

    return (
        <div>
            {employees.map((employee) => (
                <CardBootstrap
                    key={employee.id}
                    width={'auto'}
                    variant={'top'}
                    img_src={employee.avatar ? employee.avatar : `${DEFAULT_AVATAR}`}
                    card_title={`${employee.first_name} ${employee.last_name}`}
                    card_text={`Good man! Very interesting person :)`}
                    card_row_text={[
                        `Age: ${employee.age}`,
                        `Position: ${employee.position}`,
                        `Rating: ${employee.rating}`,
                    ]}
                    card_links={[{url: "https://example.com", label: "Link"}]}
                    initialRating={employee.rating}
                    onSave={(newRating) => handleSaveRating(employee.id, newRating)}
                    onDelete={() => handleEmployeeDelete(employee.id)}
                />
            ))}
        </div>
    );
};
