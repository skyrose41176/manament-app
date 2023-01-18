import bannerApi from 'src/apis/banner-api';
import {Banner} from 'src/models/banner';
import {QueryParams, ResultData} from 'src/modules/common';
import {setShowAlert} from '../redux/slice/alertSlice';
import store from '../redux/store';

const bannerService = {
  getAll: async (params: QueryParams): Promise<ResultData<Banner> | undefined> => {
    try {
      const res = await bannerApi.getAll(params);
      if (res.succeeded) {
        return res.data;
      }
    } catch (error) {
      console.log('Lỗi get all banner');
    }
  },
  getOne: async (id: number | string): Promise<Banner | undefined> => {
    try {
      const res = await bannerApi.getOne(id);
      if (res.succeeded) {
        return res.data;
      }
    } catch (error) {
      console.log('Lỗi get banner');
    }
  },
  create: async (data: Partial<Banner>): Promise<Banner | undefined> => {
    try {
      const res = await bannerApi.create(data);
      if (res.succeeded) {
        store.dispatch(setShowAlert({type: 'success', message: 'Thêm banner thành công'}));
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
  update: async (id: number | string, data: Partial<Banner>): Promise<number | undefined> => {
    try {
      const res = await bannerApi.update(id, data);
      if (res.succeeded) {
        store.dispatch(setShowAlert({type: 'success', message: 'Cập nhật banner thành công'}));
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
      const res = await bannerApi.delete(id);
      if (res.succeeded) {
        store.dispatch(setShowAlert({type: 'success', message: 'Xóa banner thành công'}));
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

export default bannerService;
