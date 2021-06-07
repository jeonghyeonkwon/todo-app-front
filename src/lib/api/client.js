import axios from 'axios';

const client = axios.create();

client.defaults.baseURL = 'http://localhost:8080/api';
//client.defaults.headers.common['Authorization'] = '';

export function loadToken() {
    try {
        const token = localStorage.getItem('jwttoken');
        if (!token) {
            console.log('토큰 없음')
            return;
        }
        return {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${token.replace(/\"/gi, '')}`,
        }

    } catch (e) {
        console.log('localStorage가 작동하지 않습니다.')
        return;
    }
}
export default client;