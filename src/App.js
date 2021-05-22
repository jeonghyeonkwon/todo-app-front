import React from 'react';


import './App.css'
import { Route } from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';
import LoginContainer from './containers/user/LoginContainer';
import FramePage from './containers/FramePage';
import RegisterContainer from './containers/user/RegisterContainer';
import TodoContainer from './containers/todo/TodoContainer';

import BoardIntroContainer from './containers/BoardIntroContainer';
import QnaBoardContainer from './containers/qna/QnaBoardContainer';
import StudyBoardContainer from './containers/study/StudyBoardContainer';
import QnaWriteContainer from './containers/qna/QnaWriteContainer';
import StudyWriteContainer from './containers/study/StudyWriteContainer'
import BoardDetailContainer from './containers/BoardDetailContainer';
import MyInfoContainer from './containers/user/MyInfoContainer';
import SearchAuthContainer from './containers/user/SearchAuthContainer';

const App = () => {
  return (
    <div>
      <FramePage>
        <Route path="/" component={HomeContainer} exact />
        <Route path="/login" component={LoginContainer} />
        <Route path="/register" component={RegisterContainer} />
        <Route path="/search/:type" component={SearchAuthContainer} />
        <Route path="/todo" component={TodoContainer} />
        <Route path="/myinfo" component={MyInfoContainer} />
        <Route path="/study" component={BoardIntroContainer} exact />
        <Route path="/study/:type" component={StudyBoardContainer} exact />
        <Route path="/study/board/:number" component={BoardDetailContainer} exact />
        <Route path="/study/:type/write" component={StudyWriteContainer} />
        <Route path="/qna" component={BoardIntroContainer} exact />
        <Route path="/qna/:type" component={QnaBoardContainer} exact />
        <Route path="/qna/board/:number" component={BoardDetailContainer} exact />
        <Route path="/qna/:type/write" component={QnaWriteContainer} />
      </FramePage>

    </div>
  );
};



export default App;



