import React, { useEffect } from 'react';

import classes from './QuizControlPage.module.scss';
import quizStore from '../../stores/quizStore';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { observer } from 'mobx-react';
import { Accordion, AccordionDetails, AccordionSummary, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

type QuizControlPageProps = {};

const QuizControlPage: React.FC<QuizControlPageProps> = ({}) => {

    useEffect(() => {
        quizStore.getQuizList();
    }, [])

    const createSessionHandler = (quizId: string): void => {
        quizStore.startSession(quizId);
    };

    console.log(quizStore.quizList);

  return (
    <div className={classes.component}>
        {quizStore.quizList.map(item =>
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
                    <TextField variant="outlined" placeholder="Ссылка на сессию"></TextField>
                </AccordionDetails>
            </Accordion>
        )}
    </div>
  );
};

export default observer(QuizControlPage);
