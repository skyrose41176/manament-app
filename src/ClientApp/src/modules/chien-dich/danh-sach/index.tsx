import {Button, IconButton, Stack} from '@mui/material';
import {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import queryString from 'query-string';
import {DataTable, DialogConfirm, SearchBar} from 'src/components/base';
import LoadingOverlay from 'src/components/base/loading-overlay';
import useCheckQuyen from 'src/hooks/useCheckQuyen';
import Page from 'src/layouts/Page';
import {Campaign, PaginationParams, QueryParams} from 'src/models';
import {Trash} from 'iconsax-react';
import {colors} from 'src/theme';
import {useWindowDimensions} from 'src/hooks';
import {campaignService} from 'src/services';

const DanhSachChienDichPage = () => {
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
  const [listCampaign, setListCampaign] = useState<Campaign[]>([]);
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
      renderCell: (row: Campaign) => (
        <img src={row.image} width={50} height={50} alt={row.name} style={{objectFit: 'contain'}} />
      ),
    },
    {
      field: 'name',
      headerName: 'Tên chiến dịch',
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      valueGetter: (row: Campaign) => (row.status ? 'true' : 'false'),
    },
    ...(checkQuyen('delete')
      ? [
          {
            field: '',
            headerName: '',
            renderCell: (row: Campaign) => (
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
    const res = await campaignService.delete(isOpenDelete.id);
    if (res) {
      setFilters(prev => ({...prev, pageNumber: 1}));
    }
    setIsDeleting(false);
  };

  useEffect(() => {
    const getList = async () => {
      setIsLoading(true);
      const res = await campaignService.getAll(filters);
      if (res) {
        const {currentPage, pageSize, totalCount, totalPages, hasNext, hasPrevious} = res;

        setListCampaign(res.data);
        setPagination({currentPage, pageSize, totalCount, totalPages, hasNext, hasPrevious});
      }
      setIsLoading(false);
    };
    getList();
  }, [filters]);
  return (
    <Page title="Danh sách chiến dịch">
      <Stack direction="row" justifyContent="space-between" marginBottom={2}>
        <SearchBar onSubmit={value => setFilters(prev => ({...prev, search: value}))} />

        {checkQuyen('create') && (
          <Button
            variant="contained"
            onClick={() => {
              navigate('/chien-dich/quan-ly/them-chien-dich');
            }}
          >
            Thêm chiến dịch
          </Button>
        )}
      </Stack>
      <DataTable
        columns={columns}
        rows={listCampaign}
        loading={isLoading}
        height={height - 200}
        onRowClick={
          checkQuyen('edit')
            ? (row: Campaign) => {
                navigate(`/chien-dich/quan-ly/sua-chien-dich/${row.id}`);
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
        content="Bạn có chắc chắn muốn xóa chiến dịch này?"
        onClose={() => setIsOpenDelete(prev => ({...prev, visible: false}))}
        onAgree={handleDelete}
      />
      <LoadingOverlay open={isDeleting} />
    </Page>
  );
};

export default DanhSachChienDichPage;
