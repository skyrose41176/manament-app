import {Transaction, QueryParams, ResponseData, ResultData} from '../models';
import axiosClient from './axiosClient';

const transactionFailApi = {
  getAll: (
    params: QueryParams & {from?: string; to?: string}
  ): Promise<ResponseData<ResultData<Transaction>>> => {
    const url = '/transactionFail';
    return axiosClient.get(url, {params});
  },
  getOne: (id: number | string): Promise<ResponseData<Transaction>> => {
    const url = `/transactionFail/${id}`;
    return axiosClient.get(url);
  },
  create: (data: Partial<Transaction>): Promise<ResponseData<Transaction>> => {
    const url = '/transactionFail';
    return axiosClient.post(url, data);
  },
  update: (id: number | string, data: Partial<Transaction>): Promise<ResponseData<number>> => {
    const url = `/transactionFail/${id}`;
    return axiosClient.put(url, data);
  },
  delete: (id: number | string): Promise<ResponseData<number>> => {
    const url = `/transactionFail/${id}`;
    return axiosClient.delete(url);
  },
};

export default transactionFailApi;
