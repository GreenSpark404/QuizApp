import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useNavigate } from 'react-router-dom';
import classes from './LoginPageHeader.module.scss'

const LoginPageHeader = ():JSX.Element => {

    const navigate = useNavigate();

    return (
        <div className={classes.component}>
            <AppBar position="sticky">
                <Toolbar className={classes.toolbar}>
                    <div onClick={() => navigate('/')}>
                        <Typography variant="h6">
                            QuizApp
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default LoginPageHeader;
