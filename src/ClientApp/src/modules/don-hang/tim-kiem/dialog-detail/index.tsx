import {
  Box,
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

interface Props {
  open: boolean;
  row?: any;
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

const DialogDetail: FC<Props> = ({open = false, row, onClose}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{fontSize: 16}}>Chi tiết</DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={2}>
          {/* <Grid item xs={12} sm={4} xl={4}>
            <CardMedia
              component="img"
              sx={{width: '100%'}}
              image={row?.product?.image}
              alt="Live from space album cover"
            />
          </Grid> */}
          <Grid item xs={12} sm={12} xl={12}>
            <Typography component="div" variant="h5">
              {row?.name}
            </Typography>
            <Box my={2} />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" color="text.primary" component="div">
                Mã khách hàng:
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {row?.customerId}
              </Typography>
            </Stack>
            <Divider sx={{my: 1}} />

            <Stack mt={1} direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" color="text.primary" component="div">
                Mã sản phẩm:
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {row?.productCode}
              </Typography>
            </Stack>
            <Divider sx={{my: 1}} />

            <Stack mt={1} direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" color="text.primary" component="div">
                Điểm:
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {row?.point}
              </Typography>
            </Stack>
            <Divider sx={{my: 1}} />

            <Stack mt={1} direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" color="text.primary" component="div">
                Trạng thái:
              </Typography>
              <Typography
                sx={{color: stateColor(row?.stateCode)}}
                variant="subtitle1"
                component="div"
              >
                {row?.stateName}
              </Typography>
            </Stack>
            <Divider sx={{my: 1}} />

            <Stack mt={1} direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" color="text.primary" component="div">
                Tên thương hiệu:
              </Typography>
              <Typography variant="subtitle1" component="div">
                {row?.brandName}
              </Typography>
            </Stack>
            <Divider sx={{my: 1}} />

            <Stack mt={1} direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" color="text.primary" component="div">
                Ngày hết hạn:
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {new Date(row?.expiryDate).toLocaleDateString('vi')}
              </Typography>
            </Stack>
            <Divider sx={{my: 1}} />

            <Stack mt={1} direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" color="text.primary" component="div">
                Thời gian sử dụng:
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {new Date(row?.usedTime).toLocaleString('vi')}
              </Typography>
            </Stack>
            <Divider sx={{my: 1}} />

            <Stack mt={1} direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" color="text.primary" component="div">
                Thương hiệu đã sử dụng:
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {row?.usedBrand}
              </Typography>
            </Stack>

            {/* <Stack mt={1} direction="column" justifyContent="space-between">
              <Typography variant="subtitle1" color="text.primary" component="div">
                Mô tả:
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {row?.product?.content}
              </Typography>
            </Stack> */}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDetail;
