import {Button, IconButton, Stack, styled} from '@mui/material';
import {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import queryString from 'query-string';
import {DataTable, DialogConfirm, SearchBar} from 'src/components/base';
import LoadingOverlay from 'src/components/base/loading-overlay';
import useCheckQuyen from 'src/hooks/useCheckQuyen';
import Page from 'src/layouts/Page';
import {HopDong, PaginationParams, QueryParams} from 'src/models';
import {Trash, Unlimited} from 'iconsax-react';
import {colors} from 'src/theme';
import {useWindowDimensions} from 'src/hooks';
import {hopDongService, xepHangService} from 'src/services';
import {XepHang} from 'src/models/xepHang';

const Input = styled('input')({
  display: 'none',
});

const DanhSachXepHangPage = () => {
  const [checkQuyen] = useCheckQuyen();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams: QueryParams = queryString.parse(location.search);
  const [filters, setFilters] = useState<QueryParams>({
    ...queryParams,
    search: queryParams.search ?? '',
    pageNumber: queryParams.pageNumber ?? 1,
    pageSize: queryParams.pageSize ?? 10,
  });
  const [listXepHang, setListXepHang] = useState<XepHang[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState<{visible: boolean; id: number | string}>({
    visible: false,
    id: 0,
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const {height} = useWindowDimensions();
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
      field: 'image',
      headerName: 'Hình ảnh',
    },
    {
      field: 'name',
      headerName: 'Tên xếp hạng',
    },
    {
      field: 'startPoint',
      headerName: 'Điểm bắt đầu',
    },
    {
      field: 'endPoint',
      headerName: 'Điểm kết thúc',
    },
    {
      field: 'infinity',
      headerName: 'Vô hạn',
      center: true,
      renderCell: (row: XepHang) => row.infinity && <Unlimited color="#4bcb24" size={20} />,
    },
    {
      field: 'description',
      headerName: 'Mô tả',
    },
    ...(checkQuyen('delete')
      ? [
          {
            field: '',
            headerName: '',
            renderCell: (row: XepHang) => (
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
    const res = await xepHangService.delete(isOpenDelete.id);
    if (res) {
      setFilters(prev => ({...prev, pageNumber: 1}));
    }
    setIsDeleting(false);
  };

  const getList = async () => {
    setIsLoading(true);
    const res = await xepHangService.getAll(filters);
    if (res) {
      const {currentPage, pageSize, totalCount, totalPages, hasNext, hasPrevious} = res;

      setListXepHang(res.data);
      setPagination({currentPage, pageSize, totalCount, totalPages, hasNext, hasPrevious});
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getList();
  }, [filters]);

  return (
    <Page title="Danh sách xếp hạng">
      <Stack direction="row" justifyContent="space-between" marginBottom={2}>
        <SearchBar onSubmit={value => setFilters(prev => ({...prev, search: value}))} />

        {checkQuyen('create') && (
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Button
              variant="contained"
              onClick={() => {
                navigate('/xep-hang/quan-ly/them-xep-hang');
              }}
            >
              Thêm xếp hạng
            </Button>
          </Stack>
        )}
      </Stack>
      <DataTable
        columns={columns}
        rows={listXepHang}
        loading={isLoading}
        height={height - 200}
        onRowClick={
          checkQuyen('edit')
            ? (row: HopDong) => {
                navigate(`/xep-hang/quan-ly/sua-xep-hang/${row.id}`);
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
        content="Bạn có chắc chắn muốn xóa xếp hạng này?"
        onClose={() => setIsOpenDelete(prev => ({...prev, visible: false}))}
        onAgree={handleDelete}
      />
      <LoadingOverlay open={isDeleting} />
    </Page>
  );
};

export default DanhSachXepHangPage;
