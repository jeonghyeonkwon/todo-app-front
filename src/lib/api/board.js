import client, { loadToken } from './client';

export const qnaList = ({ skill, page }) =>
    client.get(`/qna?section=${skill}&page=${page}&size=10`);

export const studyList = ({ skill, page, local }) =>
    client.get(`/study?section=${skill}&page=${page}&size=10&local=${local}`);

export const createBoard = ({ id, boardType, skill, form }) =>
    client.post(`/${boardType}/${skill}/${id}`, form,
        {
            headers: loadToken(),
        }
    );

export const boardDetail = ({ boardType, id }) =>
    client.get(`/${boardType}/${id}`,
        {
            headers: loadToken(),
        });

export const writeComment = ({ userId, boardType, boardId, comment }) =>
    client.post(`/${userId}/${boardType}/${boardId}`, { comment }, {
        headers: loadToken(),
    });

export const commentList = ({ boardType, boardId, page }) =>
    client.get(`/${boardType}/${boardId}/comment?page=${page}&size=10`,
        {
            headers: loadToken(),
        });

export const closing = ({ userId, boardId }) =>
    client.patch(`/${userId}/study/${boardId}/closing`, {
        headers: loadToken(),
    })