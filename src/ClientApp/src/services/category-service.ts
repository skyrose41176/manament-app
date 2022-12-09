import {categoryApi} from '../apis';
import {Category, QueryParams, ResultData} from '../models';
import {setShowAlert} from '../redux/slice/alertSlice';
import store from '../redux/store';

const categoryService = {
  getAll: async (params: QueryParams): Promise<ResultData<Category> | undefined> => {
    try {
      const res = await categoryApi.getAll(params);
      if (res.succeeded) {
        return res.data;
      }
    } catch (error) {
      console.log('Lỗi get all category');
    }
  },
  getAllParent: async (params: QueryParams): Promise<ResultData<Category> | undefined> => {
    try {
      const res = await categoryApi.getAllParent(params);
      if (res.succeeded) {
        return res.data;
      }
    } catch (error) {
      console.log('Lỗi get all category parent');
    }
  },
  getOne: async (id: number | string): Promise<Category | undefined> => {
    try {
      const res = await categoryApi.getOne(id);
      if (res.succeeded) {
        return res.data;
      }
    } catch (error) {
      console.log('Lỗi get category');
    }
  },
  create: async (data: Partial<Category>): Promise<Category | undefined> => {
    try {
      const res = await categoryApi.create(data);
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
  update: async (id: number | string, data: Partial<Category>): Promise<number | undefined> => {
    try {
      const res = await categoryApi.update(id, data);
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
      const res = await categoryApi.delete(id);
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
  cache: async (): Promise<Category[] | undefined> => {
    try {
      const res = await categoryApi.cache();
      return res;
    } catch (error) {
      console.log('Lỗi get cache category');
    }
  },
  loadCache: async (): Promise<Category[] | undefined> => {
    try {
      const res = await categoryApi.loadCache();
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
      // const res = await categoryApi.flush();
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

export default categoryService;
