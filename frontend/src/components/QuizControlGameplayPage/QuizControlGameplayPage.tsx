import React, { useEffect, useState } from 'react';

import classes from './QuizControlGameplayPage.module.scss';
import Header from '../common/Header';
import { observer } from 'mobx-react';
import { useSubscription } from "react-stomp-hooks";
import Button from '@material-ui/core/Button';
import quizStore from '../../stores/quizStore';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

type QuizControlGameplayPageProps = {};

const QuizControlGameplayPage: React.FC<QuizControlGameplayPageProps> = ({}) => {

    const { destroySession, startNextQuestion, getCurrentSessionQuiz, sessionDTO } = quizStore;

    const [lastMessage, setLastMessage] = useState<string>("");

    const params = { params: useParams() };
    const navigate = useNavigate();

    useSubscription("/dev", (message) => setLastMessage(message.body));

    const closeSessionHandler = (): void => {
        destroySession(params.params['*']!!);
        navigate('/');
    };

    const startNextQuestionHandler = async (): Promise<void> => {
        await startNextQuestion(params.params['*']!!);
        getCurrentSessionQuiz(params.params['*']!!)
    };

    useEffect(() => {
        getCurrentSessionQuiz(params.params['*']!!)
    }, [])

  return (
    <div className={classes.component}>
        <Header />
        <div className={classes.content}>
            <Button
                variant="outlined"
                onClick={() => navigate('/')}
                startIcon={<ArrowBackIcon />}
            >
                На главную
            </Button>
            <div className={classes.destroySessionWrapper}>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={closeSessionHandler}
                >
                    Закрыть сессию
                </Button>
            </div>
            {lastMessage}
            <Paper elevation={3} className={classes.sessionInfoWrapper}>
                <div className={classes.quizNameWrapper}>
                    <Typography variant="h6">{sessionDTO.quizName}</Typography>
                </div>
                {!!sessionDTO.state && <Typography>Текущий вопрос: {sessionDTO.state.questionNumber}</Typography>}
                <div>Кол-во вопросов: {sessionDTO.questionsCount}</div>
                <div>Кол-во игроков: {sessionDTO.totalPlayers}</div>
            </Paper>
            <Paper elevation={3} className={classes.sessionInfoWrapper}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={startNextQuestionHandler}
                    fullWidth
                >
                    {!sessionDTO.state ? 'Старт игровой сессии' : 'Следующий вопрос'}
                </Button>
            </Paper>
        </div>
    </div>
  );
};

export default observer(QuizControlGameplayPage);
