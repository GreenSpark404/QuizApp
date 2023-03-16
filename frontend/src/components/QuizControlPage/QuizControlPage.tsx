import React, { useEffect, useState } from 'react';

import classes from './QuizControlPage.module.scss';
import quizStore from '../../stores/quizStore';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { observer } from 'mobx-react';
import { Accordion, AccordionDetails, AccordionSummary, IconButton, TextField } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import userStore from '../../stores/userStore/userStore';
import { useLocation, useNavigate } from 'react-router-dom';

type QuizControlPageProps = {};

const QuizControlPage: React.FC<QuizControlPageProps> = ({}) => {

    const { getQuizList, startSession, quizList, idSession } = quizStore;

    const [sessionLink, setSessionLink] = useState<string>("");

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!userStore.isAuth && !document.cookie.includes('JWT_AUTH_TOKEN')) {
            navigate('/login')
        } else {
            getQuizList();
        }
    }, [userStore.isAuth, location.pathname])

    useEffect(() => {
        if (idSession) setSessionLink(`http://localhost:3000/quizSession/${idSession}`)
    }, [idSession])

    const createSessionHandler = (quizId: string): void => {
        startSession(quizId);
    };

    const copySessionLinkHandler = (): void => {
        navigator.clipboard.writeText(sessionLink);
    };

  return (
    <div className={classes.component}>
        {quizList ? quizList.map(item =>
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
                    <Button variant='contained' onClick={() => createSessionHandler(item.id)}>
                        Создать сессию
                    </Button>
                    <div className={classes.textFieldWrapper}>
                        <TextField
                            variant="outlined"
                            placeholder="Ссылка на сессию"
                            value={sessionLink}
                        />
                        <IconButton color="primary" aria-label="upload picture" component="span">
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

export default observer(QuizControlPage);
