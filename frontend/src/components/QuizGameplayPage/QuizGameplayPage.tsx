import React, { useEffect, useState } from 'react';

import classes from './QuizGameplayPage.module.scss';
import Header from '../common/Header';
import { useLocation, useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import quizStore from '../../stores/quizStore';

type QuizGameplayPageProps = {};

const QuizGameplayPage: React.FC<QuizGameplayPageProps> = ({}) => {

    const params = { params: useParams() };

    const [sessionId, setSessionId] = useState<string>('');
    const [playerLogin, setPlayerLogin] = useState<string>('');
    const location = useLocation();

    useEffect(() => {
        setSessionId(params.params['*']!!)
    }, [location.pathname])

    const playerLoginHandler = (): void => {
        quizStore.regPlayer(sessionId, playerLogin);
    };

  return (
    <div className={classes.component}>
      <Header />
        <div className={classes.title}>
            <Typography
                variant="h4"
                color="primary"
            >
                Привет!
            </Typography>
        </div>
        <div className={classes.regPlayerForm}>
            <TextField
                label="Введи имя"
                placeholder="Имя"
                variant="outlined"
                value={playerLogin}
                onChange={(e) => setPlayerLogin(e.target.value)}
                fullWidth
            />
            <Button
                className={classes.playerLoginButton}
                color="primary"
                variant="outlined"
                size="large"
                disabled={(playerLogin?.length < 3)}
                onClick={playerLoginHandler}

            >
                Войти
            </Button>
        </div>
    </div>
  );
};

export default QuizGameplayPage;
