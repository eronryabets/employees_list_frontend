import React, {useState} from 'react';
import styles from './LoginForm.module.scss';
import {ACCOUNT_URL} from "../../config";

interface LoginFormProps {
}

export const LoginForm = ({}: LoginFormProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userData = {
            username,
            password
        };

        try {
            const response = await fetch(`${ACCOUNT_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Login successful:', data);

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
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
                    <button type="submit" className={`
                    ${styles.btn}
                    ${styles.btnPrimary}
                    ${styles.btnLarge}
                    ${styles.btnBlock}`}>
                        Let me in
                    </button>
                </form>
            </div>
        </div>
    );
};
