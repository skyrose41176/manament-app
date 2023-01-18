import {Product} from 'src/models/product';
import {QueryParams, ResponseData, ResultData} from 'src/modules/common';
import axiosClient from './axiosClient';

const productApi = {
  getAll: (params: QueryParams): Promise<ResponseData<ResultData<Product>>> => {
    const url = '/product';
    return axiosClient.get(url, {params});
  },
  getOne: (id: number | string): Promise<ResponseData<Product>> => {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },
  create: (data: Partial<Product>): Promise<ResponseData<Product>> => {
    const url = '/product';
    return axiosClient.post(url, data);
  },
  update: (id: number | string, data: Partial<Product>): Promise<ResponseData<number>> => {
    const url = `/product/${id}`;
    return axiosClient.put(url, data);
  },
  delete: (id: number | string): Promise<ResponseData<number>> => {
    const url = `/product/${id}`;
    return axiosClient.delete(url);
  },
  sync: (): Promise<any> => {
    const url = `/product/sync`;
    return axiosClient.get(url);
  },
  syncByPartner: (partner: string): Promise<any> => {
    const url = `/product/sync-by-partner`;
    return axiosClient.get(url, {
      params: {
        partner,
      },
    });
  },

  cache: (): Promise<Product[]> => {
    const url = '/product/cache';
    return axiosClient.get(url);
  },
  loadCache: (): Promise<Product[]> => {
    const url = '/product/load-cache';
    return axiosClient.get(url);
  },
  flush: (): Promise<ResponseData<number>> => {
    const url = `/product/flush`;
    return axiosClient.delete(url);
  },
};

export default productApi;
