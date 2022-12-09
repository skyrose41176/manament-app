import campaignApi from 'src/apis/campaign-api';
import {Campaign, Category, QueryParams, ResultData} from '../models';
import {setShowAlert} from '../redux/slice/alertSlice';
import store from '../redux/store';

const campaignService = {
  getAll: async (params: QueryParams): Promise<ResultData<Campaign> | undefined> => {
    try {
      const res = await campaignApi.getAll(params);
      if (res.succeeded) {
        return res.data;
      }
    } catch (error) {
      console.log('Lỗi get all chiến dịch');
    }
  },
  getOne: async (id: number | string): Promise<Campaign | undefined> => {
    try {
      const res = await campaignApi.getOne(id);
      if (res.succeeded) {
        return res.data;
      }
    } catch (error) {
      console.log('Lỗi get chiến dịch');
    }
  },
  create: async (data: Partial<Campaign>): Promise<Campaign | undefined> => {
    try {
      const res = await campaignApi.create(data);
      if (res.succeeded) {
        store.dispatch(setShowAlert({type: 'success', message: 'Thêm chiến dịch thành công'}));
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
  update: async (id: number | string, data: Partial<Campaign>): Promise<number | undefined> => {
    try {
      const res = await campaignApi.update(id, data);
      if (res.succeeded) {
        store.dispatch(setShowAlert({type: 'success', message: 'Cập nhật chiến dịch thành công'}));
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
      const res = await campaignApi.delete(id);
      if (res.succeeded) {
        store.dispatch(setShowAlert({type: 'success', message: 'Xóa chiến dịch thành công'}));
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
  // cache: async (): Promise<Category[] | undefined> => {
  //   try {
  //     const res = await categoryApi.cache();
  //     return res;
  //   } catch (error) {
  //     console.log('Lỗi get cache category');
  //   }
  // },
  // loadCache: async (): Promise<Category[] | undefined> => {
  //   try {
  //     const res = await categoryApi.loadCache();
  //     // if (res) {
  //     store.dispatch(setShowAlert({type: 'success', message: 'Load cache thành công'}));
  //     return res;
  //     // }
  //   } catch (error: any) {
  //     store.dispatch(
  //       setShowAlert({
  //         type: 'error',
  //         message: error.Errors?.[0] || error.Message || 'Đã xảy ra lỗi',
  //       })
  //     );
  //   }
  // },
  // flush: async () => {
  //   try {
  //     const res = await categoryApi.flush();
  //     // if (res) {
  //     store.dispatch(setShowAlert({type: 'success', message: 'Xóa bộ nhớ cache thành công'}));
  //     // }
  //   } catch (error: any) {
  //     store.dispatch(
  //       setShowAlert({
  //         type: 'error',
  //         message: error.Errors?.[0] || error.Message || 'Đã xảy ra lỗi',
  //       })
  //     );
  //   }
  // },
};

export default campaignService;
