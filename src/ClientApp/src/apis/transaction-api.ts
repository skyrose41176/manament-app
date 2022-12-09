import {Transaction, QueryParams, ResponseData, ResultData} from '../models';
import axiosClient from './axiosClient';

export interface PostDoiSoat {
  ngayBatDau: string;
  ngayKetThuc: string;
  doiSoatTrans: [
    {
      transactionId: string;
      productId: number;
      voucherCode: string;
      state: number;
      customerId: string;
      created: Date;
    }
  ];
}

export interface StateTrans {
  channel: string;
  transactionId: string;
  productCode: string;
  voucherCode: string;
  expiryDate: string;
  stateCode: 1;
  stateText: string;
  used_time: string;
  used_brand: string;
}

const billApi = {
  getAll: (
    params: QueryParams & {from?: string; to?: string}
  ): Promise<ResponseData<ResultData<Transaction>>> => {
    const url = '/transaction';
    return axiosClient.get(url, {params});
  },
  getOne: (id: number | string): Promise<ResponseData<Transaction>> => {
    const url = `/transaction/${id}`;
    return axiosClient.get(url);
  },
  create: (data: Partial<Transaction>): Promise<ResponseData<Transaction>> => {
    const url = '/transaction';
    return axiosClient.post(url, data);
  },
  update: (id: number | string, data: Partial<Transaction>): Promise<ResponseData<number>> => {
    const url = `/transaction/${id}`;
    return axiosClient.put(url, data);
  },
  delete: (id: number | string): Promise<ResponseData<number>> => {
    const url = `/transaction/${id}`;
    return axiosClient.delete(url);
  },
  doiSoat: (
    data: PostDoiSoat
  ): Promise<
    ResponseData<{
      doiSoatKhop: any[];
      doiSoatKhongKhopF5s: any[];
      doiSoatKhongKhopBvb: any[];
    }>
  > => {
    const url = `/transaction/doiSoat`;
    return axiosClient.post(url, data);
  },
  stateTrans: (params: {partner: string; transId: string}): Promise<ResponseData<StateTrans>> => {
    const url = `/transaction/state-trans`;
    return axiosClient.get(url, {params});
  },
  giaoDich: (
    params: QueryParams & {from?: string; to?: string}
  ): Promise<ResponseData<ResultData<Transaction>>> => {
    const url = '/transaction/giao-dich';
    return axiosClient.get(url, {params});
  },
  cache: (): Promise<Transaction[]> => {
    const url = '/transaction/cache';
    return axiosClient.get(url);
  },
  loadCache: (): Promise<Transaction[]> => {
    const url = '/transaction/load-cache';
    return axiosClient.get(url);
  },
  flush: (): Promise<ResponseData<number>> => {
    const url = `/transaction/flush`;
    return axiosClient.delete(url);
  },
};

export default billApi;
