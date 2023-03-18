import React, {useEffect} from 'react';
import {observer} from 'mobx-react'
import Header from '../common/Header';
import classes from './App.module.scss'
import QuizControlSessionPage from '../QuizControlSessionPage';
import {useNavigate} from "react-router-dom";
import authStore from "../../stores/authStore";

function App(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        if (!authStore.isAuth && !document.cookie.includes('JWT_AUTH_TOKEN')) {
            navigate('/login')
        }
    }, [authStore.isAuth])

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
