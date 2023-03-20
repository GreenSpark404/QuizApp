import React, { useState } from 'react';

import classes from './QuizCreatePage.module.scss';
import Header from '../common/Header';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { FormControlLabel, List, ListItem, ListItemIcon, Switch, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import {Accordion, AccordionDetails, AccordionSummary, IconButton, Paper} from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react';

type Question = {
    questionText: string,
    correctAnswer: string,
    answers: Array<string>,
};

type Answers = Omit<Question, "questionText">

const mockQuestions = [
    {
        questionText: 'Вопрос 1',
        correctAnswer: '',
        answers: [],
    },
    {
        questionText: 'Вопрос 2',
        correctAnswer: '',
        answers: [],
    },
    {
        questionText: 'Вопрос 3',
        correctAnswer: '',
        answers: [],
    },
];

const mockAnswersFor1stQuestion =
{
    questionText: 'Вопрос 1',
    correctAnswer: 'Правильный ответ',
    answers: ['Неправильный ответ', 'Неправильный ответ', 'Неправильный ответ'],
};


const newQuestion: Question = {
    questionText: '',
    correctAnswer: '',
    answers: [],
}

const QuizCreatePage: React.FC = () => {

    const navigate = useNavigate();

    const [quizName, setQuizName] = useState<string>();
    const [quizDescription, setQuizDescription] = useState<string>();

    const [questionList, setQuestionList] = useState<Array<Question>>([]);
    const [answers, setAnswers] = useState<Array<Answers>>([]);

    const addQuestionHandler = (): void => {
        //setQuestionList([...questionList, newQuestion])
    };

    const addAnswerHandler = (): void => {
        //setQuestionList([...questionList, newQuestion])
    };

    console.log(questionList);

  return (
    <div className={classes.component}>
      <Header />
        <div className={classes.buttonsWrapper}>
            <Button
                className={classes.button}
                variant="outlined"
                onClick={() => navigate('/')}
                startIcon={<ArrowBackIcon />}
            >
                На главную
            </Button>
            <Button
                variant="text"
                endIcon={<SaveIcon />}
            >
                Сохранить
            </Button>
        </div>
            <Paper elevation={3} className={classes.createQuizSection}>
                <TextField
                    variant="outlined"
                    value={quizName}
                    placeholder="Название квиза"
                    onChange={e => setQuizName(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    value={quizDescription}
                    placeholder="Описание"
                    onChange={e => setQuizDescription(e.target.value)}
                />
                <List dense>
                    {mockQuestions.map((q) => (
                        <ListItem>
                            <ListItemIcon>
                                <HelpOutlineIcon />
                            </ListItemIcon>
                            {q.questionText}
                        </ListItem>))
                    }
                </List>
            </Paper>
            <div className={classes.addQuestionWrapper}>
                <div>
                    <Button
                        variant="contained"
                        onClick={addQuestionHandler}
                    >
                        Добавить вопрос
                    </Button>
                </div>
                <div className={classes.questionFormWrapper}>
                    <TextField
                        variant="outlined"
                        placeholder="Вопрос"
                        fullWidth
                    />
                    <List dense>
                        <ListItem>
                            <ListItemIcon>
                                <div style={{color: 'green'}}>Ответ</div>
                            </ListItemIcon>
                            {mockAnswersFor1stQuestion.correctAnswer}
                        </ListItem>
                        {mockAnswersFor1stQuestion.answers.map((a) => (
                            <ListItem>
                                <ListItemIcon>
                                    Ответ
                                </ListItemIcon>
                                {a}
                            </ListItem>))
                        }
                    </List>
                    <div className={classes.addAnswerButtonWrapper}>
                        <Button
                            variant="contained"
                            onClick={addAnswerHandler}
                        >
                            Добавить ответ
                        </Button>
                    </div>
                    <div className={classes.answerWrapper}>
                        <TextField
                            variant="outlined"
                            placeholder="Ответ"
                            fullWidth
                        />
                        <FormControlLabel
                            value="bottom"
                            control={<Switch color="primary" />}
                            label="Правильный"
                            labelPlacement="bottom"
                        />
                    </div>
                </div>
            </div>
    </div>
  );
};

export default observer(QuizCreatePage);
