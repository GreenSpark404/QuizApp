import React, { useEffect } from 'react';

import LoginForm from './LoginForm';
import LoginPageHeader from './LoginPageHeader';
import classes from './LoginPage.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import authStore from '../../stores/authStore/authStore';

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
        <LoginForm />
    </div>
  );
};

export default LoginPage;
