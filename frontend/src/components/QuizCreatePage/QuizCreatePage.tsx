import React, { useState } from 'react';

import classes from './QuizCreatePage.module.scss';
import Header from '../common/Header';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
    FormControlLabel,
    List,
    ListItem,
    ListItemIcon,
    Radio,
    RadioGroup,
    TextField,
    Paper
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Typography from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { Question, QuizFullItem } from '../../stores/quizStore/quizStore.model';
import quizStore from '../../stores/quizStore';



const QuizCreatePage: React.FC = () => {

    const navigate = useNavigate();

    const [quizName, setQuizName] = useState<string>();
    const [quizDescription, setQuizDescription] = useState<string>();
    const [questionList, setQuestionList] = useState<Array<Question>>([]);

    const [question, setQuestion] = useState<string>('');
    const [answers, setAnswers] = useState<Array<string>>([]);
    const [correctAnswer, setCorrectAnswer] = useState<string>('')

    const addQuestionHandler = (): void => {
        const newQuestion: Question = {
            questionText: question,
            correctAnswer: answers[Number(correctAnswer)-1],
            answers: answers,
        }

        if (questionList.some((question) => _.isEqual(question.questionText, newQuestion.questionText))) return
        setQuestionList([...questionList, newQuestion])
    };

    const answerHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, answer: string): void => {
        const addAnswer = (answer: number) => {
            let newAnswers = answers;
            newAnswers[answer] = e.target.value
            setAnswers([...newAnswers])
        }
        switch (answer) {
            case '1':
                return addAnswer(0);
            case '2':
                return addAnswer(1);
            case '3':
                return addAnswer(2);
            case '4':
                return addAnswer(3);
        }
    }

    const correctAnswerHandler = (event: React.ChangeEvent<{}>): void => {
        setCorrectAnswer((event.target as HTMLInputElement).value)
    };

    const addQuestionText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setQuestion(e.target.value)
    };

    const deleteQuestionHandler = (questionName: string): void => {
        setQuestionList(questionList.filter((question) => question.questionText !== questionName))
    };

    const addQuizHandler = (): void => {
        const newQuiz: QuizFullItem = {
            name: quizName || '',
            description: quizDescription || '',
            questionList: questionList,
        };
        quizStore.addQuiz(newQuiz);
    };

    const isError = (id: number): boolean => {
        const currentAnswer = _.clone(answers[id]);
        if (currentAnswer !== "") {
            return answers.filter((answer, i) => i !== id).includes(currentAnswer);
        }
        return false
    }

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
                disabled={!quizName || !quizDescription || !questionList.length}
                onClick={addQuizHandler}
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
                {questionList ? questionList.map((q) => (
                    <ListItem>
                        <div className={classes.questionItemWrapper}>
                            <div className={classes.questionTextWrapper}>
                                <ListItemIcon>
                                    <HelpOutlineIcon />
                                </ListItemIcon>
                                {q.questionText}
                            </div>
                            <Button
                                variant="text"
                                onClick={() => deleteQuestionHandler(q.questionText)}
                                endIcon={<DeleteForeverIcon />}
                            />
                        </div>
                    </ListItem>)) : <Typography>Список вопросов пуст</Typography>
                }
            </List>
        </Paper>
            <Button
                variant="contained"
                onClick={addQuestionHandler}
                fullWidth
                className={classes.addQuestionButton}
                disabled={!question || !correctAnswer || answers.length < 4}
            >
                Добавить вопрос
            </Button>
        <Paper elevation={3} className={classes.addQuestionWrapper}>
            <div className={classes.questionFormWrapper}>
                <TextField
                    className={classes.questionTextField}
                    value={question}
                    variant="outlined"
                    placeholder="Вопрос"
                    fullWidth
                    onChange={e => addQuestionText(e)}
                />
                <div className={classes.answerWrapper}>
                    <RadioGroup>
                        <div className={classes.answerItem}>
                            <FormControlLabel
                                value='1'
                                control={<Radio />}
                                label="правильный"
                                onChange={e => correctAnswerHandler(e)}
                            />
                            <TextField
                                error={isError(0)}
                                variant="outlined"
                                label={isError(0) ? "Уже есть" : "Ответ 1"}
                                fullWidth
                                onChange={(e) => answerHandler(e, '1')}
                            />
                        </div>
                        <div className={classes.answerItem}>
                            <FormControlLabel
                                value='2'
                                control={<Radio />}
                                label="правильный"
                                onChange={e => correctAnswerHandler(e)}
                            />
                            <TextField
                                error={isError(1)}
                                variant="outlined"
                                label={isError(1) ? "Уже есть" : "Ответ 2"}
                                fullWidth
                                onChange={(e) => answerHandler(e, '2')}
                            />
                        </div>
                        <div className={classes.answerItem}>
                            <FormControlLabel
                                value='3'
                                control={<Radio />}
                                label="правильный"
                                onChange={e => correctAnswerHandler(e)}
                            />
                            <TextField
                                error={isError(2)}
                                variant="outlined"
                                label={isError(2) ? "Уже есть" : "Ответ 3"}
                                fullWidth
                                onChange={(e) => answerHandler(e, '3')}
                            />
                        </div>
                        <div className={classes.answerItem}>
                            <FormControlLabel
                                value='4'
                                control={<Radio />}
                                label="правильный"
                                onChange={e => correctAnswerHandler(e)}
                            />
                            <TextField
                                error={isError(3)}
                                variant="outlined"
                                label={isError(3) ? "Уже есть" : "Ответ 4"}
                                fullWidth
                                onChange={(e) => answerHandler(e, '4')}
                            />
                        </div>
                    </RadioGroup>
                </div>
            </div>
        </Paper>
    </div>
  );
};

export default observer(QuizCreatePage);
