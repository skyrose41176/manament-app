import {Button, Card, CardActions, CardContent, Grid, Stack} from '@mui/material';
import {useSnackbar} from 'notistack';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Navigate, useNavigate} from 'react-router';
import logo from '../../../assets/images/logo.jpg';
import {LoadingOverLay} from '../../../components/base';
import {InputField} from '../../../components/hook-form';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {selectJWT} from '../../../redux/slice/auth';
import axiosClient from '../../../apis/axiosClient';

interface defaultValues {
  phoneNumber: string;
}
const LoginPage = () => {
  const form = useForm({
    defaultValues: {
      phoneNumber: '',
    },
  });
  const {
    handleSubmit,
    formState: {isSubmitting},
  } = form;

  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const jwt = useAppSelector(selectJWT);
  const dispatch = useAppDispatch();

  const onSubmit = async (data: defaultValues) => {
    // console.log(data);
    // const res = await accountService.login(data.username, data.password);
    // if (res && res?.data) {
    //   if (res?.succeeded) {
    //     const newdata = res?.data;
    //     localStorage.setItem('jwt', newdata.jwToken);
    //     dispatch(setJWT(newdata.jwToken));
    navigate('/');
    //   }
    // }
  };

  if (jwt) {
    return <Navigate to="/" />;
  }
  return (
    <div
      style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
    >
      <Card sx={{minWidth: 275, padding: 2}}>
        <Stack direction="row" justifyContent="center">
          <img src={logo} alt="logo" width="50%" />
        </Stack>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputField
                form={form}
                name="phoneNumber"
                label="Số điện thoại"
                rules={{
                  required: {
                    value: true,
                    message: 'Vui lòng nhập số điện thoại',
                  },
                }}
                onKeyPress={(event: any) => {
                  if (event.key === 'Enter') {
                    handleSubmit(onSubmit)();
                  }
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button variant="contained" fullWidth onClick={handleSubmit(onSubmit)}>
            Đăng nhập
          </Button>
        </CardActions>
      </Card>
      <LoadingOverLay open={isSubmitting} />
    </div>
  );
};

export default LoginPage;
