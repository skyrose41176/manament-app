import {Avatar, Box, Divider, Drawer, Hidden, List, Stack, Typography} from '@mui/material';
import {Chart1, Firstline, Logout, Rank, UserOctagon} from 'iconsax-react';
import {FC, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../redux/hooks';
import {logout} from '../../redux/slice/auth';
import {colors} from '../../theme';
import NavItem from './NavItem';

export const items = [
  {
    href: '/thong-ke',
    icon: Chart1,
    title: 'Thống kê',
  },
  {
    href: '/quan-ly-user',
    icon: UserOctagon,
    title: 'Quản lý user',
  },
  {
    href: '/san-pham',
    icon: Firstline,
    title: 'Danh sách sản phẩm',
  },
  {
    href: '/don-hang',
    icon: Rank,
    title: 'Quản lý đơn hàng',
  },
];

interface Props {
  onMobileClose?: () => void;
  openMobile?: boolean;
}
const Sidebar: FC<Props> = ({onMobileClose, openMobile}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);
  const content = (
    <Box className="sidebar" sx={{p: 2, overflow: 'auto'}}>
      <List>
        {items.map(item => {
          return <NavItem key={item.title} item={item} />;
        })}
        <NavItem
          onClick={() => {
            dispatch(logout());
            localStorage.removeItem('jwt');
            navigate('/login');
          }}
          item={{
            href: '/login',
            icon: Logout,
            title: 'Đăng xuất',
          }}
        />
      </List>
    </Box>
  );

  return (
    <>
      <Hidden>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              background: '#133886  no-repeat right bottom',
            },
          }}
          sx={{position: 'relative'}}
        >
          <Stack display="flex" alignItems="center" style={{padding: 20}}>
            <Avatar sx={{bgcolor: 'red', cursor: 'pointer'}}>{'ADMIN'}</Avatar>
            <Typography
              variant="h5"
              component="h5"
              color="#fff"
              marginTop={1}
              textAlign="center"
            ></Typography>
          </Stack>
          <Divider sx={{background: colors.primary}} />
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

export default Sidebar;
