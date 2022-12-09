/* eslint-disable react-hooks/exhaustive-deps */
import {Button, Grid, IconButton, Stack, Typography} from '@mui/material';
import React, {useCallback, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate, useParams} from 'react-router-dom';
import {CardBase, DataTable} from '../../../components/base';
import LoadingOverlay from '../../../components/base/loading-overlay';
import {
  AutocompleteAsyncField,
  CheckboxField,
  ImagePickerField,
  InputField,
  TextAreaField,
} from '../../../components/hook-form';
import Page from '../../../layouts/Page';
import {Category, PaginationParams, Product, QueryParams, ThuongHieu} from '../../../models';
import {categoryService, productService, thuongHieuService} from '../../../services';
import Modal from '../modals';
import {Trash} from 'iconsax-react';
import {colors} from 'src/theme';
import {useWindowDimensions} from 'src/hooks';

const ChiTietThuongHieuPage = () => {
  const [listChosenProduct, setListChosenProduct] = useState<Product[]>([]);
  const {id = ''} = useParams();
  const navigate = useNavigate();
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const form = useForm<ThuongHieu>({
    defaultValues: {
      ten: '',
      hinhAnh: '',
      trangThai: true,
    },
  });
  const {
    setValue,
    handleSubmit,
    formState: {isSubmitting},
  } = form;

  const onSubmit = async (data: any) => {
    const newData = {
      ...data,
      id: id,
    };

    if (id) {
      await thuongHieuService.update(id, newData);
    }
    // else {
    //   const res = await thuongHieuService.create(newData);
    //   if (res) {
    //     navigate(-1);
    //   }
    // }
  };

  useEffect(() => {
    const getDetail = async () => {
      const res = await thuongHieuService.getOne(id);
      if (res) {
        setValue('ten', res.ten);
        setValue('hinhAnh', res.hinhAnh);
        setValue('trangThai', res.trangThai);
        setValue('moTa', res.moTa);
        setValue('diaChi', res.diaChi);
        setValue('nguoiDaiDien', res.nguoiDaiDien);
        setValue('dienThoai', res.dienThoai);
      }
    };
    id && getDetail();
  }, [id]);

  return (
    <Page title={id ? 'Cập nhật' : 'Thêm thương hiệu'}>
      <CardBase
        actions={
          <Stack direction="row" justifyContent="flex-end" margin={2}>
            <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
              {id ? 'Cập nhật' : 'Thêm thương hiệu'}
            </Button>
          </Stack>
        }
      >
        <Grid container sx={{padding: 2}} spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <InputField form={form} name="ten" label="Tên thương hiệu" />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ImagePickerField form={form} name="hinhAnh" label="Hình ảnh" />
            {/* <FilePickerField form={form} name="image" label="Hình ảnh" /> */}
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <CheckboxField form={form} name="trangThai" label="Trạng thái" />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <InputField form={form} name="diaChi" label="Địa chỉ" />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <InputField form={form} name="dienThoai" label="Điện thoại" />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <InputField form={form} name="nguoiDaiDien" label="Người đại diện" />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Typography component="div" color="text.secondary">
              Mô tả
            </Typography>
            <TextAreaField form={form} name="moTa" label="" />
          </Grid>
          {/* <Grid item xs={12} md={6} lg={4}>
            <AutocompleteAsyncField
              loading={loadingCategories}
              items={categories?.map(item => ({label: item?.name, value: item?.id, ...item}))}
              onSubmit={value => getCategories(value)}
              form={form}
              name="categories"
              label="Danh mục cha"
            />
          </Grid> */}
          {/* <Grid item xs={12} md={6} lg={4}>
            <CheckboxField form={form} name="enableFilter" label="Mở filter" />
          </Grid> */}
        </Grid>
      </CardBase>

      <LoadingOverlay open={isSubmitting} />
    </Page>
  );
};

export default ChiTietThuongHieuPage;
