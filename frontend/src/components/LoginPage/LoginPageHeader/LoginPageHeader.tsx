import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import classes from './LoginPageHeader.module.scss'

const LoginPageHeader = ():JSX.Element => {

    return (
        <div className={classes.component}>
            <AppBar position="sticky">
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6">
                        QuizApp
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default LoginPageHeader;
