import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import queryString from 'query-string';
import {FileParams, FileRes} from 'src/models';

const axiosClient = axios.create({
  baseURL: 'https://apps.f5seconds.vn/storage',
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    if (config.url?.includes('uploadFiles')) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  error => {
    return Promise.reject(error.response.data);
  }
);

const uploadApi = {
  getAll: (params: FileParams): Promise<FileRes> => {
    const url = '/files';
    return axiosClient.get(url, {params});
  },
  uploadFiles: (formData: FormData): Promise<{message: string}> => {
    const url = '/uploadFiles';

    return axiosClient.post(url, formData);
  },
};
export default uploadApi;
