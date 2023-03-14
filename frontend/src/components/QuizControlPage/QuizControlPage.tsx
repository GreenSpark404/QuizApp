import React, { useEffect } from 'react';

import classes from './QuizControlPage.module.scss';
import Button from '@material-ui/core/Button';
import quizStore from '../../stores/quizStore';

type QuizControlPageProps = {};

const QuizControlPage: React.FC<QuizControlPageProps> = ({}) => {

    useEffect(() => {
        console.log(document.cookie);
        quizStore.getQuizList();
    }, [])

  return (
    <div className={classes.component}>
        <Button
            variant="contained"
        >
            Начать квиз
        </Button>
    </div>
  );
};

export default QuizControlPage;
