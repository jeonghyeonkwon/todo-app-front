import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Loading from '../common/Loading';
import { withRouter } from 'react-router-dom';
const msg = {
  ID_OK: {
    message: '해당 아이디를 사용할 수 있습니다.',
    color: 'yellowgreen',
  },
  ID_NO: {
    message: '이미 사용중인 아이디 입니다.',
    color: 'crimson',
  },
  ID_CHECK: {
    message: '아이디 중복 검사를 해주세요',
    color: 'crimson',
  },
  NULL_CONTENT: {
    message: '빈 정보를 채워 주세요',
    color: 'crimson',
  },
  NOT_EQUALS: {
    message: '비밀번호와 비밀번호 재입력이 맞지 않습니다.',
    color: 'crimson',
  },
};
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
    border-radius: 5px;
    font-weight: bold;
    outline: none;
  }
  button[type='submit'] {
    background: dodgerblue;
  }
  button[type='button'] {
    background: gray;
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
  height: 650px;
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
const SignUp = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [local, setLocal] = useState([]);
  const [form, setForm] = useState({
    accountId: '',
    password: '',
    rePassword: '',
    name: '',
    tel: '',
    location: '서울',
    validateCheck: false,
  });
  const [message, setMessage] = useState('');

  const duplicateCheck = async (e) => {
    e.preventDefault();
    const { accountId } = form;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/validate?accountId=${accountId}`,
      );
      console.log(response);
      setMessage(response.data.message);
      setForm({
        ...form,
        validateCheck: true,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const {
      accountId,
      password,
      rePassword,
      name,
      tel,
      location,
      validateCheck,
    } = form;
    console.log('validate', form.validateCheck);
    if (!validateCheck) {
      console.log('validate 내부', form.validateCheck);
      setMessage('ID_CHECK');
      return;
    }
    if (!accountId || !password || !rePassword || !name || !tel || !location) {
      setMessage('NULL_CONTENT');
      return;
    }
    if (password !== rePassword) {
      setMessage('NOT_EQUALS');
      return;
    }

    await axios
      .post('http://localhost:8080/api/register', form)
      .then((res) => {
        if (res.status === 201) {
          alert('회원 가입이 완료되었습니다.');
          history.push('/');
        }
      })
      .catch((e) => {
        alert(e.response.data.message);
        window.location.reload();
      });
  };
  const onChange = (e) => {
    const { value, name } = e.target;
    name === 'accountId'
      ? setForm({
          ...form,
          [name]: value,
          validateCheck: false,
        })
      : setForm({
          ...form,
          [name]: value,
        });
  };
  //지역 받기
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/register');
        setLocal(response.data.local);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  //전화번호 하이픈
  useEffect(() => {
    console.log(form.tel);
    if (form.tel.length === 10) {
      console.log('10자리 도달', form.tel);
      setForm({
        ...form,
        tel: form.tel.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
      });
    }
    if (form.tel.length === 13) {
      console.log('13자리 도달', form.tel);
      setForm({
        ...form,
        tel: form.tel
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      });
    }
  }, [form.tel]);
  return (
    <SignUpComponent>
      {loading ? (
        <Loading></Loading>
      ) : (
        <SignUpForm>
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
              <button onClick={duplicateCheck}>중복 확인</button>
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
            <MessageLabel color={msg[message].color}>
              {msg[message].message}
            </MessageLabel>
          )}
          <FormButton>
            <button type="submit" onClick={onSubmit}>
              회원가입 완료
            </button>
            <button type="button">뒤로가기</button>
          </FormButton>
        </SignUpForm>
      )}
    </SignUpComponent>
  );
};

export default withRouter(SignUp);
