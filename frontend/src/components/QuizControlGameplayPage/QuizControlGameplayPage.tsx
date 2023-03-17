import React, { useEffect, useState } from 'react';

import classes from './QuizControlGameplayPage.module.scss';
import Header from '../common/Header';
import { observer } from 'mobx-react';
import { useSubscription } from "react-stomp-hooks";

type QuizControlGameplayPageProps = {};

const QuizControlGameplayPage: React.FC<QuizControlGameplayPageProps> = ({}) => {

    const [lastMessage, setLastMessage] = useState<string>("");

    useSubscription("/", (message) => setLastMessage(message.body));

  return (
    <div className={classes.component}>
        <Header />
        <div className={classes.content}></div>
        {lastMessage}
    </div>
  );
};

export default observer(QuizControlGameplayPage);
