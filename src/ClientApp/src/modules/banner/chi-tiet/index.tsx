/* eslint-disable react-hooks/exhaustive-deps */
import {Button, Grid, Stack} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate, useParams} from 'react-router-dom';
import {CardBase, DialogBase} from '../../../components/base';
import LoadingOverlay from '../../../components/base/loading-overlay';
import {
  CheckboxField,
  ImagePickerField,
  InputField,
  TextAreaField,
} from '../../../components/hook-form';
import Page from '../../../layouts/Page';
import {bannerService} from '../../../services';
import useCheckQuyen from '../../../hooks/useCheckQuyen';
import {Banner} from 'src/models/banner';

const ChiTietBannerPage = () => {
  const {id = ''} = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<{
    name: string;
    image: any;
    status: boolean;
    link: string;
    description: string;
  }>({
    defaultValues: {
      name: '',
      image: '',
      status: true,
      link: '',
      description: '',
    },
  });
  const {
    setValue,
    handleSubmit,
    formState: {isSubmitting},
  } = form;

  const onSubmit = async (data: Partial<Banner>) => {
    // console.log(data);

    if (id) {
      await bannerService.update(id, {id, ...data});
    } else {
      const res = await bannerService.create(data);
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
      const res = await bannerService.getOne(id);
      if (res) {
        setValue('name', res.name);
        // setValue('image', res.image);
        // setValue('status', res.status);
        // setValue('link', res.link);
        // setValue('description', res.description);
      }
    };
    id && getDetail();
  }, [id]);

  return (
    <Page title={id ? 'Cập nhật' : 'Thêm banner'}>
      <CardBase
        actions={
          <Stack direction="row" justifyContent="flex-end" margin={2}>
            <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
              {id ? 'Cập nhật' : 'Thêm banner'}
            </Button>
          </Stack>
        }
      >
        <Grid container sx={{padding: 2}} spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <InputField form={form} name="name" label="Tên banner" />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ImagePickerField form={form} name="image" label="Hình ảnh" />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <CheckboxField form={form} name="status" label="Trạng thái" />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <InputField form={form} name="link" label="Đường dẫn" />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextAreaField form={form} name="description" label="Mô tả" />
          </Grid>
        </Grid>
      </CardBase>

      <LoadingOverlay open={isSubmitting} />
    </Page>
  );
};

export default ChiTietBannerPage;
