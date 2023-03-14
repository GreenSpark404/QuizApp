import React, { useEffect } from 'react';

import LoginForm from './LoginForm';
import LoginPageHeader from '../common/LoginPageHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import userStore from '../../stores/userStore';
import { observer } from 'mobx-react';
import classes from './LoginPage.module.scss';

type LoginPageProps = {};

const LoginPage: React.FC<LoginPageProps> = ({}) => {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (userStore.isAuth) navigate('/')
    }, [userStore.isAuth, location.pathname])

  return (
    <div className={classes.component}>
        <LoginPageHeader />
        <LoginForm />
    </div>
  );
};

export default observer(LoginPage);
