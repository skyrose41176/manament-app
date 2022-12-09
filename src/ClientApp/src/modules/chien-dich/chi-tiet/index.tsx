/* eslint-disable react-hooks/exhaustive-deps */
import {Button, Checkbox, Grid, IconButton, Stack} from '@mui/material';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate, useParams} from 'react-router-dom';
import {CardBase, DataTable, DialogBase} from '../../../components/base';
import LoadingOverlay from '../../../components/base/loading-overlay';
import {CheckboxField, ImagePickerField, InputField} from '../../../components/hook-form';
import Page from '../../../layouts/Page';
import {Campaign, PaginationParams, Product, QueryParams} from '../../../models';
import {campaignService, productService} from '../../../services';
import useCheckQuyen from '../../../hooks/useCheckQuyen';
import {useWindowDimensions} from 'src/hooks';
import {Trash} from 'iconsax-react';
import {colors} from 'src/theme';
import Modal from '../modals';

const ChiTietChienDichPage = () => {
  const {id = ''} = useParams();
  const {height} = useWindowDimensions();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [listChosenProduct, setListChosenProduct] = useState<Product[]>([]);
  const form = useForm<{name: string; image: any; status: boolean}>({
    defaultValues: {
      name: '',
      image: '',
      status: true,
    },
  });
  const {
    setValue,
    handleSubmit,
    formState: {isSubmitting},
  } = form;
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

  const onSubmit = async (data: Partial<Campaign>) => {
    // console.log(data);
    const newData: any = {
      ...data,
      campaignProducts: listChosenProduct.map(item => ({productId: item.id})),
    };
    if (id) {
      await campaignService.update(id, {id, ...newData});
    } else {
      const res = await campaignService.create(newData);
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
      const res = await campaignService.getOne(id);
      if (res) {
        setValue('name', res.name);
        setValue('image', res.image);
        setValue('status', res.status);
        console.log(res);
        setListChosenProduct(res.campaignProducts.map(item => item.product));
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
  const columns = [
    {
      field: 'Check',
      headerName: 'Select',
      renderCell: (row: Product) => (
        <Checkbox
          checked={listChosenProduct.map(item => item.id).includes(row.id)}
          onChange={(e, checked) => handleChangeCheckbox(checked, row)}
        />
        // <img src={row.image} width={50} height={50} alt={row.name} style={{objectFit: 'contain'}} />
      ),
    },
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
    <Page title={id ? 'Cập nhật' : 'Thêm chiến dịch'}>
      <CardBase
        actions={
          <Stack direction="row" justifyContent="flex-end" margin={2}>
            <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
              {id ? 'Cập nhật' : 'Thêm chiến dịch'}
            </Button>
          </Stack>
        }
      >
        <Grid container sx={{padding: 2}} spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <InputField form={form} name="name" label="Tên chiến dịch" />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ImagePickerField form={form} name="image" label="Hình ảnh" />
            {/* <FilePickerField form={form} name="image" label="Hình ảnh" /> */}
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <CheckboxField form={form} name="status" label="Trạng thái" />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
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
      </CardBase>

      <LoadingOverlay open={isSubmitting} />
    </Page>
  );
};

export default ChiTietChienDichPage;
