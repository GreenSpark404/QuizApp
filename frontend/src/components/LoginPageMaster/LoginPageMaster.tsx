import React from 'react';

import LoginPageHeader from '../common/LoginPageHeader';
import classes from './LoginPageMaster.module.scss';

type LoginPageMasterProps = {};

const LoginPageMaster: React.FC<LoginPageMasterProps> = ({}) => {

  return (
    <div className={classes.component}>
        <LoginPageHeader />
      LoginPageMaster
    </div>
  );
};

export default LoginPageMaster;
