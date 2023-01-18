import {Product} from 'src/models/product';
import {QueryParams, ResultData} from 'src/modules/common';
import {productApi} from '../apis';
import {setShowAlert} from '../redux/slice/alertSlice';
import store from '../redux/store';

const productService = {
  getAll: async (params: QueryParams): Promise<ResultData<Product> | undefined> => {
    try {
      const res = await productApi.getAll(params);
      if (res.succeeded) {
        return res.data;
      }
    } catch (error) {
      console.log('Lỗi get all Product');
    }
  },
  getOne: async (id: number | string): Promise<Product | undefined> => {
    try {
      const res = await productApi.getOne(id);
      if (res.succeeded) {
        return res.data;
      }
    } catch (error) {
      console.log('Lỗi get Product');
    }
  },
  create: async (data: Partial<Product>): Promise<Product | undefined> => {
    try {
      const res = await productApi.create(data);
      if (res.succeeded) {
        store.dispatch(setShowAlert({type: 'success', message: 'Thêm sản phẩm thành công'}));
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
  update: async (
    id: number | string,
    data: Partial<
      Product & {categoryProducts?: any[]; xepHangProducts?: any[]; thuongHieuProducts?: any[]}
    >
  ): Promise<number | undefined> => {
    try {
      const res = await productApi.update(id, data);
      if (res.succeeded) {
        store.dispatch(setShowAlert({type: 'success', message: 'Cập nhật sản phẩm thành công'}));
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
      const res = await productApi.delete(id);
      if (res.succeeded) {
        store.dispatch(setShowAlert({type: 'success', message: 'Xóa sản phẩm thành công'}));
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
  sync: async (partner?: string): Promise<any> => {
    try {
      const res = partner ? await productApi.syncByPartner(partner) : await productApi.sync();
      if (res) {
        store.dispatch(
          setShowAlert({
            type: 'info',
            message: res.errors?.[0] || res.message || 'Đồng bộ thành công',
          })
        );
      }
    } catch (error: any) {
      store.dispatch(
        setShowAlert({
          type: 'error',
          message: error.Errors?.[0] || error.Message || 'Đã xảy ra lỗi đồng bộ sản phẩm',
        })
      );
    }
  },
  cache: async (): Promise<Product[] | undefined> => {
    try {
      const res = await productApi.cache();
      return res;
    } catch (error) {
      console.log('Lỗi get cache category');
    }
  },
  loadCache: async (): Promise<Product[] | undefined> => {
    try {
      const res = await productApi.loadCache();
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
      const res = await productApi.flush();
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

export default productService;
