import {hopDongApi} from 'src/apis';
import {HopDong, QueryParams, ResultData} from '../models';
import {setShowAlert} from '../redux/slice/alertSlice';
import store from '../redux/store';

const hopDongService = {
  getAll: async (params: QueryParams): Promise<ResultData<HopDong> | undefined> => {
    try {
      const res = await hopDongApi.getAll(params);
      if (res.succeeded) {
        return res.data;
      }
    } catch (error) {
      console.log('Lỗi get all hợp đồng');
    }
  },
  getOne: async (id: number | string): Promise<HopDong | undefined> => {
    try {
      const res = await hopDongApi.getOne(id);
      if (res.succeeded) {
        return res.data;
      }
    } catch (error) {
      console.log('Lỗi get hợp đồng');
    }
  },
  create: async (data: Partial<HopDong>): Promise<HopDong | undefined> => {
    try {
      const res = await hopDongApi.create(data);
      if (res.succeeded) {
        store.dispatch(setShowAlert({type: 'success', message: 'Thêm hợp đồng thành công'}));
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
  import: async (data: {hopDongs: HopDong[]}): Promise<HopDong[] | undefined> => {
    try {
      const res = await hopDongApi.import(data);
      if (res.succeeded) {
        store.dispatch(setShowAlert({type: 'success', message: 'Import hợp đồng thành công'}));
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
  update: async (id: number | string, data: Partial<HopDong>): Promise<number | undefined> => {
    try {
      const res = await hopDongApi.update(id, data);
      if (res.succeeded) {
        store.dispatch(setShowAlert({type: 'success', message: 'Cập nhật hợp đồng thành công'}));
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
      const res = await hopDongApi.delete(id);
      if (res.succeeded) {
        store.dispatch(setShowAlert({type: 'success', message: 'Xóa hợp đồng thành công'}));
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

export default hopDongService;
