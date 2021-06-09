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

import MyInfoContainer from './containers/user/MyInfoContainer';
import SearchAuthContainer from './containers/user/SearchAuthContainer';
import QnaDetailContainer from './containers/qna/QnaDetailContainer'
import StudyDetailContainer from './containers/study/StudyDetailContainer'
import Auth from './hoc/auth';

const App = () => {
  return (
    <div>
      <FramePage>
        <Route path="/" component={Auth(HomeContainer, null)} exact />
        <Route path="/login" component={Auth(LoginContainer, false)} />
        <Route path="/register" component={Auth(RegisterContainer, false)} />
        <Route path="/search/:type" component={Auth(SearchAuthContainer, null)} />
        <Route path="/todo" component={Auth(TodoContainer, true)} />
        <Route path="/myinfo" component={Auth(MyInfoContainer, true)} />
        <Route path="/study" component={Auth(BoardIntroContainer, null)} exact />
        <Route path="/study/:type" component={Auth(StudyBoardContainer, null)} exact />
        <Route path="/study/board/:number" component={Auth(StudyDetailContainer, true)} exact />

        {/* true로 바꿔야함 */}
        <Route path="/study/:type/write" component={Auth(StudyWriteContainer, true)} />
        <Route path="/qna" component={Auth(BoardIntroContainer, null)} exact />
        <Route path="/qna/:type" component={Auth(QnaBoardContainer, null)} exact />
        <Route path="/qna/board/:number" component={Auth(QnaDetailContainer, true)} exact />

        {/* true로 바꿔야함 */}
        <Route path="/qna/:type/write" component={Auth(QnaWriteContainer, true)} />
      </FramePage>

    </div>
  );
};



export default App;



