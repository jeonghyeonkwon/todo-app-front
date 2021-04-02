import React from 'react';
import styled from 'styled-components';
import Loading from './components/common/Loading';
import Header from './components/section/Header'
import SignUp from './components/main/SignUp';
import Side from './components/section/Side'
import Footer from './components/section/Footer';
import Login from './components/main/Login';
import Board from './components/main/Board';


import './App.css'
import Tags from './components/common/Tags';
import CreateBoard from './components/main/CreateBoard';
import BoardDetail from './components/main/BoardDetail';
import Kind from './components/common/Kind';
import Kinds from './components/main/Kinds';
import MyTodo from './components/main/MyTodo';
import Home from './components/main/Home'
import { Route } from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';
import LoginContainer from './containers/user/LoginContainer';
import FramePage from './containers/FramePage';
import RegisterContainer from './containers/user/RegisterContainer';
import TodoContainer from './containers/todo/TodoContainer';
import StudyIntroContainer from './containers/study/StudyIntroContainer';
import QnaIntroContainer from './containers/qna/QnaIntroContainer';
import QnaBoardContainer from './containers/qna/QnaBoardContainer';
import StudyBoardContainer from './containers/study/StudyBoardContainer';
import QnaWriteContainer from './containers/qna/QnaWriteContainer';
import StudyWriteContainer from './containers/study/StudyWriteContainer'
import BoardDetailContainer from './containers/BoardDetailContainer';

const App = () => {
  return (
    <div>

      <FramePage>
        <Route path="/" component={HomeContainer} exact />
        <Route path="/login" component={LoginContainer} />
        <Route path="/register" component={RegisterContainer} />
        <Route path="/todo" component={TodoContainer} />
        <Route path="/study" component={StudyIntroContainer} exact />
        <Route path="/study/:type" component={StudyBoardContainer} exact />
        <Route path="/study/board/:number" component={BoardDetailContainer} exact />
        <Route path="/study/:type/write" component={StudyWriteContainer} />
        <Route path="/qna" component={QnaIntroContainer} exact />
        <Route path="/qna/:type" component={QnaBoardContainer} exact />
        <Route path="/qna/board/:number" component={BoardDetailContainer} exact />
        <Route path="/qna/:type/write" component={QnaWriteContainer} />
      </FramePage>

    </div>
  );
};



export default App;



