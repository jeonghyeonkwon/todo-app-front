import client from './client';

export const localList = () => client.get('/locallist');