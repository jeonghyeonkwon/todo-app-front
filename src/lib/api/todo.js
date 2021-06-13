import client, { loadToken } from './client';

export const fetchTodo = ({ userId, status, page }) =>
    client.get(`/${userId}/todo?status=${status}&size=10&page=${page}`, {
        headers: loadToken()
    })

export const writeTodo = ({ userId, form }) =>
    client.post(`/${userId}/todo`, form, {
        headers: loadToken()
    })

export const achieveTodo = ({ userId, cardId }) =>
    client.patch(`/${userId}/todo/${cardId}`, 'success', {
        headers: loadToken()
    })