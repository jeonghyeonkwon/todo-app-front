import React from 'react';
import { withRouter } from 'react-router-dom';
import Kinds from '../components/main/Kinds';
const BoardIntroContainer = ({ location }) => {
  const section = location.pathname.split('/')[1];
  return <Kinds section={section} />;
};

export default withRouter(BoardIntroContainer);
