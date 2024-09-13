import React from 'react';
import {LocalEmployee} from 'types';
import {CardBootstrap} from '../CardBootstrap';
import { BASE_URL} from "../../config";

interface EmployeeCardProps extends LocalEmployee {
}

export const EmployeeCardList = ({employees, onRatingSave, onEmployeeDelete}: {
    employees: EmployeeCardProps[],
    onRatingSave: () => void,
    onEmployeeDelete: (id: number) => void,
}) => {
    const handleSaveRating = async (id: number, newRating: number) => {
        try {
            const response = await fetch(`${BASE_URL}${id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({rating: newRating}),
            });

            if (!response.ok) {
                throw new Error('Failed to save rating');
            }

            console.log(`Rating for employee ${id} saved: ${newRating}`);
            onRatingSave(); // Обновление данных после сохранения
        } catch (error) {
            console.error('Error saving rating:', error);
        }
    };

    const handleEmployeeDelete = async (id: number) => {
        try {
            const response = await fetch(`${BASE_URL}${id}/`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete employee');
            }

            console.log(`Employee deleted`);
            // Обновляем состояние, удаляя сотрудника
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
                    img_src={employee.avatar}
                    card_title={`${employee.first_name} ${employee.last_name}`}
                    card_text={`Good man! Very interesting person :)`}
                    card_row_text={[
                        `Age: ${employee.age}`,
                        `Position: ${employee.position}`,
                        // Рейтинг теперь передается через initialRating
                        `Rating: ${employee.rating}`,
                    ]}
                    card_links={[{url: "https://example.com", label: "Link"}]}
                    initialRating={employee.rating}
                    onSave={(newRating) => handleSaveRating(employee.id, newRating)} // Сохранение
                    onDelete={()=>handleEmployeeDelete(employee.id)} // Удаление
                />
            ))}
        </div>
    );
};
