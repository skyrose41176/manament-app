import {ThuongHieu, QueryParams, ResponseData, ResultData} from '../models';
import axiosClient from './axiosClient';

const thuongHieuApi = {
  getAll: (params: QueryParams): Promise<ResponseData<ResultData<ThuongHieu>>> => {
    const url = '/thuongHieu';
    return axiosClient.get(url, {params});
  },
  getSync: () => {
    const url = '/thuongHieu/sync';
    return axiosClient.get(url);
  },
  // getAllParent: (params: QueryParams): Promise<ResponseData<ResultData<ThuongHieu>>> => {
  //   const url = '/thuongHieu/Parent';
  //   return axiosClient.get(url, {params});
  // },
  getOne: (id: number | string): Promise<ResponseData<ThuongHieu>> => {
    const url = `/thuongHieu/${id}`;
    return axiosClient.get(url);
  },
  // create: (data: Partial<ThuongHieu>): Promise<ResponseData<ThuongHieu>> => {
  //   const url = '/thuongHieu';
  //   return axiosClient.post(url, data);
  // },
  update: (id: number | string, data: Partial<ThuongHieu>): Promise<ResponseData<number>> => {
    const url = `/thuongHieu/${id}`;
    return axiosClient.put(url, data);
  },
  delete: (id: number | string): Promise<ResponseData<number>> => {
    const url = `/thuongHieu/${id}`;
    return axiosClient.delete(url);
  },
  // cache: (): Promise<ThuongHieu[]> => {
  //   const url = '/thuongHieu/cache';
  //   return axiosClient.get(url);
  // },
  // loadCache: (): Promise<ThuongHieu[]> => {
  //   const url = '/thuongHieu/load-cache';
  //   return axiosClient.get(url);
  // },
  // flush: (): Promise<ResponseData<number>> => {
  //   const url = `/thuongHieu/flush`;
  //   return axiosClient.delete(url);
  // },
};

export default thuongHieuApi;
