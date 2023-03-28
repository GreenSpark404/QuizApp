import React, { useEffect } from 'react';

import classes from './QuizControlSessionPage.module.scss';
import quizStore, {QuizItem} from '../../stores/quizStore';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {observer} from 'mobx-react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Backdrop, CircularProgress,
    IconButton,
    Paper,
    TextField
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useNavigate} from 'react-router-dom';
import _ from 'lodash';
import authStore from '../../stores/authStore/authStore';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

type QuizControlPageProps = {};

const QuizControlSessionPage: React.FC<QuizControlPageProps> = ({}) => {

    const { getQuizList, startSession, quizList, idSession, startedSessions, getSessionList, isLoading } = quizStore;

    const navigate = useNavigate();

    useEffect(() => {
        if (!document.cookie.includes('JWT_AUTH_TOKEN')) {
            navigate('/login')
        }
    }, [authStore.isAuth, document.cookie])

    useEffect(() => {
        getQuizList();
    }, [])

    useEffect(() => {
        getSessionList();
    }, [idSession])

    const createSessionHandler = (quiz: QuizItem ): void => {
        startSession(quiz);
    };

    const navigateToControlGameplayPage = (sessionId: string): void => {
        navigate(`/quizControlSession/${sessionId}`);
    }

    const getLink = (sessionId: string | undefined): string => {
        if (sessionId) {
            return `http://localhost:3000/quizSession/${sessionId}`;
        }
        return '';
    };

    const copySessionLinkHandler = (sessionId: string | undefined): void => {
        if (sessionId) navigator.clipboard.writeText(getLink(sessionId));
    };

    const quizListSessionsIntersection = (quizName: string) => _.find(startedSessions, { quizName: quizName });

    const deleteQuizHandler = (id: string) => {
        quizStore.deleteQuiz(id);
    };

  return (
      <>
          <Backdrop
              open={isLoading}
              style={{zIndex: 2,
              color: '#fff'}}
          >
              <CircularProgress color="inherit" />
          </Backdrop>
          <div className={classes.component}>
              <Paper
                  elevation={3}
                  className={classes.sessionsList}
              >
                  <Typography variant="h6">Список созданных сессий:</Typography>
                  {startedSessions.length && startedSessions.map((item) =>
                      <div className={classes.sessionCard}>
                          <Typography>{`${item.quizName} ${item.id}`}</Typography>
                          <div className={classes.controlButtonWrapper}>
                              <Button onClick={() => navigateToControlGameplayPage(item.id)}>Управлять</Button>
                          </div>
                      </div>

                  )}
              </Paper>
              <Typography variant="h6" className={classes.quizListTitle}>Список квизов:</Typography>
              {quizList.length ? quizList.map(quiz =>
                  <Accordion key={quiz.id} className={classes.accordion}>
                      <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                      >
                          <Typography>{quiz.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={classes.accordionDetails}>
                          <div className={classes.description}>
                              <Typography>{quiz.description}</Typography>
                              <Button
                                  variant="text"
                                  onClick={() => deleteQuizHandler(quiz.id)}
                                  endIcon={<DeleteForeverIcon />}
                                  className={classes.deleteQuiz}
                              >
                                  <Typography variant="button">Удалить квиз</Typography>
                              </Button>
                          </div>
                          <Button
                              variant='contained'
                              onClick={() => createSessionHandler(quiz)}
                              disabled={!!quizListSessionsIntersection(quiz.name)}
                          >
                              Создать сессию
                          </Button>
                          <div className={classes.textFieldWrapper}>
                              <TextField
                                  variant="outlined"
                                  placeholder="Ссылка на сессию"
                                  value={getLink(quizListSessionsIntersection(quiz.name)?.id)}
                                  fullWidth
                              />
                              <IconButton color="primary">
                                  <FileCopyIcon
                                      color="action"
                                      onClick={() => copySessionLinkHandler(quizListSessionsIntersection(quiz.name)?.id)}
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
      </>
  );
};

export default observer(QuizControlSessionPage);
