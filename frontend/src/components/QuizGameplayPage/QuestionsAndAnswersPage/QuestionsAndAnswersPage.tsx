import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import classes from './QuestionsAndAnswersPage.module.scss';
import quizStore from '../../../stores/quizStore';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

type QuestionsAndAnswersPageProps = {
    sessionId: string;
};

const QuestionsAndAnswersPage: React.FC<QuestionsAndAnswersPageProps> = ({ sessionId }) => {

    const { currentQuestion, getCurrentQuestion, answerTheQuestion } = quizStore

    useEffect(() => {
        if (sessionId) getCurrentQuestion(sessionId);
    },[sessionId])

    const questionAndAnswerBlock = (): JSX.Element => {
        return (
            <>
                <Typography>{currentQuestion.questionText}</Typography>
                <div className={classes.answersBlock}>
                    {currentQuestion.answers.map((item, id) =>
                        <Button
                            key={id}
                            onClick={() => answerTheQuestion(sessionId, item)}
                        >
                            {item}
                        </Button>
                    )}
                </div>
            </>
        )
    };

    const questionStateBlock = (): JSX.Element => {
        switch (true) {
            case !!currentQuestion:
                return questionAndAnswerBlock()
            case !currentQuestion.questionText:
                return <div>Вопрос завершен</div>
            default:
                return <div>Ожидайте вопроса!</div>
        }
    };

  return (
    <div className={classes.component}>
        {questionStateBlock()}
    </div>
  );
};

export default observer(QuestionsAndAnswersPage);
