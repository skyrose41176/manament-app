import {
  CardMedia,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Slide,
  Stack,
  Typography,
} from '@mui/material';
import {TransitionProps} from '@mui/material/transitions';
import React, {FC, useState} from 'react';
import {useForm} from 'react-hook-form';
import {state, stateColor} from '../../../../utils/state';
import {DialogBase} from '../../../../components/base';
import LoadingOverlay from '../../../../components/base/loading-overlay';
import {InputField} from '../../../../components/hook-form';
import {StateTrans} from '../../../../apis/transaction-api';

interface Props {
  open: boolean;
  data?: StateTrans;
  onClose: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogVerify: FC<Props> = ({open = false, data, onClose}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle sx={{fontSize: 16}}>Thông tin giao dịch</DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} xl={12}>
            <Typography component="div" variant="h5">
              {data?.channel}
            </Typography>
            <Divider sx={{my: 1}} />

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" color="text.primary" component="div">
                Mã giao dịch:
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {data?.transactionId}
              </Typography>
            </Stack>

            <Stack mt={1} direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" color="text.primary" component="div">
                Mã sản phẩm:
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {data?.productCode}
              </Typography>
            </Stack>

            <Stack mt={1} direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" color="text.primary" component="div">
                Mã voucher:
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {data?.voucherCode}
              </Typography>
            </Stack>

            <Stack mt={1} direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" color="text.primary" component="div">
                Thời gian hết hạn:
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {data?.expiryDate}
              </Typography>
            </Stack>

            <Stack mt={1} direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" color="text.primary" component="div">
                Mã trạng thái:
              </Typography>
              <Typography
                // sx={{color: stateColor(data?.stateCode || 0)}}
                color="text.secondary"
                variant="subtitle1"
                component="div"
              >
                {data?.stateCode}
              </Typography>
            </Stack>

            <Stack mt={1} direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" color="text.primary" component="div">
                Tên trạng thái:
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {data?.stateText}
              </Typography>
            </Stack>

            <Stack mt={1} direction="column" justifyContent="space-between">
              <Typography variant="subtitle1" color="text.primary" component="div">
                Sử dụng vào ngày:
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {data?.used_time}
              </Typography>
            </Stack>

            <Stack mt={1} direction="column" justifyContent="space-between">
              <Typography variant="subtitle1" color="text.primary" component="div">
                Thương hiệu:
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {data?.used_brand}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default DialogVerify;
