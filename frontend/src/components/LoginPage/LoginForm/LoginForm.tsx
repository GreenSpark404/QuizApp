import React, { useState } from 'react';

import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import classes from './LoginForm.module.scss';
import userStore from '../../../stores/userStore';

type LoginFormProps = {};

const LoginForm: React.FC<LoginFormProps> = ({}) => {

    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const loginHandler = (): void => {
        userStore.getAdminContent(login, password);
    };

  return (
    <div className={classes.component}>
        <Typography
            className={classes.title}
            variant="h4"
            color="primary"
        >
            Привет!
        </Typography>
        <div className={classes.content}>
            <TextField
                label="Введи имя"
                placeholder="Имя"
                variant="outlined"
                size="medium"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                fullWidth
            />
            <TextField
                label="Введи пароль"
                placeholder="пароль"
                variant="outlined"
                size="medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
            />
            <Button
                className={classes.loginButton}
                color="primary"
                variant="outlined"
                size="large"
                disabled={(login?.length < 3) || (password?.length < 3)}
                onClick={loginHandler}

            >
                Войти
            </Button>
        </div>
    </div>
  );
};

export default LoginForm;
