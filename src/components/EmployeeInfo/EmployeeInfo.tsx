import styles from './EmployeeInfo.module.scss';
import {LocalEmployee} from 'types';
import {CardBootstrap} from "../CardBootstrap";

interface EmployeeInfoProps extends Pick<
    LocalEmployee,
    'first_name' | 'last_name' | 'position' | 'age'
> {
}

export const EmployeeInfo = ({first_name, last_name, position, age}
                                 : EmployeeInfoProps) => {

    const fio: string = `${first_name} ${last_name}`;
    const text: string = `Good man! Very interest person :)`;
    const text_row1: string = `Age: ${age}`;
    const text_row2: string = `Position: ${position}`;

    return (
        <CardBootstrap width={'34rem'}
                       variant={'top'}
                       img_src={'https://avatars.githubusercontent.com/u/23005495?v=4'}
                       card_title={fio}
                       card_text={text}
                       card_row_text={[text_row1, text_row2]}
                       card_links={[
                           {url: "https://example.com", label: "Link"},
                       ]}
        />
    );
}
