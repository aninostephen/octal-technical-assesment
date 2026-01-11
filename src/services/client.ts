import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

const client = {
  get: <T = any>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => api.get<T>(url, config),
  post: <T = any>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => api.post<T>(url, data, config),
  put: <T = any>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => api.put<T>(url, data, config),
  delete: <T = any>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => api.delete<T>(url, config),
};

export default client;