import styles from './EmployeeCard.module.scss';
import {LocalEmployee} from "../../types";
import {EmployeeInfo} from "../EmployeeInfo";
// import {UserStat} from "../UserStat";
// import {UserTitle} from "../UserTitle";
// import {EmployeeInfo} from "../EmployeeInfo"; //UserInfo

interface EmployeeCardProps extends LocalEmployee {
}

export const EmployeeCard = (props: EmployeeCardProps) => (
    <div className={styles.employeeCard}>

        <EmployeeInfo
            first_name={props.first_name}
            last_name={props.last_name}
            position={props.position}
            age={props.age}
        />

    </div>
);