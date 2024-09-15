import React, { useState } from 'react';
import axios from 'axios';
import styles from './LoginForm.module.scss';
import { ACCOUNT_URL } from "../../config";

interface LoginFormProps {}

export const LoginForm = ({}: LoginFormProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userData = {
            username,
            password
        };

        try {
            const response =
                await axios.post(`${ACCOUNT_URL}login/`, userData);

            const { access, refresh } = response.data;

            // Сохраняем токены в localStorage
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);

            console.log('Login successful:', response.data);

            // Перенаправление на защищенную страницу
            window.location.href = '/';

        } catch (error) {
            setErrorMessage('Login failed, please try again.');
            console.error('Login error:', error);
        }
    };

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
                        onChange={(e) =>
                            setUsername(e.target.value)}
                        className={styles.input}
                    />
                    <input
                        type="password"
                        name="p"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)}
                        className={styles.input}
                    />
                    <button type="submit" className={`
                    ${styles.btn}
                    ${styles.btnPrimary}
                    ${styles.btnLarge}
                    ${styles.btnBlock}`}>
                        Let me in
                    </button>
                </form>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            </div>
        </div>
    );
};
