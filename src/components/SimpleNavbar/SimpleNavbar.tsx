import styles from './SimpleNavbar.module.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import classNames from 'classnames';
import {ThemeSwitcher} from "../ThemeSwitcher";
import {Link, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";


export const SimpleNavbar = () => {

    const location = useLocation(); // Получаем текущий путь

    const {username, email, role} = useSelector((state: RootState) => state.auth);

    return (
        <div className={styles.simpleNavbar}>
            <Navbar expand="lg" className={classNames('bg-body-tertiary', styles.main)}>
                <Container>
                    <Navbar.Brand as={Link} to="/" >Employees</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link
                                as={Link}
                                to="/"
                                className={classNames({ [styles.active]: location.pathname === '/' })}
                            >
                                Emp. List
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/add"
                                className={classNames({ [styles.active]: location.pathname === '/add' })}
                            >
                                Add
                            </Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    <span> [ {username} {email} {role} ]</span>
                    <ThemeSwitcher />
                </Container>
            </Navbar>
        </div>
    );
};