import styles from './EmployeeInfo.module.scss';
import { LocalEmployee } from 'types';

// import { ReactComponent as CompanyIcon } from 'assets/icon-company.svg';
// import { ReactComponent as LocationIcon } from 'assets/icon-location.svg';
// import { ReactComponent as TwitterIcon} from 'assets/icon-twitter.svg';
// import { ReactComponent as BlogIcon} from 'assets/icon-website.svg';

// import { InfoItem, InfoItemProps } from 'components/InfoItem';
// import { LocalGithubUser } from 'types';
// import styles from './UserInfo.module.scss';

interface EmployeeInfoProps extends Pick<
LocalEmployee,
  'first_name' | 'last_name' | 'position' | 'age'
> {}


export const EmployeeInfo = ({first_name, last_name,
                                 position, age}: EmployeeInfoProps) => {
  return (
      <div className={styles.employeeInfo}>
          <span>{first_name}</span>
          <span>{last_name}</span>
          <span>{position}</span>
          <span>{age}</span>
      </div>
  );
}
