import React from 'react';
import { observer } from 'mobx-react'
import Header from '../common/Header';
import QuizControlPage from '../QuizControlPage';
import classes from './App.module.scss'

function App(): JSX.Element {

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
