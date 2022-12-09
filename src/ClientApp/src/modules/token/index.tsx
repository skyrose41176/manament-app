import {LoadingButton} from '@mui/lab';
import {Box, Button, Card, CardContent, Skeleton, Stack, TextareaAutosize} from '@mui/material';
import axios from 'axios';
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useCheckQuyen from '../../hooks/useCheckQuyen';
import Page from '../../layouts/Page';
import {useAppDispatch} from '../../redux/hooks';
import {setShowAlert} from '../../redux/slice/alertSlice';
import {accountService} from '../../services';

function TokenPage() {
  const dispatch = useAppDispatch();
  const [token, setToken] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [loadingButton, setLoadingButton] = React.useState('');
  const navigate = useNavigate();
  const mutationCheckToken = async () =>
    axios.get((process.env.PUBLIC_URL || '/admin-cars') + '/api/account/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  useEffect(() => {
    accountService
      .accessToken()
      .then(res => {
        setToken(res?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const [checkQuyen] = useCheckQuyen();

  if (!loading && token === '') {
    return <div>Có lỗi xảy ra</div>;
  }

  return (
    <Page title="Quản lý Token">
      <Stack justifyContent="flex-end" direction="row" spacing={2}>
        <LoadingButton
          loading={loadingButton === 'check'}
          variant="contained"
          color="primary"
          onClick={() => {
            setLoadingButton('check');
            mutationCheckToken()
              .then(() => {
                dispatch(
                  setShowAlert({
                    type: 'success',
                    message: 'Token hợp lệ',
                  })
                );
              })
              .catch(() => {
                dispatch(
                  setShowAlert({
                    type: 'error',
                    message: 'Token đã hết hạn sủ dụng',
                  })
                );
              })
              .finally(() => {
                setLoadingButton('');
              });
          }}
        >
          Kiểm tra Token
        </LoadingButton>
        <LoadingButton
          loading={loadingButton === 'refresh'}
          variant="contained"
          color="primary"
          onClick={() => {
            setLoadingButton('refresh');
            accountService
              .refreshToken()
              .then(res => {
                setToken(res.message);
              })
              .finally(() => {
                setLoadingButton('');
              });
          }}
        >
          Refresh Token
        </LoadingButton>
      </Stack>
      <Box mt={2} />
      <Card>
        <CardContent>
          {loading ? (
            <Skeleton variant="rectangular" height={200} />
          ) : (
            <TextareaAutosize
              maxRows={6}
              aria-label="maximum height"
              placeholder="Maximum 4 rows"
              readOnly
              value={token}
              style={{width: '100%', minHeight: 200}}
            />
          )}
        </CardContent>
      </Card>
    </Page>
  );
}

export default TokenPage;
