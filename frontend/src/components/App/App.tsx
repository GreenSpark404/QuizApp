import React, {useEffect} from 'react';
import authStore from "../../stores/authStore";
import {observer} from 'mobx-react'
import Header from '../common/Header';
import classes from './App.module.scss'
import QuizControlSessionPage from '../QuizControlSessionPage';
import {useNavigate} from "react-router-dom";

const App = (): JSX.Element =>  {

    const navigate = useNavigate();

    useEffect(() => {
        if (!authStore.isAuth && !document.cookie.includes('JWT_AUTH_TOKEN')) {
            console.log("app redirect to login");
            navigate('/login')
        }
    }, [authStore.isAuth, document.cookie])

    return (
        <>
            <Header/>
            <div className={classes.component}>
                <QuizControlSessionPage/>
            </div>
        </>
    );
}

export default observer(App);
