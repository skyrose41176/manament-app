import {SnackbarProvider, useSnackbar} from 'notistack';
import React, {useEffect, useLayoutEffect} from 'react';
import {useRoutes} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from './redux/hooks';
import {selectAlert, setHiddenAlert} from './redux/slice/alertSlice';
import {routes} from './routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// import './App.css';
import './theme/styles.css';
import {selectJWT, setAuth} from './redux/slice/auth';
import {QueryClient, QueryClientProvider} from 'react-query';
import axiosClient from './apis/axiosClient';
const Noti = () => {
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const alert = useAppSelector(selectAlert);
  useEffect(() => {
    testApi();
    if (alert.open) {
      enqueueSnackbar(alert.message, {variant: alert.type, autoHideDuration: 3000});
    }
  }, [alert.open]);
  return null;
};
const testApi = async () => {
  const data = await axiosClient.get('/products');
  console.log({data});
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const dispatch = useAppDispatch();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeConfig>
        <GlobalStyles />

        <SnackbarProvider
          maxSnack={3}
          onClose={(event, reason) => {
            dispatch(setHiddenAlert());
          }}
        >
          <div style={{minHeight: '100vh', backgroundColor: '#E3F1FD'}}>
            {useRoutes(routes)}
            <Noti />
          </div>
        </SnackbarProvider>
      </ThemeConfig>
    </QueryClientProvider>
  );
}

export default App;
