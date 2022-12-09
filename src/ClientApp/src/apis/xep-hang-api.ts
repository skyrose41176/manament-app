import {QueryParams, ResponseData, ResultData} from '../models';
import {XepHang} from '../models/xepHang';
import axiosClient from './axiosClient';

const xepHangApi = {
  getAll: (params: QueryParams): Promise<ResponseData<ResultData<XepHang>>> => {
    const url = '/xepHang';
    return axiosClient.get(url, {params});
  },
  getOne: (id: number | string): Promise<ResponseData<XepHang>> => {
    const url = `/xepHang/${id}`;
    return axiosClient.get(url);
  },
  create: (data: Partial<XepHang>): Promise<ResponseData<XepHang>> => {
    const url = '/xepHang';
    return axiosClient.post(url, data);
  },
  update: (id: number | string, data: Partial<XepHang>): Promise<ResponseData<number>> => {
    const url = `/xepHang/${id}`;
    return axiosClient.put(url, data);
  },
  delete: (id: number | string): Promise<ResponseData<number>> => {
    const url = `/xepHang/${id}`;
    return axiosClient.delete(url);
  },
};

export default xepHangApi;
