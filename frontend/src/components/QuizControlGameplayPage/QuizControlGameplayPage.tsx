import React, { useEffect } from 'react';

import classes from './QuizControlGameplayPage.module.scss';
import Header from '../common/Header';
import { observer } from 'mobx-react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

type QuizControlGameplayPageProps = {};

const QuizControlGameplayPage: React.FC<QuizControlGameplayPageProps> = ({}) => {

    const { sendMessage, lastMessage, readyState } = useWebSocket('wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self');

    useEffect(() => {
        console.log(readyState);
        console.log(lastMessage);
    }, [lastMessage])

  return (
    <div className={classes.component}>
        <Header />
        <div className={classes.content}></div>
      QuizControlGameplayPage
    </div>
  );
};

export default observer(QuizControlGameplayPage);
