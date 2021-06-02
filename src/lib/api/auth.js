import client from './client';

export const login = (form) =>
    client.post('/authenticate', form);

export const check = (token) =>
    client.get('/auth/check', {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token.replace(/\"/gi, "")}`
        }
    });


export const logout = () => client.post('/logout')


//아이디 찾기
export const searchId = (form) => client.get(`/search-id?accountName=${form.accountName}&tel=${form.tel}`);

//비밀번호 찾기
export const searchPw = (form) => client.get(`/search-pw?accountId=${form.accountId}&accountName=${form.accountName}&tel=${form.tel}`);
// 비밀번호 변경
export const updatePw = (form) => client.patch(`/search-pw/${form.id}`, form);