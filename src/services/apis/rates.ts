import client from '../client';

const URL = '/rates';

export const ratesApi = {
    getAll: (url: string = URL) => client.get(url),
    getById: (id: string | number, url: string = URL) => client.get(`${url}/${id}`),
    create: (data: any, url: string = URL) => client.post(url, data),
    update: (id: string | number, data: any, url: string = URL) => client.put(`${url}/${id}`, data),
    delete: (id: string | number, url: string = URL) => client.delete(`${url}/${id}`),
}; 