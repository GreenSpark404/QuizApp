import React, { useEffect } from 'react';
import { observer } from 'mobx-react'
import Header from '../common/Header';
import { useNavigate, useLocation } from 'react-router-dom';
import userStore from '../../stores/userStore';
import QuizControlPage from '../QuizControlPage';
import classes from './App.module.scss'

function App(): JSX.Element {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!userStore.isAuth && !document.cookie.includes('JWT_AUTH_TOKEN')) navigate('/login')
    }, [userStore.isAuth, location.pathname])

  return (
      <>
          <Header />
          <div className={classes.component}>
              <QuizControlPage />
          </div>
      </>
  );
}

export default observer(App);
