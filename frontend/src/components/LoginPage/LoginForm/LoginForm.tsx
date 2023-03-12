import React, { useState } from 'react';

import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import classes from './LoginForm.module.scss';

type LoginFormProps = {};

const LoginForm: React.FC<LoginFormProps> = ({}) => {

    const [name, setName] = useState<string>("");

  return (
    <div className={classes.component}>
        <Typography variant="h4" color="primary">
            Привет!
        </Typography>
        <TextField
            label="Введи имя"
            placeholder="Имя"
            variant="outlined"
            size="medium"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <Button
            color="primary"
            variant="outlined"
            size="large"
            disabled={name?.length < 3}
            onClick={() => alert(name)}

        >
            Отправить
        </Button>
    </div>
  );
};

export default LoginForm;
