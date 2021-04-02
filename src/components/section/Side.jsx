import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const DropDownMenu = styled.ul`
  margin: 0;

  width: 100%;
  left: 0;
  top: 0;
  li {
    border-bottom: 1px solid #c5bcbc;

    background: rgb(239, 237, 238);
    transition: 0.5s;
    a {
      display: block;
      width: 100%;
      padding: 5px;
      transition: 0.5s;
    }
  }
  li:hover {
    a {
      color: #fff;
      background: #aaa9a9;
    }
  }
`;
const DropDown = styled.div`
  border: 1px solid #eee;
  button {
    outline: none;
    border: none;
    font-size: 19px;
    cursor: pointer;
    padding: 5px;
    width: 100%;
    background: rgb(223, 221, 238);
    transition: 0.5s;
    a {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    &:hover {
      background: rgb(160, 208, 191);
      a {
        color: #fff;
      }
    }
  }
`;
const SideTitle = styled.div`
  width: inherit;
  padding: 5px;
  background: rgb(191, 189, 238);
  border-radius: 10px 10px 0 0;
  text-align: center;
  color: #fff;
  font-size: 20px;
`;
const SideMenu = styled.div`
  width: 100%;
`;
const SideComponent = styled.div`
  /* width: 250px; */
  flex: 1;
  height: 800px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  justify-content: center;
`;
const Side = () => {
  return (
    <SideComponent>
      <SideMenu>
        <SideTitle>메뉴</SideTitle>
        <DropDown>
          <button>
            <Link to="/todo">MY TODO</Link>
          </button>
        </DropDown>
        <DropDown>
          <button>
            <Link to="/study">스터디 모집</Link>
          </button>
          <DropDownMenu>
            <li>
              <Link to="/study/language">프로그래밍 언어</Link>
            </li>
            <li>
              <Link to="/study/mobile">모바일</Link>
            </li>
            <li>
              <Link to="/study/web">웹</Link>
            </li>
            <li>
              <Link to="/study/db">DB</Link>
            </li>
          </DropDownMenu>
        </DropDown>
        <DropDown>
          <button>
            <Link to="/qna">질문 게시판</Link>
          </button>
          <DropDownMenu>
            <li>
              <Link to="/qna/language">프로그래밍 언어</Link>
            </li>
            <li>
              <Link to="/qna/mobile">모바일</Link>
            </li>
            <li>
              <Link to="/qna/web">웹</Link>
            </li>
            <li>
              <Link to="/qna/db">DB</Link>
            </li>
          </DropDownMenu>
        </DropDown>
      </SideMenu>
    </SideComponent>
  );
};

export default Side;
