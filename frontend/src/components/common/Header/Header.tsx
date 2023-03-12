import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { SwipeableDrawer } from '@material-ui/core';
import MenuContent from './MenuContent';
import classes from './Header.module.scss'

const Header = ():JSX.Element => {

    const [state, setState] = React.useState({top: false});

    const toggleDrawer = (anchor: string, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    return (
        <div className={classes.component}>
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6">
                        QuizApp
                    </Typography>
                        <Button>
                            <Button className={classes.menuButton} onClick={toggleDrawer("top", true)}>Menu</Button>
                            <SwipeableDrawer
                                anchor="top"
                                open={state['top']}
                                onClose={toggleDrawer("top", false)}
                                onOpen={toggleDrawer("top", true)}
                                disableBackdropTransition={!iOS} disableDiscovery={iOS}
                            >
                                <MenuContent />
                            </SwipeableDrawer>
                        </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
