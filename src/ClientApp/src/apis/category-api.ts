import {Category, QueryParams, ResponseData, ResultData} from '../models';
import axiosClient from './axiosClient';

const categoryApi = {
  getAll: (params: QueryParams): Promise<ResponseData<ResultData<Category>>> => {
    const url = '/category';
    return axiosClient.get(url, {params});
  },
  getAllParent: (params: QueryParams): Promise<ResponseData<ResultData<Category>>> => {
    const url = '/category/Parent';
    return axiosClient.get(url, {params});
  },
  getOne: (id: number | string): Promise<ResponseData<Category>> => {
    const url = `/category/${id}`;
    return axiosClient.get(url);
  },
  create: (data: Partial<Category>): Promise<ResponseData<Category>> => {
    const url = '/category';
    return axiosClient.post(url, data);
  },
  update: (id: number | string, data: Partial<Category>): Promise<ResponseData<number>> => {
    const url = `/category/${id}`;
    return axiosClient.put(url, data);
  },
  delete: (id: number | string): Promise<ResponseData<number>> => {
    const url = `/category/${id}`;
    return axiosClient.delete(url);
  },
  cache: (): Promise<Category[]> => {
    const url = '/category/cache';
    return axiosClient.get(url);
  },
  loadCache: (): Promise<Category[]> => {
    const url = '/category/load-cache';
    return axiosClient.get(url);
  },
  flush: (): Promise<ResponseData<number>> => {
    const url = `/category/flush`;
    return axiosClient.delete(url);
  },
};

export default categoryApi;
