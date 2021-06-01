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