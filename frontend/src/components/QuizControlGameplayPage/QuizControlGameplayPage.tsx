import React, { useEffect, useState } from 'react';

import classes from './QuizControlGameplayPage.module.scss';
import Header from '../common/Header';
import { observer } from 'mobx-react';
import { useSubscription } from "react-stomp-hooks";
import Button from '@material-ui/core/Button';
import quizStore from '../../stores/quizStore';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

type QuizControlGameplayPageProps = {};

const QuizControlGameplayPage: React.FC<QuizControlGameplayPageProps> = ({}) => {

    const [lastMessage, setLastMessage] = useState<string>("");

    const params = { params: useParams() };
    const navigate = useNavigate();

    useSubscription("/dev", (message) => setLastMessage(message.body));

    const closeSessionHandler = (): void => {
        quizStore.destroySession(params.params['*']!!);
        navigate('/');
    };

    useEffect(() => {
        quizStore.getCurrentSessionQuiz(params.params['*']!!)
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
            <div>{quizStore.sessionDTO.quizName}</div>
            <div>кол-во вопросов{quizStore.sessionDTO.questionsCount}</div>
            <div>кол-во игроков{quizStore.sessionDTO.totalPlayers}</div>
        </div>
    </div>
  );
};

export default observer(QuizControlGameplayPage);
