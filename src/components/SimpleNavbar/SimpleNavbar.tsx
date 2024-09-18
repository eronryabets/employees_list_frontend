import styles from './SimpleNavbar.module.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import classNames from 'classnames';
import { ThemeSwitcher } from "../ThemeSwitcher";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { logout } from "../../slices/authSlice";


export const SimpleNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { username, isAuthenticated, role } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
    dispatch(logout())
      .unwrap()  // Для обработки результата асинхронного экшена
      .then(() => {
          navigate('/login'); // Перенаправляем на страницу входа
      })
      .catch((error) => {
          console.error('Logout failed:', error); // Логируем ошибку
      });
};

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
                                className={classNames({[styles.active]: location.pathname === '/'})}
                            >
                                Emp. List
                            </Nav.Link>

                            <Nav.Link
                                as={Link}
                                to="/add"
                                className={classNames({[styles.active]: location.pathname === '/add'})}
                            >
                                Add
                            </Nav.Link>

                            <nav className={styles.simpleNavbar}>
                                {isAuthenticated ? (
                                    <div className={styles.userInfo}>
                                        <button
                                            className={styles.logoutButton}
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                        <span>{username}</span>
                                        <span>{`(${role})`}</span>
                                    </div>
                                ) : (
                                    <Nav.Link
                                        as={Link}
                                        to="/login/"
                                        className={classNames({
                                            [styles.active]:
                                            location.pathname === '/login/'})}
                                    >
                                        Login
                                    </Nav.Link>
                                )}
                            </nav>
                        </Nav>
                    </Navbar.Collapse>

                    <ThemeSwitcher/>
                </Container>
            </Navbar>
        </div>
    );
};