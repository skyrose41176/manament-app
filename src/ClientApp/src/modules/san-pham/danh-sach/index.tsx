import {LoadingButton} from '@mui/lab';
import {Autocomplete, Box, createFilterOptions, Stack, TextField} from '@mui/material';
import queryString from 'query-string';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useLocation, useNavigate} from 'react-router';
import {Product} from 'src/models/product';
import {PaginationParams, QueryParams} from 'src/modules/common';
import {DataTable, DialogConfirm, SearchBar} from '../../../components/base';
import LoadingOverlay from '../../../components/base/loading-overlay';
import {useWindowDimensions} from '../../../hooks';
import useCheckQuyen from '../../../hooks/useCheckQuyen';
import Page from '../../../layouts/Page';
import {productService} from '../../../services';

const DanhSachSanPhamPage = () => {
  const location = useLocation();
  const queryParams: any = queryString.parse(location.search);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {height} = useWindowDimensions();
  const [isOpenDelete, setIsOpenDelete] = useState<{visible: boolean; id: number | string}>({
    visible: false,
    id: 0,
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [listProduct, setListProduct] = useState<Product[]>([]);
  const [filters, setFilters] = useState<QueryParams>({
    ...queryParams,
    search: queryParams.search ?? '',
    pageNumber: queryParams.pageNumber ?? 1,
    pageSize: queryParams.pageSize ?? 10,
  });
  const [pagination, setPagination] = useState<PaginationParams>({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalCount: 0,
    hasPrevious: false,
    hasNext: false,
  });
  const formFilter = useForm();
  const {watch} = formFilter;
  const columns = [
    {
      field: 'productId',
      headerName: 'Id sản phẩm',
    },
    {
      field: 'productCode',
      headerName: 'Mã sản phẩm',
    },
    {field: 'name', headerName: 'Tên sản phẩm'},

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
    // {
    //   field: '',
    //   headerName: '',
    //   renderCell: (row: any) => (
    //     <IconButton
    //       size="medium"
    //       color="error"
    //       onClick={e => {
    //         e.stopPropagation();
    //         setIsOpenDelete({visible: true, id: row.id});
    //       }}
    //     >
    //       <Trash color={colors.error} />
    //     </IconButton>
    //   ),
    // },
  ];

  const handleDelete = async () => {
    setIsDeleting(true);
    setIsOpenDelete(prev => ({...prev, visible: false}));
    const res = await productService.delete(isOpenDelete.id);
    if (res) {
      setFilters(prev => ({...prev, pageNumber: 1}));
    }
    setIsDeleting(false);
  };
  const getList = async () => {
    setIsLoading(true);
    const res = await productService.getAll(filters);
    if (res) {
      const {currentPage, pageSize, totalCount, totalPages, hasNext, hasPrevious} = res;

      setListProduct(res.data);
      setPagination({currentPage, pageSize, totalCount, totalPages, hasNext, hasPrevious});
    }
    setIsLoading(false);
  };
  const [productId, productCode, name, price, point, partner, brandName] = watch([
    'productId',
    'productCode',
    'name',
    'price',
    'point',
    'partner',
    'brandName',
  ]);

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      pageNumber: 1,
      productId,
      productCode,
      name,
      price,
      point,
      partner,
      brandName,
    }));
  }, [productId, productCode, name, price, point, partner, brandName]);

  useEffect(() => {
    getList();
  }, [filters]);
  const [checkQuyen] = useCheckQuyen();

  return (
    <Page title="Danh sách sản phẩm">
      <Stack direction="row" justifyContent="space-between" marginBottom={2}>
        <SearchBar onSubmit={value => setFilters(prev => ({...prev, search: value}))} />
        <ButtonSyncProduct getList={getList} />

        {/* <Button
          variant="contained"
          onClick={() => {
            navigate('them-san-pham');
          }}
        >
          Thêm sản phẩm
        </Button> */}
      </Stack>
      <DataTable
        columns={columns}
        rows={listProduct}
        loading={isLoading}
        height={height - 200}
        onRowClick={
          checkQuyen('edit')
            ? (row: Product) => {
                navigate(`/san-pham/quan-ly/sua-san-pham/${row.id}`);
              }
            : undefined
        }
        pagination={{
          show: true,
          page: pagination.currentPage - 1,
          totalCount: pagination.totalCount,
          rowsPerPage: pagination.pageSize,
          onPageChange: page => {
            setFilters(prev => ({...prev, pageNumber: page + 1}));
          },
          onRowsPerPageChange: value => {
            setFilters(prev => ({...prev, pageSize: value, pageNumber: 1}));
          },
        }}
        formFilter={formFilter}
      />

      <DialogConfirm
        open={isOpenDelete.visible}
        title="Xác nhận"
        content="Bạn có chắc chắn muốn xóa sản phẩm này?"
        onClose={() => setIsOpenDelete(prev => ({...prev, visible: false}))}
        onAgree={handleDelete}
      />
      <LoadingOverlay open={isDeleting} />
    </Page>
  );
};

const filter = createFilterOptions<string>();

const ButtonSyncProduct = ({getList}: any) => {
  const [isLoadingDongBo, setIsLoadingDongBo] = useState(false);
  const [value, setValue] = useState('Tất cả');
  return (
    <Box>
      <Autocomplete
        options={['Tất cả', 'GOTIT', 'URBOX', 'F5S']}
        getOptionLabel={option => option}
        value={value}
        defaultValue={'Tất cả'}
        onChange={(event, value, reason) => {
          if (reason === 'clear' || reason === 'removeOption' || reason === 'blur') {
            setValue('Tất cả');
            return;
          }
          setValue(value ?? 'Tất cả');
        }}
        clearOnBlur
        freeSolo
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const {inputValue} = params;
          // Suggest the creation of a new value
          const isExisting = options.some(option => inputValue === option);
          if (inputValue !== '' && !isExisting) {
            filtered.push(inputValue);
          }

          return filtered;
        }}
        renderInput={params => (
          <TextField
            {...params}
            size="small"
            margin="dense"
            placeholder="Đối tác"
            variant="outlined"
            fullWidth
            aria-haspopup={false}
            sx={{
              minWidth: '350px',
              '& .MuiOutlinedInput-root': {
                paddingRight: '4px !important',
              },
            }}
            InputProps={{
              ...params.InputProps,
              type: 'search',
              endAdornment: (
                <LoadingButton
                  size="small"
                  loading={isLoadingDongBo}
                  variant="contained"
                  onClick={() => {
                    setIsLoadingDongBo(true);
                    if (value === 'Tất cả') {
                      productService
                        .sync()
                        .then(() => getList())
                        .finally(() => {
                          setIsLoadingDongBo(false);
                        });
                    } else {
                      productService
                        .sync(value)
                        .then(() => getList())
                        .finally(() => {
                          setIsLoadingDongBo(false);
                        });
                    }
                  }}
                >
                  Đồng bộ dữ liệu
                </LoadingButton>
              ),
            }}
          />
        )}
      />
    </Box>
  );
};

export default DanhSachSanPhamPage;
