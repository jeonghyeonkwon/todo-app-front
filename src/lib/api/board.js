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
