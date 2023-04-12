import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import classes from './QuestionsAndAnswersPage.module.scss';
import quizStore from '../../../stores/quizStore';

type QuestionsAndAnswersPageProps = {
    sessionId: string;
};

const QuestionsAndAnswersPage: React.FC<QuestionsAndAnswersPageProps> = ({ sessionId }) => {

    const { currentQuestion, getCurrentQuestion } = quizStore

    useEffect(() => {
        if (sessionId) getCurrentQuestion(sessionId);
    },[sessionId])

  return (
    <div className={classes.component}>
        {currentQuestion.questionText}
    </div>
  );
};

export default observer(QuestionsAndAnswersPage);
