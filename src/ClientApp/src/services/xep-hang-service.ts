import xepHangApi from 'src/apis/xep-hang-api';
import {XepHang} from 'src/models/xepHang';
import {QueryParams, ResultData} from '../models';
import {setShowAlert} from '../redux/slice/alertSlice';
import store from '../redux/store';

const xepHangService = {
  getAll: async (params: QueryParams): Promise<ResultData<XepHang> | undefined> => {
    try {
      const res = await xepHangApi.getAll(params);
      if (res.succeeded) {
        return res.data;
      }
    } catch (error) {
      console.log('Lỗi get all xếp hạng');
    }
  },
  getOne: async (id: number | string): Promise<XepHang | undefined> => {
    try {
      const res = await xepHangApi.getOne(id);
      if (res.succeeded) {
        return res.data;
      }
    } catch (error) {
      console.log('Lỗi get xếp hạng');
    }
  },
  create: async (data: Partial<XepHang>): Promise<XepHang | undefined> => {
    try {
      const res = await xepHangApi.create(data);
      if (res.succeeded) {
        store.dispatch(setShowAlert({type: 'success', message: 'Thêm xếp hạng thành công'}));
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
  update: async (id: number | string, data: Partial<XepHang>): Promise<number | undefined> => {
    try {
      const res = await xepHangApi.update(id, data);
      if (res.succeeded) {
        store.dispatch(setShowAlert({type: 'success', message: 'Cập nhật xếp hạng thành công'}));
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
      const res = await xepHangApi.delete(id);
      if (res.succeeded) {
        store.dispatch(setShowAlert({type: 'success', message: 'Xóa xếp hạng thành công'}));
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

export default xepHangService;
