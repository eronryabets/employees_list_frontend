import React from 'react';
import {EmployeeCard} from '../EmployeeCard';
import {useSelector} from 'react-redux';
import {RootState} from 'store/store';
import {LocalEmployee} from "../../types";


export const EmployeeCardList = () => {

    const { employees } = useSelector((state: RootState) => state.pagination);

    return (
        <div>
            {employees.map((employee: LocalEmployee) => (
                <EmployeeCard employee={employee} key={employee.id}/>
            ))}
        </div>
    );
};
