/* eslint-disable react-hooks/exhaustive-deps */
import {Button, Grid, Stack} from '@mui/material';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate, useParams} from 'react-router-dom';
import {CardBase} from '../../../components/base';
import LoadingOverlay from '../../../components/base/loading-overlay';
import {InputField} from '../../../components/hook-form';
import Page from '../../../layouts/Page';
import {HopDong} from '../../../models';
import {hopDongService} from '../../../services';
import {useWindowDimensions} from 'src/hooks';

const ChiTietHopDongPage = () => {
  const {id = ''} = useParams();
  const {height} = useWindowDimensions();
  const navigate = useNavigate();
  const form = useForm<HopDong>({
    defaultValues: {
      maHopDong: '',
      point: 0,
      pointF5s: 0,
      maNv: '',
      maKh: '',
      tenKh: '',
      sdtKh: '',
      avatar: '',
    },
  });
  const {
    setValue,
    handleSubmit,
    formState: {isSubmitting},
  } = form;

  const onSubmit = async (data: Partial<HopDong>) => {
    // console.log(data);

    if (id) {
      await hopDongService.update(id, {id, ...data});
    } else {
      const res = await hopDongService.create(data);
      if (res) {
        navigate(-1);
      }
    }
  };
  // const handleUpload = async () => {
  //   console.log(getValues('image'));
  //   try {
  //     setIsUploading(true);
  //     const storageRef = ref(storage, `images/categories/campaign_${Date.now()}.png`);
  //     const resUpload = await uploadBytes(storageRef, getValues('image'));
  //     console.log('Uploaded a blob or file!', resUpload);
  //     const url = await getDownloadURL(storageRef);
  //     setUrlUpload(url);
  //     alert('upload thành công');
  //     enqueueSnackbar('Upload thành công', {variant: 'success'});
  //   } catch (error) {
  //     alert('đã xảy ra lỗi');
  //     console.log(error);
  //     enqueueSnackbar('Đã xảy ra lỗi', {variant: 'error'});
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };

  useEffect(() => {
    const getDetail = async () => {
      const res = await hopDongService.getOne(id);
      if (res) {
        setValue('maHopDong', res.maHopDong);
        setValue('point', res.point);
        setValue('pointF5s', res.pointF5s);
        setValue('maNv', res.maNv);
        setValue('maKh', res.maKh);
        setValue('tenKh', res.tenKh);
        setValue('sdtKh', res.sdtKh);
        setValue('avatar', res.avatar);
      }
    };
    id && getDetail();
  }, [id]);

  return (
    <Page title={id ? 'Cập nhật' : 'Thêm hợp đồng'}>
      <CardBase
        actions={
          <Stack direction="row" justifyContent="flex-end" margin={2}>
            <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
              {id ? 'Cập nhật' : 'Thêm hợp đồng'}
            </Button>
          </Stack>
        }
      >
        <Grid container sx={{padding: 2}} spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <InputField form={form} name="maHopDong" label="Mã hợp đồng" />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputField form={form} name="maKh" label="Mã khách hàng" />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputField form={form} name="point" label="Điểm" />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputField form={form} name="pointF5s" label="Điểm phụ" />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputField form={form} name="tenKh" label="Tên khách hàng" />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputField form={form} name="sdtKh" label="Số điện thoại khách hàng" />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputField form={form} name="avatar" label="Ảnh đại diện" />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputField form={form} name="maNv" label="Nhân viên sale" />
          </Grid>
        </Grid>
      </CardBase>

      <LoadingOverlay open={isSubmitting} />
    </Page>
  );
};

export default ChiTietHopDongPage;
