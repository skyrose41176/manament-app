import {Button, IconButton, Stack} from '@mui/material';
import {CloseCircle, TickCircle, Trash} from 'iconsax-react';
import queryString from 'query-string';
import React, {useCallback, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router';
import {DataTable, DialogConfirm, SearchBar} from '../../../components/base';
import LoadingOverlay from '../../../components/base/loading-overlay';
import {useWindowDimensions} from '../../../hooks';
import useCheckQuyen from '../../../hooks/useCheckQuyen';
import Page from '../../../layouts/Page';
import {Category, PaginationParams, QueryParams, ThuongHieu} from '../../../models';
import {categoryService, thuongHieuService} from '../../../services';
import {colors} from '../../../theme';

const DanhSachThuongHieuPage = () => {
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
  const [listThuongHieu, setListThuongHieu] = useState<ThuongHieu[]>([]);
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
      field: 'hinhAnh',
      headerName: 'Hình ảnh',
      renderCell: (row: ThuongHieu) => (
        <img
          src={row.hinhAnh}
          width={50}
          height={50}
          alt={row.ten}
          style={{objectFit: 'contain'}}
        />
      ),
    },
    {
      field: 'ten',
      headerName: 'Tên thương hiệu',
    },
    {
      field: 'trangThai',
      headerName: 'Trạng thái',
      center: true,
      renderCell: (row: ThuongHieu) =>
        row.trangThai ? (
          <TickCircle color="#4bcb24" size={20} />
        ) : (
          <CloseCircle color="#FF4842" size={20} />
        ),
    },
    ...(checkQuyen('delete')
      ? [
          {
            field: '',
            headerName: '',
            renderCell: (row: Category) => (
              <IconButton
                color="error"
                onClick={e => {
                  e.stopPropagation();
                  setIsOpenDelete({visible: true, id: row.id});
                }}
              >
                <Trash fontSize={20} color={colors.error} />
              </IconButton>
            ),
          },
        ]
      : []),
  ];

  const handleDelete = async () => {
    setIsDeleting(true);
    setIsOpenDelete(prev => ({...prev, visible: false}));
    const res = await thuongHieuService.delete(isOpenDelete.id);
    if (res) {
      setFilters(prev => ({...prev, pageNumber: 1}));
    }
    setIsDeleting(false);
  };

  const getList = useCallback(async () => {
    setIsLoading(true);
    const res = await thuongHieuService.getAll(filters);
    if (res) {
      const {currentPage, pageSize, totalCount, totalPages, hasNext, hasPrevious} = res;

      setListThuongHieu(res.data);
      setPagination({currentPage, pageSize, totalCount, totalPages, hasNext, hasPrevious});
    }
    setIsLoading(false);
  }, [filters]);

  useEffect(() => {
    getList();
  }, [getList]);

  const handleSyncThuongHieu = async () => {
    await thuongHieuService.getSync();
    await getList();
  };

  return (
    <Page title="Danh sách thương hiệu">
      <Stack direction="row" justifyContent="space-between" marginBottom={2}>
        <SearchBar onSubmit={value => setFilters(prev => ({...prev, search: value}))} />
        <Button variant="contained" onClick={handleSyncThuongHieu}>
          Đồng bộ
        </Button>
      </Stack>

      <DataTable
        columns={columns}
        rows={listThuongHieu}
        loading={isLoading}
        height={height - 200}
        onRowClick={
          checkQuyen('edit')
            ? (row: Category) => {
                navigate(`/thuong-hieu/quan-ly/sua-thuong-hieu/${row.id}`);
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

export default DanhSachThuongHieuPage;
