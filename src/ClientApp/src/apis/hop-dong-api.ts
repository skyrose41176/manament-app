import {HopDong, QueryParams, ResponseData, ResultData} from '../models';
import axiosClient from './axiosClient';

const hopDongApi = {
  getAll: (params: QueryParams): Promise<ResponseData<ResultData<HopDong>>> => {
    const url = '/hopDong';
    return axiosClient.get(url, {params});
  },
  getOne: (id: number | string): Promise<ResponseData<HopDong>> => {
    const url = `/hopDong/${id}`;
    return axiosClient.get(url);
  },
  create: (data: Partial<HopDong>): Promise<ResponseData<HopDong>> => {
    const url = '/hopDong';
    return axiosClient.post(url, data);
  },
  import: (data: {hopDongs: HopDong[]}): Promise<ResponseData<HopDong[]>> => {
    const url = '/hopDong/Import';
    return axiosClient.post(url, data);
  },
  update: (id: number | string, data: Partial<HopDong>): Promise<ResponseData<number>> => {
    const url = `/hopDong/${id}`;
    return axiosClient.put(url, data);
  },
  delete: (id: number | string): Promise<ResponseData<number>> => {
    const url = `/hopDong/${id}`;
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

export default hopDongApi;
