import moment from 'moment';
import {transactionApi} from '../apis';
import {StateTrans} from '../apis/transaction-api';
import {QueryParams, ResultData, Transaction} from '../models';
import {setShowAlert} from '../redux/slice/alertSlice';
import store from '../redux/store';

const transactionService = {
  getAll: async (
    params: QueryParams & {from?: Date; to?: Date}
  ): Promise<ResultData<Transaction> | undefined> => {
    try {
      const res = await transactionApi.getAll({
        ...params,
        from: params.from ? moment(params.from).format('YYYY-MM-DD') : undefined,
        to: params.to ? moment(params.to).format('YYYY-MM-DD') : undefined,
      });
      if (res.succeeded) {
        return res.data;
      }
    } catch (error) {
      console.log('Lỗi get all category');
    }
  },
  getOne: async (id: number | string): Promise<Transaction | undefined> => {
    try {
      const res = await transactionApi.getOne(id);
      if (res.succeeded) {
        return res.data;
      }
    } catch (error) {
      console.log('Lỗi get category');
    }
  },
  create: async (data: Partial<Transaction>): Promise<Transaction | undefined> => {
    try {
      const res = await transactionApi.create(data);
      if (res.succeeded) {
        store.dispatch(setShowAlert({type: 'success', message: 'Thêm danh mục thành công'}));
      }
      return res.data;
    } catch (error: any) {
      store.dispatch(
        setShowAlert({
          type: 'error',
          message: error.Errors?.[0] || error.Message || 'Đã xảy ra lỗi',
        })
      );
    }
  },
  update: async (id: number | string, data: Partial<Transaction>): Promise<number | undefined> => {
    try {
      const res = await transactionApi.update(id, data);
      if (res.succeeded) {
        store.dispatch(setShowAlert({type: 'success', message: 'Cập nhật danh mục thành công'}));
      }
      return res.data;
    } catch (error: any) {
      store.dispatch(
        setShowAlert({
          type: 'error',
          message: error.Errors?.[0] || error.Message || 'Đã xảy ra lỗi',
        })
      );
    }
  },
  delete: async (id: number | string): Promise<number | undefined> => {
    try {
      const res = await transactionApi.delete(id);
      if (res.succeeded) {
        store.dispatch(setShowAlert({type: 'success', message: 'Xóa danh mục thành công'}));
      }
      return res.data;
    } catch (error: any) {
      store.dispatch(
        setShowAlert({
          type: 'error',
          message: error.Errors?.[0] || error.Message || 'Đã xảy ra lỗi',
        })
      );
    }
  },
  doiSoat: async (
    data: any
  ): Promise<
    {doiSoatKhop: any[]; doiSoatKhongKhopF5s: any[]; doiSoatKhongKhopBvb: any[]} | undefined
  > => {
    try {
      const res = await transactionApi.doiSoat(data);
      if (res.succeeded) {
        store.dispatch(setShowAlert({type: 'success', message: 'Đối soát thành công'}));
        return res.data;
      }
    } catch (error: any) {
      store.dispatch(
        setShowAlert({
          type: 'error',
          message: error.Errors?.[0] || error.Message || 'Đối soát thất bại',
        })
      );
    }
  },
  stateTrans: async (params: {
    partner: string;
    transId: string;
  }): Promise<StateTrans | undefined> => {
    try {
      const res = await transactionApi.stateTrans(params);
      if (res.succeeded) {
        return res.data;
      }
    } catch (error) {
      store.dispatch(
        setShowAlert({
          type: 'error',
          message: 'Kiểm tra trạng thái giao dịch thất bại',
        })
      );
      console.log('Kiểm tra trạng thái giao dịch thất bại');
    }
  },
  giaoDich: async (
    params: QueryParams & {from?: Date; to?: Date}
  ): Promise<ResultData<Transaction> | undefined> => {
    try {
      const res = await transactionApi.giaoDich({
        ...params,
        from: params.from ? moment(params.from).format('YYYY-MM-DD') : undefined,
        to: params.to ? moment(params.to).format('YYYY-MM-DD') : undefined,
      });
      if (res.succeeded) {
        return res.data;
      }
    } catch (error) {
      console.log('Lỗi get all category');
    }
  },
  cache: async (): Promise<Transaction[] | undefined> => {
    try {
      const res = await transactionApi.cache();
      return res;
    } catch (error) {
      console.log('Lỗi get cache category');
    }
  },
  loadCache: async (): Promise<Transaction[] | undefined> => {
    try {
      const res = await transactionApi.loadCache();
      // if (res) {
      store.dispatch(setShowAlert({type: 'success', message: 'Load cache thành công'}));
      return res;
      // }
    } catch (error: any) {
      store.dispatch(
        setShowAlert({
          type: 'error',
          message: error.Errors?.[0] || error.Message || 'Đã xảy ra lỗi',
        })
      );
    }
  },
  flush: async () => {
    try {
      const res = await transactionApi.flush();
      // if (res) {
      store.dispatch(setShowAlert({type: 'success', message: 'Xóa bộ nhớ cache thành công'}));
      // }
    } catch (error: any) {
      store.dispatch(
        setShowAlert({
          type: 'error',
          message: error.Errors?.[0] || error.Message || 'Đã xảy ra lỗi',
        })
      );
    }
  },
};

export default transactionService;
