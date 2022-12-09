import {Button, IconButton, Stack} from '@mui/material';
import {Trash} from 'iconsax-react';
import queryString from 'query-string';
import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router';
import {DataTable, DialogConfirm, SearchBar} from '../../../components/base';
import LoadingOverlay from '../../../components/base/loading-overlay';
import {useWindowDimensions} from '../../../hooks';
import useCheckQuyen from '../../../hooks/useCheckQuyen';
import Page from '../../../layouts/Page';
import {Transaction, PaginationParams, QueryParams} from '../../../models';
import {transactionFailService} from '../../../services';
import {colors} from '../../../theme';

const DanhSachGiaoDichLoiPage = () => {
  const location = useLocation();
  const [checkQuyen] = useCheckQuyen();

  const queryParams: QueryParams = queryString.parse(location.search);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {height} = useWindowDimensions();
  const [isOpenDelete, setIsOpenDelete] = useState<{visible: boolean; id: number | string}>({
    visible: false,
    id: 0,
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [listTransactionFail, setListTransactionFail] = useState<Transaction[]>([]);
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

  const columns = [
    {
      field: 'transactionId',
      headerName: 'Mã giao dịch',
    },
    {
      field: 'productId',
      headerName: 'Id sản phẩm',
    },
    {
      field: 'productCode',
      headerName: 'Mã sản phẩm',
      valueGetter: (row: Transaction) => row.product.productCode,
    },
    {
      field: 'customerId',
      headerName: 'Mã khách hàng',
    },
    {
      field: 'customerPhone',
      headerName: 'Số điện thoại khách hàng',
    },
    {
      field: 'description',
      headerName: 'Nguyên nhân',
    },
    // ...(checkQuyen('delete')
    //   ? [
    //       {
    //         field: '',
    //         headerName: '',
    //         renderCell: (row: Transaction) => (
    //           <IconButton
    //             color="error"
    //             onClick={e => {
    //               e.stopPropagation();
    //               setIsOpenDelete({visible: true, id: row.id});
    //             }}
    //           >
    //             <Trash fontSize={20} color={colors.error} />
    //           </IconButton>
    //         ),
    //       },
    //     ]
    //   : []),
  ];

  const handleDelete = async () => {
    setIsDeleting(true);
    setIsOpenDelete(prev => ({...prev, visible: false}));
    const res = await transactionFailService.delete(isOpenDelete.id);
    if (res) {
      setFilters(prev => ({...prev, pageNumber: 1}));
    }
    setIsDeleting(false);
  };
  useEffect(() => {
    const getList = async () => {
      setIsLoading(true);
      const res = await transactionFailService.getAll(filters);
      if (res) {
        const {currentPage, pageSize, totalCount, totalPages, hasNext, hasPrevious} = res;

        setListTransactionFail(res.data);
        setPagination({currentPage, pageSize, totalCount, totalPages, hasNext, hasPrevious});
      }
      setIsLoading(false);
    };
    getList();
  }, [filters]);

  return (
    <Page title="Danh sách danh mục">
      <Stack direction="row" justifyContent="space-between" marginBottom={2}>
        <SearchBar onSubmit={value => setFilters(prev => ({...prev, search: value}))} />

        {checkQuyen('create') && (
          <Button
            variant="contained"
            onClick={() => {
              navigate('them-danh-muc');
            }}
          >
            Thêm danh mục
          </Button>
        )}
      </Stack>

      <DataTable
        columns={columns}
        rows={listTransactionFail}
        loading={isLoading}
        height={height - 200}
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
      />

      <DialogConfirm
        open={isOpenDelete.visible}
        title="Xác nhận"
        content="Bạn có chắc chắn muốn xóa danh mục này?"
        onClose={() => setIsOpenDelete(prev => ({...prev, visible: false}))}
        onAgree={handleDelete}
      />
      <LoadingOverlay open={isDeleting} />
    </Page>
  );
};

export default DanhSachGiaoDichLoiPage;
