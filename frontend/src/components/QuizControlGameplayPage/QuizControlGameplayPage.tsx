import React, { useEffect } from 'react';

import classes from './QuizControlGameplayPage.module.scss';
import Header from '../common/Header';
import { observer } from 'mobx-react';

type QuizControlGameplayPageProps = {};

const QuizControlGameplayPage: React.FC<QuizControlGameplayPageProps> = ({}) => {

    useEffect(() => {

    }, [])

  return (
    <div className={classes.component}>
        <Header />
        <div className={classes.content}></div>
      QuizControlGameplayPage
    </div>
  );
};

export default observer(QuizControlGameplayPage);
