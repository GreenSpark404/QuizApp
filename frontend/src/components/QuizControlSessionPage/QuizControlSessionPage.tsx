import React, { useEffect, useState } from 'react';

import classes from './QuizControlSessionPage.module.scss';
import quizStore, { QuizItem } from '../../stores/quizStore';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { observer } from 'mobx-react';
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Paper, TextField } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import userStore from '../../stores/userStore/userStore';
import { useNavigate } from 'react-router-dom';

type QuizControlPageProps = {};

const QuizControlSessionPage: React.FC<QuizControlPageProps> = ({}) => {

    const { getQuizList, startSession, quizList, idSession, startedSessions } = quizStore;

    const [sessionLink, setSessionLink] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        if (!userStore.isAuth && !document.cookie.includes('JWT_AUTH_TOKEN')) {
            navigate('/login');
        } else {
            getQuizList();
        }
    }, [userStore.isAuth])

    useEffect(() => {
        if (idSession) setSessionLink(`http://localhost:3000/quizSession/${idSession}`)
    }, [idSession])

    const createSessionHandler = (quiz: QuizItem ): void => {
        startSession(quiz);
    };

    const copySessionLinkHandler = (): void => {
        navigator.clipboard.writeText(sessionLink);
    };

    const navigateToControlGameplayPage = (sessionId: string): void => {
        navigate(`/quizControlSession/${sessionId}`);
    }

  return (
    <div className={classes.component}>

        <Paper
            elevation={3}
            className={classes.sessionsList}
        >
            <Typography variant="h6">Список созданных сессий:</Typography>
            {startedSessions.length && startedSessions.map((item) =>
                <div className={classes.sessionCard}>
                    <Typography>{`${item.quizName} ${item.sessionId}`}</Typography>
                    <Button onClick={() => navigateToControlGameplayPage(item.sessionId)}>Управлять</Button>
                </div>

            )}
        </Paper>
        <Typography variant="h6" className={classes.quizListTitle}>Список квизов:</Typography>
        {quizList.length ? quizList.map(item =>
            <Accordion key={item.id} className={classes.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>{item.name}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                    <Typography>
                        {item.description}
                    </Typography>
                    <Button variant='contained' onClick={() => createSessionHandler(item)}>
                        Создать сессию
                    </Button>
                    <div className={classes.textFieldWrapper}>
                        <TextField
                            variant="outlined"
                            placeholder="Ссылка на сессию"
                            value={sessionLink}
                            fullWidth
                        />
                        <IconButton color="primary">
                            <FileCopyIcon
                                color="action"
                                onClick={copySessionLinkHandler}
                                className={classes.copyButton}
                            />
                        </IconButton>
                    </div>
                </AccordionDetails>
            </Accordion>
        ) : (
            <>Список пуст</>
        )}
    </div>
  );
};

export default observer(QuizControlSessionPage);
