import React, { useEffect, useState } from 'react';

import classes from './QuizControlGameplayPage.module.scss';
import Header from '../common/Header';
import { observer } from 'mobx-react';
import { useSubscription } from "react-stomp-hooks";
import Button from '@material-ui/core/Button';
import quizStore from '../../stores/quizStore';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Accordion, AccordionDetails, AccordionSummary, Paper, TableCell } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

type QuizControlGameplayPageProps = {};

const QuizControlGameplayPage: React.FC<QuizControlGameplayPageProps> = ({}) => {

    const { destroySession, startNextQuestion, getCurrentSession, sessionDTO, endQuestion } = quizStore;

    const [lastMessage, setLastMessage] = useState<string>("");

    const params = { params: useParams() };
    const id = params.params['*']!!;

    const navigate = useNavigate();

    useSubscription(`/gm/sessionUpdated/${id}`, (message) => setLastMessage(message.body));

    console.log(lastMessage);

    const closeSessionHandler = (): void => {
        destroySession(id);
        navigate('/');
    };

    const startNextQuestionHandler = async (): Promise<void> => {
        await startNextQuestion(id);
        getCurrentSession(id);
    };

    const endQuestionHandler = async (): Promise<void> => {
        await endQuestion(id);
        getCurrentSession(id);
    };

    useEffect(() => {
        getCurrentSession(id)
    }, [])

    const isDisabledNextQuestionButton = !!sessionDTO.state && sessionDTO.questionsCount === sessionDTO.state?.questionNumber;

    const isDisabledEndQuestionButton = (): boolean => {
        return !!(!sessionDTO.state || (!!sessionDTO.state && sessionDTO.state?.completed));
    };

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
            <Paper elevation={3} className={classes.sessionInfoWrapper}>
                <div className={classes.quizNameWrapper}>
                    <Typography variant="h6">{sessionDTO.quizName}</Typography>
                    <Typography className={classes.playersCount}>Кол-во игроков: {sessionDTO.totalPlayers}</Typography>
                </div>
                {(!!sessionDTO.state && sessionDTO.state?.answersCount !== 0) &&
                    <Typography>Всего ответили:&nbsp;
                        <span style={{color: sessionDTO.state?.correctAnswersCount !== 0 ? "green" : "#000000de"}}>
                            {sessionDTO.state?.correctAnswersCount}
                        </span> / {sessionDTO.state?.answersCount}
                    </Typography>
                }
                {!!sessionDTO.state &&
                    <Accordion className={classes.accordion}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <div className={classes.accordionHeader}>
                                <Typography style={{color: sessionDTO.state.completed ? 'red' : 'green'}}>
                                    {sessionDTO.state.completed ? 'Завершен' : 'В процессе'}
                                </Typography>
                                <Typography>Текущий вопрос: {sessionDTO.state.questionNumber} / {sessionDTO.questionsCount}</Typography>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accordionDetails}>
                            <Typography className={classes.questionText}>{sessionDTO.state.question.questionText}</Typography>
                            <table style={{tableLayout: "fixed", width: "100%"}}>
                                <tbody>
                                    <tr>
                                        <TableCell
                                            style={
                                                {
                                                    wordWrap: "break-word",
                                                    backgroundColor: sessionDTO.state.question.answers[0]
                                                    === sessionDTO.state.question.correctAnswer
                                                        ? "#81c784" : "#edeef0"
                                                }
                                            }
                                            align="center"
                                        >
                                            {sessionDTO.state.question.answers[0]}
                                        </TableCell>
                                        <TableCell
                                            style={
                                                {
                                                    wordWrap: "break-word",
                                                    backgroundColor: sessionDTO.state.question.answers[1]
                                                    === sessionDTO.state.question.correctAnswer
                                                        ? "#81c784" : "#edeef0"
                                                }
                                            }
                                            align="center"
                                        >
                                            {sessionDTO.state.question.answers[1]}
                                        </TableCell>
                                    </tr>
                                    <tr>
                                        <TableCell
                                            style={
                                                {
                                                    wordWrap: "break-word",
                                                    backgroundColor: sessionDTO.state.question.answers[2]
                                                    === sessionDTO.state.question.correctAnswer
                                                        ? "#81c784" : "#edeef0"
                                                }
                                            }
                                            align="center"
                                        >
                                            {sessionDTO.state.question.answers[2]}
                                        </TableCell>
                                        <TableCell
                                            style={
                                                {
                                                    wordWrap: "break-word",
                                                    backgroundColor: sessionDTO.state.question.answers[3]
                                                    === sessionDTO.state.question.correctAnswer
                                                        ? "#81c784" : "#edeef0"
                                                }
                                            }
                                            align="center"
                                        >
                                            {sessionDTO.state.question.answers[3]}
                                        </TableCell>
                                    </tr>
                                </tbody>
                            </table>
                        </AccordionDetails>
                    </Accordion>
                }
            </Paper>
            <Paper elevation={3} className={classes.sessionInfoWrapper}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={startNextQuestionHandler}
                    fullWidth
                    disabled={(!!sessionDTO.state && !sessionDTO.state?.completed) || isDisabledNextQuestionButton}
                >
                    {!sessionDTO.state ? 'Старт игровой сессии' : 'Следующий вопрос'}
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={endQuestionHandler}
                    fullWidth
                    disabled={isDisabledEndQuestionButton()}
                >
                    Завершить вопрос
                </Button>
            </Paper>
        </div>
    </div>
  );
};

export default observer(QuizControlGameplayPage);
