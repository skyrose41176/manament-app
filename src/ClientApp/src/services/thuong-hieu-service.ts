import {thuongHieuApi} from '../apis';
import {QueryParams, ResultData, ThuongHieu} from '../models';
import {setShowAlert} from '../redux/slice/alertSlice';
import store from '../redux/store';

const thuongHieuService = {
  getAll: async (params: QueryParams): Promise<ResultData<ThuongHieu> | undefined> => {
    try {
      const res = await thuongHieuApi.getAll(params);
      if (res.succeeded) {
        return res.data;
      }
    } catch (error) {
      console.log('Lỗi get all thương hiệu');
    }
  },
  getSync: async () => {
    try {
      await thuongHieuApi.getSync();
    } catch (error) {
      console.log('Lỗi đồng bộ thương hiệu');
    }
  },
  // getAllParent: async (params: QueryParams): Promise<ResultData<Category> | undefined> => {
  //   try {
  //     const res = await categoryApi.getAllParent(params);
  //     if (res.succeeded) {
  //       return res.data;
  //     }
  //   } catch (error) {
  //     console.log('Lỗi get all category parent');
  //   }
  // },
  getOne: async (id: number | string): Promise<ThuongHieu | undefined> => {
    try {
      const res = await thuongHieuApi.getOne(id);
      if (res.succeeded) {
        return res.data;
      }
    } catch (error) {
      console.log('Lỗi get thương hiệu');
    }
  },
  // create: async (data: Partial<Category>): Promise<Category | undefined> => {
  //   try {
  //     const res = await categoryApi.create(data);
  //     if (res.succeeded) {
  //       store.dispatch(setShowAlert({type: 'success', message: 'Thêm danh mục thành công'}));
  //     }
  //     return res.data;
  //   } catch (error: any) {
  //     store.dispatch(
  //       setShowAlert({
  //         type: 'error',
  //         message: error.Errors?.[0] || error.Message || 'Đã xảy ra lỗi',
  //       })
  //     );
  //   }
  // },
  update: async (id: number | string, data: Partial<ThuongHieu>): Promise<number | undefined> => {
    try {
      const res = await thuongHieuApi.update(id, data);
      if (res.succeeded) {
        store.dispatch(setShowAlert({type: 'success', message: 'Cập nhật thương hiệu thành công'}));
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
      const res = await thuongHieuApi.delete(id);
      if (res.succeeded) {
        store.dispatch(setShowAlert({type: 'success', message: 'Xóa thương hiệu thành công'}));
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

export default thuongHieuService;
