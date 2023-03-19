import React from 'react';

import classes from './QuizCreatePage.module.scss';
import Header from '../common/Header';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

type QuizCreatePageProps = {};

const QuizCreatePage: React.FC<QuizCreatePageProps> = ({}) => {

    const navigate = useNavigate();

  return (
    <div className={classes.component}>
      <Header />
        <Button
            variant="outlined"
            onClick={() => navigate('/')}
            startIcon={<ArrowBackIcon />}
        >
            На главную
        </Button>
    </div>
  );
};

export default QuizCreatePage;
