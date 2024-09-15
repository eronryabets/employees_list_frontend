import styles from './LoginForm.module.scss';  // Импорт стилей

interface LoginFormProps {}

export const LoginForm = ({ }: LoginFormProps) => (
    <div className={styles.loginForm}>  {/* Использование стиля loginForm */}
        <div className={styles.login}>  {/* Использование стиля login */}
            <h1>Login</h1>
            <form method="post">
                <input
                    type="text"
                    name="u"
                    placeholder="Username"
                    required
                    className={styles.input}
                />
                <input
                    type="password"
                    name="p"
                    placeholder="Password"
                    required
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
