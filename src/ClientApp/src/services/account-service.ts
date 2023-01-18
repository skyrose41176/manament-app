import {Account} from 'src/models/account';
import accountApi from '../apis/account-api';
import {setShowAlert} from '../redux/slice/alertSlice';
import store from '../redux/store';

const accountService = {
  login: async (email: string, password: string) => {
    try {
      const res = await accountApi.login(email, password);

      store.dispatch(
        setShowAlert({message: res.Message || 'Đăng nhập thành công', type: 'success'})
      );
      return res;
    } catch (error: any) {
      store.dispatch(
        setShowAlert({message: error?.Message || 'Đăng nhập thất bại', type: 'error'})
      );
    }
  },
  getAllUser: async (): Promise<any> => {
    try {
      const res = await accountApi.getAllUser();
      return res;
    } catch (error) {
      console.log('Lỗi get all user');
    }
  },
  getAllUsersByRole: async (params: any): Promise<any> => {
    try {
      const res = await accountApi.getAllUsersByRole(params);
      return res;
    } catch (error) {
      console.log('Lỗi get all user');
    }
  },
  getUserById: async (id: string | number | null): Promise<any> => {
    try {
      const res = await accountApi.getUserById(id);
      return res;
    } catch (error) {
      console.log('Lỗi get user');
    }
  },
  accessToken: async (): Promise<any> => {
    try {
      const res = await accountApi.accessToken();
      return res;
    } catch (error) {
      console.log('Lỗi get user');
    }
  },
  refreshToken: async (): Promise<any> => {
    try {
      const res = await accountApi.refreshToken();
      return res;
    } catch (error) {
      console.log('Lỗi get user');
    }
  },
  register: async (data: Account): Promise<any> => {
    try {
      const res = await accountApi.register(data);
      store.dispatch(setShowAlert({message: 'Thêm user thành công', type: 'success'}));
      return res;
    } catch (error: any) {
      store.dispatch(
        setShowAlert({
          type: 'error',
          message: error.errors?.[0] || error.message || 'Đã xảy ra lỗi',
        })
      );
      console.log('Lỗi get user');
    }
  },
  changePassword: async (data: {
    email: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<any> => {
    try {
      const res = await accountApi.changePassword(data);
      store.dispatch(setShowAlert({message: 'Đổi mật khẩu thành công', type: 'success'}));
      return res;
    } catch (error: any) {
      store.dispatch(
        setShowAlert({
          type: 'error',
          message: error.errors?.[0] || error.message || 'Đã xảy ra lỗi',
        })
      );
      console.log('Lỗi get user');
    }
  },
  changePasswordAdmin: async (data: {
    email: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<any> => {
    try {
      const res = await accountApi.changePasswordAdmin(data);
      store.dispatch(setShowAlert({message: 'Đổi mật khẩu thành công', type: 'success'}));
      return res;
    } catch (error: any) {
      store.dispatch(
        setShowAlert({
          type: 'error',
          message: error.errors?.[0] || error.message || 'Đã xảy ra lỗi',
        })
      );
      console.log('Lỗi get user');
    }
  },
  updateUser: async (id: string | number | null, data: any): Promise<any> => {
    try {
      const res = await accountApi.updateUser(id, data);
      store.dispatch(setShowAlert({message: 'Cập nhật user thành công', type: 'success'}));
      return res;
    } catch (error: any) {
      store.dispatch(
        setShowAlert({
          type: 'error',
          message: error.errors?.[0] || error.message || 'Đã xảy ra lỗi',
        })
      );
      console.log('Lỗi get all user');
    }
  },
  removeUser: async (data: {userName: string}): Promise<any> => {
    try {
      const res = await accountApi.removeUser(data);
      if (res.result) {
        store.dispatch(setShowAlert({message: res.result, type: 'success'}));
        return true;
      } else {
        store.dispatch(setShowAlert({message: res.error || '', type: 'error'}));
      }
    } catch (error) {
      console.log('Lỗi gán quyền');
    }
    return false;
  },
  addUserToRole: async (params: {userName: string; rolename: string}): Promise<any> => {
    try {
      const res = await accountApi.addUserToRole(params);
      if (res.result) {
        store.dispatch(setShowAlert({message: res.result, type: 'success'}));
        return true;
      } else {
        store.dispatch(setShowAlert({message: res.error || '', type: 'error'}));
      }
    } catch (error) {
      console.log('Lỗi gán quyền');
    }
    return false;
  },
  addUsersToRole: async (params: any, data: any): Promise<any> => {
    try {
      const res = await accountApi.addUsersToRole(params, data);
      if (res.result) {
        store.dispatch(setShowAlert({message: res.result, type: 'success'}));
        return true;
      } else {
        store.dispatch(setShowAlert({message: res.error || '', type: 'error'}));
      }
    } catch (error) {
      console.log('Lỗi gán quyền');
    }
    return false;
  },
  removeUserFromRole: async (data: {userName: string; rolename: string}): Promise<any> => {
    try {
      const res = await accountApi.removeUserFromRole(data);
      if (res.result) {
        store.dispatch(setShowAlert({message: res.result, type: 'success'}));
        return true;
      } else {
        store.dispatch(setShowAlert({message: res.error || '', type: 'error'}));
      }
    } catch (error) {
      console.log('Lỗi gán quyền');
    }
    return false;
  },
  //role
  // getAllRole: async (): Promise<Role[] | undefined> => {
  //   try {
  //     const res = await accountApi.getAllRole();
  //     return res;
  //   } catch (error) {
  //     console.log('Lỗi get all role');
  //   }
  // },
  // createRole: async (roleName: string): Promise<boolean> => {
  //   try {
  //     const res = await accountApi.createRole(roleName);
  //     if (res.result) {
  //       store.dispatch(setShowAlert({message: res.result, type: 'success'}));
  //       return true;
  //     } else {
  //       store.dispatch(setShowAlert({message: res.error || '', type: 'error'}));
  //     }
  //   } catch (error) {
  //     console.log('Lỗi tạo role');
  //   }
  //   return false;
  // },
  // updateRole: async (roleId: string, roleName: string): Promise<boolean> => {
  //   try {
  //     const res = await accountApi.updateRole(roleId, roleName);
  //     if (res.result) {
  //       store.dispatch(setShowAlert({message: res.result, type: 'success'}));
  //       return true;
  //     }
  //   } catch (error: any) {
  //     store.dispatch(
  //       setShowAlert({
  //         type: 'error',
  //         message: error.errors?.[0] || error.message || 'Đã xảy ra lỗi',
  //       })
  //     );
  //   }
  //   return false;
  // },
  // deleteRole: async (roleId: string): Promise<boolean> => {
  //   try {
  //     const res = await accountApi.deleteRole(roleId);
  //     if (res.result) {
  //       store.dispatch(setShowAlert({message: res.result, type: 'success'}));
  //       return true;
  //     } else {
  //       store.dispatch(setShowAlert({message: res.error || '', type: 'error'}));
  //     }
  //   } catch (error: any) {
  //     store.dispatch(
  //       setShowAlert({
  //         type: 'error',
  //         message: error.errors?.[0] || error.message || 'Đã xảy ra lỗi',
  //       })
  //     );
  //   }
  //   return false;
  // },
  addClaimToRole: async (data: {
    roleName: string;
    claimName: string;
    value: string;
  }): Promise<any> => {
    try {
      const res = await accountApi.addClaimToRole(data);
      if (res.result) {
        store.dispatch(setShowAlert({message: res.result, type: 'success'}));
        return true;
      } else {
        store.dispatch(setShowAlert({message: res.error || '', type: 'error'}));
      }
    } catch (error) {
      console.log('Lỗi gán quyền');
    }
    return false;
  },
  getAllClaimsInRole: async (params: {
    roleName: string;
  }): Promise<{clams: string[]} | undefined> => {
    try {
      const res = await accountApi.getAllClaimsInRole(params);
      return res;
    } catch (error) {
      console.log('Lỗi get all user');
    }
  },
  removeClaimToRole: async (data: {
    roleName: string;
    claimName: string;
    value: string;
  }): Promise<any> => {
    try {
      const res = await accountApi.removeClaimToRole(data);
      if (res.result) {
        store.dispatch(setShowAlert({message: res.result, type: 'success'}));
        return true;
      } else {
        store.dispatch(setShowAlert({message: res.error || '', type: 'error'}));
      }
    } catch (error) {
      console.log('Lỗi gán quyền');
    }
    return false;
  },

  addClaimToUser: async (data: {
    userName: string;
    claimName: string;
    value: string;
  }): Promise<any> => {
    try {
      const res = await accountApi.addClaimToUser(data);
      if (res.result) {
        store.dispatch(setShowAlert({message: res.result, type: 'success'}));
        return true;
      } else {
        store.dispatch(setShowAlert({message: res.error || '', type: 'error'}));
      }
    } catch (error) {
      console.log('Lỗi gán quyền');
    }
    return false;
  },
  getAllClaimsByUser: async (params: {
    userName: string;
  }): Promise<{type: string; value: string}[] | undefined> => {
    try {
      const res = await accountApi.getAllClaimsByUser(params);
      return res;
    } catch (error) {
      console.log('Lỗi get all user');
    }
  },
  removeClaimToUser: async (data: {
    userName: string;
    claimName: string;
    value: string;
  }): Promise<any> => {
    try {
      const res = await accountApi.removeClaimToUser(data);
      if (res.result) {
        store.dispatch(setShowAlert({message: res.result, type: 'success'}));
        return true;
      } else {
        store.dispatch(setShowAlert({message: res.error || '', type: 'error'}));
      }
    } catch (error) {
      console.log('Lỗi gán quyền');
    }
    return false;
  },
};

export default accountService;
