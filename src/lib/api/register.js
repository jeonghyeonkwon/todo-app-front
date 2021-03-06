import client from './client';

//아이디 중복 체크
export const idCheck = (accountId) => client.get(`/validate?accountId=${accountId}`);

export const localList = () => client.get('/register');

//회원가입
export const register = (form) => client.post('/register', form);
