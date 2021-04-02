import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const FooterForm = styled.div`
  background: rgb(224, 208, 255);
  border: 5px solid rgb(160, 208, 191);
  border-bottom: none;
  width: 100%;
  height: 70%;
  border-radius: 20px 20px 0 0;
  padding: 30px;
  div {
    display: block;
    margin-top: 5px;
    label {
      font-weight: bold;
      margin-right: 20px;
    }
    a {
      transition: 0.5s;
      cursor: pointer;
    }
    a:hover {
      color: dodgerblue;
    }
  }
`;
const FooterComponent = styled.div`
  width: 100%;

  padding: 10px 10px 0px 10px;
  background: #fff;
`;
const Footer = () => {
  return (
    <FooterComponent>
      <FooterForm>
        <div>
          <label>Created By</label>
          <span>권정현</span>
        </div>
        <div>
          <label>용도</label>
          <span>TODO + 질문게시판 + 스터디 매칭</span>
        </div>
        <div>
          <label>사용 기술</label>
          <span>SPRING + REACT + JPA</span>
        </div>
        <div>
          <label>Github</label>
          <a href="https://github.com/jeonghyeonkwon">
            https://github.com/jeonghyeonkwon
          </a>
        </div>
      </FooterForm>
    </FooterComponent>
  );
};

export default Footer;
