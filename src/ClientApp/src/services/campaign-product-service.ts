import {campaignProductApi} from 'src/apis';
import {setShowAlert} from '../redux/slice/alertSlice';
import store from '../redux/store';

const campaignProductService = {
  delete: async (
    campaignId: number | string,
    productId: number | string
  ): Promise<number | undefined> => {
    try {
      const res = await campaignProductApi.delete(campaignId, productId);
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
};

export default campaignProductService;
