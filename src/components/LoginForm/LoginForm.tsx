import React, { useEffect, useState } from 'react';
import styles from './LoginForm.module.scss';
import { useAppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { fetchProfile, login } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, isAuthenticated, errorMessage } = useSelector((state: RootState) => state.auth);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login({ username, password })).then(() => {
            // После логина загружаем профиль
            dispatch(fetchProfile());
        });
    };

    // Редирект после успешного логина
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/'); // Редирект на главную страницу
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className={styles.loginForm}>
            <div className={styles.login}>
                <h1>Login</h1>
                <form method="post" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="u"
                        placeholder="Username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.input}
                    />
                    <input
                        type="password"
                        name="p"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                    />
                    <button
                        type="submit"
                        className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLarge} ${styles.btnBlock}`}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Let me in'}
                    </button>
                </form>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            </div>
        </div>
    );
};
