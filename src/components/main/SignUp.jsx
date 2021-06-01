import React from 'react';
import styled from 'styled-components';
import Loading from '../common/Loading';
import { withRouter } from 'react-router-dom';
import { registerMessage } from '../../data/messageData';

const FormButton = styled.div`
  padding: 20px;
  display: block;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  button {
    margin: 0px 10px;
    padding: 5px;
    color: #fff;
    width: 150px;
    height: 40px;
    border-radius: 5px;
    font-weight: bold;
    outline: none;
  }
  button[type='submit'] {
    background: dodgerblue;
    transition: 0.4s;
    &:hover {
      background: #00537a;
    }
  }
  button[type='button'] {
    background: gray;
    transition: 0.4s;
    &:hover {
      background: #c39797;
    }
  }
`;

const Field = styled.div`
  label {
    display: block;
    margin: 10px 0;
    font-weight: bold;
  }
  label:after {
    content: '(*)';
    color: dodgerblue;
  }

  div {
    padding: 0;
    display: flex;
  }
  input,
  select {
    outline-color: #000;

    width: 250px;
    height: 30px;
    margin-right: 20px;
    font-size: 20px;
    transition: 0.5s;
  }
  input:focus {
    outline-color: dodgerblue;
  }
  button {
    width: 100px;
    height: 30px;
    margin: 0;
    outline: none;
    padding: 0;
    font-weight: bold;
  }
`;
const MessageLabel = styled.span`
  margin-top: 20px;
  width: 100%;
  display: block;
  text-align: center;
  color: ${(props) => props.color || 'black'};
`;
const SignUpForm = styled.form`
  padding: 20px;

  background: #fff;
  width: 500px;
  height: 700px;
  border-radius: 10px;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.3);
  position: relative;
`;
const SignUpComponent = styled.div`
  flex: 4;

  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
`;
const SignUp = ({
  local,
  loading,
  onChange,
  form,
  message,
  onClickIdCheck,
  onSubmitRegister,
  onClickBack,
}) => {
  //전화번호 하이픈
  // useEffect(() => {
  //   console.log(form.tel);
  //   if (form.tel.length === 10) {
  //     console.log('10자리 도달', form.tel);
  //     setForm({
  //       ...form,
  //       tel: form.tel.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
  //     });
  //   }
  //   if (form.tel.length === 13) {
  //     console.log('13자리 도달', form.tel);
  //     setForm({
  //       ...form,
  //       tel: form.tel
  //         .replace(/-/g, '')
  //         .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
  //     });
  //   }
  // }, [form.tel]);
  return (
    <SignUpComponent>
      {loading ? (
        <Loading></Loading>
      ) : (
        <SignUpForm onSubmit={onSubmitRegister}>
          <h1>회원가입</h1>
          <Field>
            <label>아이디</label>
            <div>
              <input
                type="text"
                onChange={onChange}
                name="accountId"
                value={form.accountId}
              />
              <button type="button" onClick={onClickIdCheck}>
                중복 확인
              </button>
            </div>
          </Field>
          <Field>
            <label>비밀번호</label>
            <input
              type="password"
              onChange={onChange}
              name="password"
              value={form.password}
            />
          </Field>
          <Field>
            <label>비밀번호 확인</label>
            <input
              type="password"
              name="rePassword"
              value={form.rePassword}
              onChange={onChange}
            />
          </Field>
          <Field>
            <label>이름</label>
            <input
              type="text"
              onChange={onChange}
              name="name"
              value={form.name}
            />
          </Field>
          <Field>
            <label>전화번호</label>
            <input
              type="text"
              onChange={onChange}
              name="tel"
              maxLength="12"
              value={form.tel}
            />
          </Field>
          <Field>
            <label>지역</label>

            {local && (
              <select
                onChange={onChange}
                name="location"
                value={form.location}
                onChange={onChange}
              >
                {local.map((x, i) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            )}
          </Field>
          {message && (
            <MessageLabel color={registerMessage[message].color}>
              {registerMessage[message].message}
            </MessageLabel>
          )}
          <FormButton>
            <button type="submit">회원가입 완료</button>
            <button type="button" onClick={onClickBack}>
              뒤로가기
            </button>
          </FormButton>
        </SignUpForm>
      )}
    </SignUpComponent>
  );
};

export default withRouter(SignUp);
