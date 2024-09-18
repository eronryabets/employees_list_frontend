import React, {useEffect, useState} from 'react';
import styles from './LoginForm.module.scss';
import {RootState, useAppDispatch} from "../../store/store";
import {useSelector} from "react-redux";
import {fetchProfile, login} from "../../slices/authSlice";


export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {loading, errorMessage, isAuthenticated} = useSelector((state: RootState) => state.auth);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(login({username, password}));
    };

     useEffect(() => {
         if (isAuthenticated) {
            dispatch(fetchProfile());
        }
    }, [isAuthenticated, dispatch]);

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
