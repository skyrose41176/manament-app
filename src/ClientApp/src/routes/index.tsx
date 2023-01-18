import {FC, useState} from 'react';
import {Navigate, Outlet, RouteObject} from 'react-router-dom';
import Page403 from 'src/components/403';
import {LoadingOverLay} from 'src/components/base';
import DanhSachBannerPage from 'src/modules/banner/danh-sach';
import Page404 from '../components/404';
import MainLayout from '../layouts';
import LoginPage from '../modules/auth/login';
import TongQuanPage from '../modules/thong-ke';
import {useAppDispatch} from '../redux/hooks';

const Auth: FC<{children: React.ReactElement}> = ({children}) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingOverLay open />;
  }
  return <Navigate to="/login" />;
};

const AutoNavigate = () => {
  return <Navigate to="/thong-ke" />;
};

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {index: true, element: <AutoNavigate />},
      {
        path: 'thong-ke',
        element: <TongQuanPage />,
      },
      {
        path: 'quan-ly-user',
        element: <DanhSachBannerPage />,
      },
      {
        path: 'san-pham',
        element: <DanhSachBannerPage />,
      },
      {
        path: 'don-hang',
        element: <DanhSachBannerPage />,
      },
      {path: '*', element: <Navigate to="/404" />},
    ],
  },
  {
    path: '/thong-tin-ca-nhan',
    element: (
      <Auth>
        <MainLayout />
      </Auth>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/404',
    element: <Page404 />,
  },
  {
    path: '/403',
    element: <Page403 />,
  },
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
];
