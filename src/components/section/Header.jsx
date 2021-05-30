import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import image from '../../images/book-307045_1280.png';
import { logout } from '../../modules/user';
import { menuData } from '../../data/menuData';
import { withRouter } from 'react-router-dom';
const HeaderComponent = styled.header`
  display: flex;
  padding: 20px;
  width: 100%;
  height: 250px;
  /* border: 1px solid #000; */
`;
const Logo = styled.div`
  flex: 2;

  display: flex;
  justify-content: center;
  align-items: center;
  a {
    display: block;
    position: relative;
    width: 200px;
    height: 200px;
    &:hover img {
      animation: ani 2s linear infinite;
      @keyframes ani {
        0%,
        100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.1);
        }
      }
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 200px;
      height: 200px;

      z-index: 1;
    }
    h1 {
      z-index: 9999;
      position: absolute;
      top: 50%;
      right: 0;
      margin: 0px 10px 0px 0px;

      transform: translateY(-50%);
      text-align: right;

      span {
        display: block;
        color: crimson;
      }
    }
  }
`;
const Info = styled.div`
  flex: 4;
  /* border: 1px solid dodgerblue; */
  display: flex;
  flex-direction: column;
`;

const UserSection = styled.div`
  flex: 1;
  text-align: right;
`;
const LoginUser = styled.div`
  button {
    outline: 0;
    border: 0;
    background-color: #fff;
    cursor: pointer;
  }
  a,
  button {
    font-size: 16px;
    padding: 5px;
    transition: 0.5s;
    &:hover {
      color: dodgerblue;
    }
  }
`;
const AnonymousUser = styled.div`
  a {
    display: inline-block;
    padding: 5px;
    margin-right: 5px;
    transition: 0.5s;
  }
  a:hover {
    color: dodgerblue;
  }
`;
const GnbSection = styled.div`
  /* border: 1px solid black; */
  flex: 3;
  display: flex;
  justify-content: center;
`;
const Gnb = styled.ul`
  width: 700px;
  /* border: 1px solid crimson; */
  background-color: rgb(191, 162, 234);
  border-radius: 20px;
  display: flex;

  height: 60px;
  padding: 5px;
`;
const DropDownMenu = styled.ul`
  margin-top: 5px;
  border-radius: 3px;
  visibility: hidden;
  opacity: 0;
  text-align: center;
  /* border: 1px solid red; */
  transition: 0.3s;

  li {
    display: inline-block;
    border-radius: 5px;
    width: 70%;
    text-align: left;
    padding: 5px;
    background-color: #e6dfdf;
    border-bottom: 1px solid #eee;
    transition: 0.3s;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    a {
      display: block;
    }
  }
  li:hover {
    background-color: #eee;
    a {
      color: dodgerblue;
    }
  }
`;

const DropDown = styled.li`
  flex: 1;
  /* border: 1px solid crimson; */
  text-align: center;
  & > a {
    margin-top: 5px;
    color: #fff;
    font-size: 25px;
    font-weight: 200;
    display: inline-block;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      background-color: #fff;
      height: 2px;
      width: 5px;
      bottom: -3px;
      left: 50%;
      transition: 0.5s;
      transform: translateX(-50%);
    }
    &:hover:before {
      width: 100%;
    }
  }

  & > a:hover + ${DropDownMenu}, ${DropDownMenu}:hover {
    visibility: visible;
    opacity: 1;
  }
`;

const Header = ({ history }) => {
  const { accountId, accountName } = useSelector(({ user }) => ({
    accountId: user.account.accountId,
    accountName: user.account.accountName,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(accountName);
  }, []);
  const onClickLogout = (e) => {
    dispatch(logout());

    history.push('/');
    window.location.reload();
  };
  return (
    <HeaderComponent>
      <Logo>
        <Link to="/">
          <img src={image} />
          <h1>
            <span>MY STUDY</span> TODO
          </h1>
        </Link>
      </Logo>
      <Info>
        <UserSection>
          {accountName ? (
            <LoginUser>
              <b>{accountName}</b>님 반갑습니다
              <Link to="/myinfo">회원 정보 수정</Link>
              <button onClick={onClickLogout}>로그아웃</button>
            </LoginUser>
          ) : (
            <AnonymousUser>
              <Link to="/login">로그인</Link>
              <Link to="/register">회원가입</Link>
            </AnonymousUser>
          )}
        </UserSection>
        <GnbSection>
          <Gnb>
            <DropDown>
              <Link to="/todo">MY TODO</Link>
            </DropDown>
            <DropDown>
              <Link to="/study">스터디 모집</Link>
              <DropDownMenu>
                {menuData.map((data) => (
                  <li>
                    <Link to={`/study/${data.type}?page=0&local=ALL`}>
                      {data.name}
                    </Link>
                  </li>
                ))}
              </DropDownMenu>
            </DropDown>
            <DropDown>
              <Link to="/qna">질문 게시판</Link>
              <DropDownMenu>
                {menuData.map((data) => (
                  <li>
                    <Link key={data.type} to={`/qna/${data.type}?page=0`}>
                      {data.name}
                    </Link>
                  </li>
                ))}
              </DropDownMenu>
            </DropDown>
          </Gnb>
        </GnbSection>
      </Info>
    </HeaderComponent>
  );
};

export default withRouter(Header);
