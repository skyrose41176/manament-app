import {ResponseData} from '../models';
import axiosClient from './axiosClient';

const campaignProductApi = {
  delete: (
    campaignId: number | string,
    productId: number | string
  ): Promise<ResponseData<number>> => {
    const url = `/campaignProduct/${campaignId}/${productId}`;
    return axiosClient.delete(url);
  },
};

export default campaignProductApi;
