import {QueryParams, ResponseData, ResultData} from '../models';
import {Campaign} from '../models/campaign';
import axiosClient from './axiosClient';

const campaignApi = {
  getAll: (params: QueryParams): Promise<ResponseData<ResultData<Campaign>>> => {
    const url = '/campaign';
    return axiosClient.get(url, {params});
  },
  getOne: (id: number | string): Promise<ResponseData<Campaign>> => {
    const url = `/campaign/${id}`;
    return axiosClient.get(url);
  },
  create: (data: Partial<Campaign>): Promise<ResponseData<Campaign>> => {
    const url = '/campaign';
    return axiosClient.post(url, data);
  },
  update: (id: number | string, data: Partial<Campaign>): Promise<ResponseData<number>> => {
    const url = `/campaign/${id}`;
    return axiosClient.put(url, data);
  },
  delete: (id: number | string): Promise<ResponseData<number>> => {
    const url = `/campaign/${id}`;
    return axiosClient.delete(url);
  },
  // cache: (): Promise<Category[]> => {
  //   const url = '/campaign/cache';
  //   return axiosClient.get(url);
  // },
  // loadCache: (): Promise<Category[]> => {
  //   const url = '/campaign/load-cache';
  //   return axiosClient.get(url);
  // },
  // flush: (): Promise<ResponseData<number>> => {
  //   const url = `/campaign/flush`;
  //   return axiosClient.delete(url);
  // },
};

export default campaignApi;
