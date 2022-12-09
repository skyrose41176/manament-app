/* eslint-disable react-hooks/exhaustive-deps */
import {Button, Grid, Stack} from '@mui/material';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate, useParams} from 'react-router-dom';
import {CardBase} from '../../../components/base';
import LoadingOverlay from '../../../components/base/loading-overlay';
import {CheckboxField, InputField} from '../../../components/hook-form';
import Page from '../../../layouts/Page';
import {xepHangService} from '../../../services';
import {useWindowDimensions} from 'src/hooks';
import {XepHang} from 'src/models/xepHang';

const ChiTietXepHangPage = () => {
  const {id = ''} = useParams();
  const {height} = useWindowDimensions();
  const navigate = useNavigate();
  const form = useForm<XepHang>({
    defaultValues: {
      name: '',
      image: '',
      startPoint: 0,
      endPoint: 0,
      description: '',
      infinity: false,
    },
  });
  const {
    setValue,
    handleSubmit,
    formState: {isSubmitting},
  } = form;

  const onSubmit = async (data: Partial<XepHang>) => {
    if (id) {
      await xepHangService.update(id, {id, ...data});
    } else {
      const res = await xepHangService.create(data);
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
      const res = await xepHangService.getOne(id);
      if (res) {
        setValue('name', res.name);
        setValue('description', res.description);
        setValue('startPoint', res.startPoint);
        setValue('endPoint', res.endPoint);
        setValue('image', res.image);
        setValue('infinity', res.infinity);
      }
    };
    id && getDetail();
  }, [id]);

  return (
    <Page title={id ? 'Cập nhật' : 'Thêm xếp hạng'}>
      <CardBase
        actions={
          <Stack direction="row" justifyContent="flex-end" margin={2}>
            <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
              {id ? 'Cập nhật' : 'Thêm xếp hạng'}
            </Button>
          </Stack>
        }
      >
        <Grid container sx={{padding: 2}} spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <InputField form={form} name="name" label="Tên xếp hạng" />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputField form={form} name="image" label="Ảnh đại diện" />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputField form={form} name="startPoint" label="Điểm bắt đầu" />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputField form={form} name="endPoint" label="Điểm kết thúc" />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputField form={form} name="description" label="Mô tả" />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <CheckboxField form={form} name="infinity" label="Vô hạn" />
          </Grid>
        </Grid>
      </CardBase>

      <LoadingOverlay open={isSubmitting} />
    </Page>
  );
};

export default ChiTietXepHangPage;
