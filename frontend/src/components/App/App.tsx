import React from 'react';
import Header from '../Header';
import classes from './App.module.scss'

function App(): JSX.Element {
  return (
    <div className={classes.component}>
        <Header />
    </div>
  );
}

export default App;
