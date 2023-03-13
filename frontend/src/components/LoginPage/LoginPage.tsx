import React, { useEffect } from 'react';

import LoginForm from './LoginForm';
import LoginPageHeader from '../common/LoginPageHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import authStore from '../../stores/authStore/authStore';
import Button from '@material-ui/core/Button';
import classes from './LoginPage.module.scss';

type LoginPageProps = {};

const LoginPage: React.FC<LoginPageProps> = ({}) => {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (authStore.isAuth) navigate('/')
    }, [authStore.isAuth, location.pathname])

  return (
    <div className={classes.component}>
        <LoginPageHeader />
        <div>
            <Button
                className={classes.masterLoginPage}
                size="small"
                variant="outlined"
                onClick={() => navigate('/masterLogin')}
            >
                Зайти красиво
            </Button>
        </div>
        <LoginForm />
    </div>
  );
};

export default LoginPage;
