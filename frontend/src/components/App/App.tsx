import React, { useEffect } from 'react';
import { observer } from 'mobx-react'
import Header from '../common/Header';
import classes from './App.module.scss'
import authStore from '../../stores/authStore';
import { useNavigate, useLocation } from 'react-router-dom';

function App(): JSX.Element {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!authStore.isAuth) navigate('/login')
    }, [authStore.isAuth, location.pathname])

  return (
      <>
          <Header />
          <div className={classes.component}>
              main page
          </div>
      </>
  );
}

export default observer(App);
