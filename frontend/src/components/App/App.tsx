import React from 'react';
import {observer} from 'mobx-react'
import Header from '../common/Header';
import classes from './App.module.scss'
import QuizControlSessionPage from '../QuizControlSessionPage';

const App = (): JSX.Element =>  {

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
