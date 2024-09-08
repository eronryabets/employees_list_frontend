import { ApiEmployee, LocalEmployee } from 'types';

export const extractLocalEmployees = (employees: ApiEmployee[]): LocalEmployee[] => {
  return employees.map((employee) => ({
    id: employee.id,
    first_name: employee.first_name,
    last_name: employee.last_name,
    age: employee.age,
    position: employee.position,
    years_worked: employee.years_worked,
    email: employee.email,
    facebook_link: employee.facebook_link,
  }));
};
