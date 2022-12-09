import {CircularProgress, Grid, Stack} from '@mui/material';
import React, {FC, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {DialogBase} from '../../../../components/base';
import LoadingOverlay from '../../../../components/base/loading-overlay';
import {InputField} from '../../../../components/hook-form';
import {accountService} from '../../../../services';

interface Props {
  open: boolean;
  id?: string | number | null;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const DialogResetPassword: FC<Props> = ({open = false, id = null, onClose, onSubmit}) => {
  const form = useForm<any>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const {
    handleSubmit,
    getValues,
    formState: {isSubmitting},
    reset,
  } = form;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // const getUser = async () => {
    //   setIsLoading(true);
    //   const res = await accountService.getUserById(id);
    //   reset({
    //     password: '',
    //     confirmPassword: '',
    //     id: res.id,
    //   });
    //   setIsLoading(false);
    // };
    open &&
      id &&
      reset({
        password: '',
        confirmPassword: '',
        id: id,
      });
  }, [id, open]);
  return (
    <DialogBase
      open={open}
      title={id ? 'Đổi mật khẩu' : 'Tạo user mới'}
      onClose={onClose}
      textPositive={id ? 'Lưu' : 'Tạo'}
      onSubmit={handleSubmit(onSubmit)}
    >
      {isLoading ? (
        <Stack direction="row" justifyContent="center">
          <CircularProgress size={24} />
        </Stack>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} xl={4}>
            <InputField
              form={form}
              name="password"
              label="Mật khẩu"
              type="password"
              rules={{
                required: {
                  value: true,
                  message: 'Không được để trống',
                },
                validate: {
                  match: (value: string) => {
                    const {confirmPassword} = getValues();
                    return value === confirmPassword || 'Mật khẩu không khớp.';
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} xl={4}>
            <InputField
              form={form}
              name="confirmPassword"
              label="Nhập lại mật khẩu"
              type="password"
              rules={{
                required: {
                  value: true,
                  message: 'Không được để trống',
                },
                validate: {
                  match: (value: string) => {
                    const {password} = getValues();
                    return value === password || 'Mật khẩu không khớp.';
                  },
                },
              }}
            />
          </Grid>
        </Grid>
      )}
      <LoadingOverlay open={isSubmitting} />
    </DialogBase>
  );
};

export default DialogResetPassword;
