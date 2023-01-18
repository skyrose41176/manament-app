import {QueryParams, ResponseData, ResultData} from 'src/modules/common';
import {Banner} from '../models/banner';
import axiosClient from './axiosClient';

const bannerApi = {
  getAll: (params: QueryParams): Promise<ResponseData<ResultData<Banner>>> => {
    const url = '/banner';
    return axiosClient.get(url, {params});
  },
  getOne: (id: number | string): Promise<ResponseData<Banner>> => {
    const url = `/banner/${id}`;
    return axiosClient.get(url);
  },
  create: (data: Partial<Banner>): Promise<ResponseData<Banner>> => {
    const url = '/banner';
    return axiosClient.post(url, data);
  },
  update: (id: number | string, data: Partial<Banner>): Promise<ResponseData<number>> => {
    const url = `/banner/${id}`;
    return axiosClient.put(url, data);
  },
  delete: (id: number | string): Promise<ResponseData<number>> => {
    const url = `/banner/${id}`;
    return axiosClient.delete(url);
  },
  // cache: (): Promise<Category[]> => {
  //   const url = '/banner/cache';
  //   return axiosClient.get(url);
  // },
  // loadCache: (): Promise<Category[]> => {
  //   const url = '/banner/load-cache';
  //   return axiosClient.get(url);
  // },
  // flush: (): Promise<ResponseData<number>> => {
  //   const url = `/banner/flush`;
  //   return axiosClient.delete(url);
  // },
};

export default bannerApi;
