import React, { useEffect, useState } from 'react';

import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import userStore from '../../../stores/userStore';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import classes from './LoginForm.module.scss';

type LoginFormProps = {};

const LoginForm: React.FC<LoginFormProps> = ({}) => {

    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const navigate = useNavigate();

    const shouldRedirect = (): void => {
        if (userStore.isAuth) navigate('/')
    }

    const loginHandler = async (): Promise<void> => {
        await userStore.getAdminContent(login, password);
        shouldRedirect();
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
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                fullWidth
            />
            <FormControl variant="outlined" fullWidth>
                <InputLabel>Пароль</InputLabel>
                <OutlinedInput
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
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

export default observer(LoginForm);
