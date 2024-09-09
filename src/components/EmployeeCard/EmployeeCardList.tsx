// import styles from './EmployeeCardList.module.scss';
import {LocalEmployee} from "../../types";
import {EmployeeInfo} from "../EmployeeInfo";

interface EmployeeCardProps extends LocalEmployee {
}

export const EmployeeCardList = (props: { employees: EmployeeCardProps[] }) => (
  <div>
    {props.employees.map((employee) => (
      <div key={employee.id}>
        <EmployeeInfo
          first_name={employee.first_name}
          last_name={employee.last_name}
          position={employee.position}
          age={employee.age}
        />
      </div>
    ))}
  </div>
);