import React, {useEffect} from 'react';

import LoginForm from './LoginForm';
import LoginPageHeader from '../common/LoginPageHeader';
import {useLocation, useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react';
import classes from './LoginPage.module.scss';
import authStore from "../../stores/authStore";

type LoginPageProps = {};

const LoginPage: React.FC<LoginPageProps> = ({}) => {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (authStore.isAuth || document.cookie.includes('JWT_AUTH_TOKEN')) navigate('/')
    }, [authStore.isAuth, location.pathname])

  return (
    <div className={classes.component}>
        <LoginPageHeader />
        <LoginForm />
    </div>
  );
};

export default observer(LoginPage);
