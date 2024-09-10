import React from 'react';
import { LocalEmployee } from 'types';
import { CardBootstrap } from '../CardBootstrap';

interface EmployeeCardProps extends LocalEmployee {}

export const EmployeeCardList = ({ employees }: { employees: EmployeeCardProps[] }) => {
    const handleSaveRating = async (id: number, newRating: number) => {
        try {
            const response = await fetch(`http://localhost:8005/api/employee/${id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating: newRating }),
            });

            if (!response.ok) {
                throw new Error('Failed to save rating');
            }

            console.log(`Rating for employee ${id} saved: ${newRating}`);
        } catch (error) {
            console.error('Error saving rating:', error);
        }
    };

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
                        `Rating: ${employee.rating}`,
                    ]}
                    card_links={[{ url: "https://example.com", label: "Link" }]}
                    initialRating={employee.rating}
                    onSave={(newRating) => handleSaveRating(employee.id, newRating)} // Передаем функцию сохранения
                />
            ))}
        </div>
    );
};
