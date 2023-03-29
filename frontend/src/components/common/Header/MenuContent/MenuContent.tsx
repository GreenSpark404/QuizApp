import React from 'react';

import classes from './MenuContent.module.scss';
import Button from '@material-ui/core/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import authStore from "../../../../stores/authStore";

type MenuContentProps = {};

const MenuContent: React.FC<MenuContentProps> = ({}) => {

    const navigate = useNavigate();
    const location = useLocation();

    const destroySession = async (): Promise<void> => {
        await authStore.logout();
        navigate('/login');
    };
    const isVisibleCreateQuiz = !location.pathname.includes('/createQuiz') && !location.pathname.includes('/quizSession');

  return (
    <div className={classes.component}>
        <div className={classes.createQuizButtonWrapper}>
            {isVisibleCreateQuiz &&
                <Button
                    variant="outlined"
                    onClick={() => navigate('/createQuiz')}
                    fullWidth
                >
                    Создать квиз
                </Button>
            }
        </div>
        <div className={classes.logoutWrapper}>
            <Button
                variant="text"
                color="secondary"
                onClick={destroySession}
            >
                Выйти
            </Button>
        </div>
    </div>
  );
};

export default MenuContent;
