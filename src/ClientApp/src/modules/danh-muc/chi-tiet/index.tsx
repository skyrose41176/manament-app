/* eslint-disable react-hooks/exhaustive-deps */
import {Button, Grid, IconButton, Stack} from '@mui/material';
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
} from '../../../components/hook-form';
import Page from '../../../layouts/Page';
import {Category, PaginationParams, Product, QueryParams} from '../../../models';
import {categoryService, productService} from '../../../services';
import useCheckQuyen from '../../../hooks/useCheckQuyen';
import Modal from '../modals';
import {Trash} from 'iconsax-react';
import {colors} from 'src/theme';
import {useWindowDimensions} from 'src/hooks';
import ThuongHieuField from 'src/components/hook-form/forms/thuong-hieu-field';

const DanhMucSanPhamPage = () => {
  const [listChosenProduct, setListChosenProduct] = useState<Product[]>([]);
  const {id = ''} = useParams();
  const navigate = useNavigate();
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const {height} = useWindowDimensions();

  const [filters, setFilters] = useState<QueryParams>({
    search: '',
    pageNumber: 1,
    pageSize: 10,
  });
  const [pagination, setPagination] = useState<PaginationParams>({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalCount: 0,
    hasPrevious: false,
    hasNext: false,
  });

  const form = useForm<{
    name: string;
    image: any;
    status: boolean;
    enableFilter: boolean;
    categories?: any;
    thuongHieuIds?: any[];
  }>({
    defaultValues: {
      name: '',
      image: '',
      status: true,
      enableFilter: false,
      categories: 0,
      thuongHieuIds: [],
    },
  });
  const {
    setValue,
    handleSubmit,
    formState: {isSubmitting},
  } = form;

  const onSubmit = async (data: any) => {
    console.log(data);

    const newData = {
      ...data,
      id: id,
      partentId: data?.categories?.value,
      categoryProducts: listChosenProduct.map(item => ({productId: item.id})),
      thuongHieuIds: data?.thuongHieuIds?.map((item: any) => item?.value),
    };

    if (id) {
      await categoryService.update(id, newData);
    } else {
      const res = await categoryService.create(newData);
      if (res) {
        navigate(-1);
      }
    }
  };

  const getCategories = useCallback(async (value: any) => {
    setLoadingCategories(true);
    const res = await categoryService.getAllParent({search: value, pageNumber: 1, pageSize: 100});
    if (res) {
      setCategories(res.data);
    }
    setLoadingCategories(false);
  }, []);
  useEffect(() => {
    getCategories('');
  }, []);

  useEffect(() => {
    const getDetail = async () => {
      const res = await categoryService.getOne(id);
      let parent = null;
      if (res?.partentId) parent = await categoryService.getOne(res.partentId);
      console.log(res, parent);
      if (res) {
        setValue('name', res.name);
        setValue('image', res.image);
        setValue('status', res.status);
        setValue('enableFilter', res.enableFilter);
        parent && setValue('categories', {label: parent.name, value: parent.id});
        setValue(
          'thuongHieuIds',
          res?.thuongHieus?.map(item => ({label: item?.ten, value: item?.id}))
        );
        console.log(res);

        setListChosenProduct(res.products.map(item => item));
      }
    };
    id && getDetail();
  }, [id]);

  const handleDeleteProduct = (id: string) => {
    setListChosenProduct(prev => {
      return [...prev.filter(item => item.id !== id)];
    });
    console.log(id);
  };

  const handleChangeCheckbox = (checked: boolean, row: Product) => {
    if (checked) {
      setListChosenProduct([...listChosenProduct, row]);
    } else setListChosenProduct(listChosenProduct.filter(item => item.id !== row.id));
  };

  const columnChosens = [
    {
      field: 'id',
      headerName: 'Id sản phẩm',
    },
    {
      field: 'productCode',
      headerName: 'Mã sản phẩm',
    },
    {
      field: 'name',
      headerName: 'Tên sản phẩm',
    },
    {
      field: 'price',
      headerName: 'Giá',
    },
    {
      field: 'point',
      headerName: 'Điểm',
    },
    {
      field: 'partner',
      headerName: 'Đối tác',
    },
    {
      field: 'brandName',
      headerName: 'Thương hiệu',
    },
    {
      field: 'delete',
      headerName: 'Xóa',
      renderCell: (row: Product) => (
        <IconButton
          color="error"
          onClick={e => {
            e.stopPropagation();
            handleDeleteProduct(row.id);
            // setIsOpenDelete({visible: true, id: row.id});
          }}
        >
          <Trash fontSize={20} color={colors.error} />
        </IconButton>
      ),
    },
  ];
  const handleClick = async () => {
    setOpen(true);
    setIsLoading(true);
    const res = await productService.getAll(filters);
    if (res) {
      const {currentPage, pageSize, totalCount, totalPages, hasNext, hasPrevious} = res;

      setPagination({currentPage, pageSize, totalCount, totalPages, hasNext, hasPrevious});
    }
    setIsLoading(false);
  };
  return (
    <Page title={id ? 'Cập nhật' : 'Thêm danh mục'}>
      <CardBase
        actions={
          <Stack direction="row" justifyContent="flex-end" margin={2}>
            <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
              {id ? 'Cập nhật' : 'Thêm danh mục'}
            </Button>
          </Stack>
        }
      >
        <Grid container sx={{padding: 2}} spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <InputField form={form} name="name" label="Tên danh mục" />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ImagePickerField form={form} name="image" label="Hình ảnh" />
            {/* <FilePickerField form={form} name="image" label="Hình ảnh" /> */}
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <CheckboxField form={form} name="status" label="Trạng thái" />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AutocompleteAsyncField
              loading={loadingCategories}
              items={categories?.map(item => ({label: item?.name, value: item?.id, ...item}))}
              onSubmit={value => getCategories(value)}
              form={form}
              name="categories"
              label="Danh mục cha"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ThuongHieuField form={form} multiple name="thuongHieuIds" />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <CheckboxField form={form} name="enableFilter" label="Mở filter" />
          </Grid>
        </Grid>
      </CardBase>
      <Grid container sx={{padding: 2}} spacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          <Button variant="contained" onClick={handleClick}>
            Chọn sản phẩm
          </Button>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <DataTable
            columns={columnChosens}
            rows={listChosenProduct}
            loading={isLoading}
            height={height - 200}
          />
        </Grid>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          listChosenProduct={listChosenProduct}
          handleChecked={handleChangeCheckbox}
        />
      </Grid>

      <LoadingOverlay open={isSubmitting} />
    </Page>
  );
};

export default DanhMucSanPhamPage;
