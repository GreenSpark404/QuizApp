import React from 'react';

import classes from './MenuContent.module.scss';
import Button from '@material-ui/core/Button';
import {useNavigate} from 'react-router-dom';
import authStore from "../../../../stores/authStore";

type MenuContentProps = {};

const MenuContent: React.FC<MenuContentProps> = ({}) => {

    const navigate = useNavigate();

    const destroySession = async (): Promise<void> => {
        await authStore.logout();
        navigate('/login');
    };

  return (
    <div className={classes.component}>
      <Button
        variant="text"
        onClick={destroySession}
      >
          Выйти
      </Button>
    </div>
  );
};

export default MenuContent;
