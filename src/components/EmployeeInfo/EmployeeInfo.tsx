import styles from './EmployeeInfo.module.scss';
import {LocalEmployee} from 'types';
import {CardBootstrap} from "../CardBootstrap";

interface EmployeeInfoProps extends Pick<
    LocalEmployee,
    'first_name' | 'last_name' | 'position' | 'age' | 'avatar_link' | 'rating'
> {
}

export const EmployeeInfo = ({
                                 first_name,
                                 last_name,
                                 position,
                                 age,
                                 avatar_link,
                                 rating,
                             }
                                 : EmployeeInfoProps) => {

    const fio: string = `${first_name} ${last_name}`;
    const text: string = `Good man! Very interest person :)`;
    const text_row1: string = `Age: ${age}`;
    const text_row2: string = `Position: ${position}`;
    const text_row3: string = `Rating: ${rating}`;

    return (
        <CardBootstrap width={'auto'}
                       variant={'top'}
                       img_src={avatar_link}
                       card_title={fio}
                       card_text={text}
                       card_row_text={[text_row1, text_row2, text_row3]}
                       card_links={[
                           {url: "https://example.com", label: "Link"},
                       ]}
        />
    );
}
