import {Button, IconButton, Stack} from '@mui/material';
import {Trash} from 'iconsax-react';
import queryString from 'query-string';
import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {DataTable, DialogConfirm, SearchBar} from 'src/components/base';
import LoadingOverlay from 'src/components/base/loading-overlay';
import {useWindowDimensions} from 'src/hooks';
import useCheckQuyen from 'src/hooks/useCheckQuyen';
import Page from 'src/layouts/Page';
import {Banner} from 'src/models/banner';
import {PaginationParams, QueryParams} from 'src/modules/common';
import {bannerService} from 'src/services';
import {colors} from 'src/theme';

const DanhSachBannerPage = () => {
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
  const [listBanner, setListBanner] = useState<Banner[]>([]);
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
      renderCell: (row: Banner) => (
        <img src={row.image} width={50} height={50} alt={row.name} style={{objectFit: 'contain'}} />
      ),
    },
    {
      field: 'name',
      headerName: 'Tên banner',
    },
    {
      field: 'link',
      headerName: 'Đường dẫn',
    },
    {
      field: 'description',
      headerName: 'Mô tả',
    },
    // {
    //   field: 'status',
    //   headerName: 'Trạng thái',
    //   valueGetter: (row: Banner) => (row.status ? 'true' : 'false'),
    // },
    ...(checkQuyen('delete')
      ? [
          {
            field: '',
            headerName: '',
            renderCell: (row: Banner) => (
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
    const res = await bannerService.delete(isOpenDelete.id);
    if (res) {
      setFilters(prev => ({...prev, pageNumber: 1}));
    }
    setIsDeleting(false);
  };

  useEffect(() => {
    const getList = async () => {
      setIsLoading(true);
      const res = await bannerService.getAll(filters);
      if (res) {
        const {currentPage, pageSize, totalCount, totalPages, hasNext, hasPrevious} = res;

        setListBanner(res.data);
        setPagination({currentPage, pageSize, totalCount, totalPages, hasNext, hasPrevious});
      }
      setIsLoading(false);
    };
    getList();
  }, [filters]);
  return (
    <Page title="Danh sách banner">
      <Stack direction="row" justifyContent="space-between" marginBottom={2}>
        <SearchBar onSubmit={value => setFilters(prev => ({...prev, search: value}))} />
        <Button
          variant="contained"
          onClick={() => {
            navigate('/banner/quan-ly/them-banner');
          }}
        >
          Thêm banner
        </Button>
      </Stack>
      {/* <DataTable
        columns={columns}
        rows={listBanner}
        loading={isLoading}
        // height={height - 200}
        onRowClick={
          checkQuyen('edit')
            ? (row: Campaign) => {
                navigate(`/banner/quan-ly/sua-banner/${row.id}`);
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
      /> */}

      <DialogConfirm
        open={isOpenDelete.visible}
        title="Xác nhận"
        content="Bạn có chắc chắn muốn xóa banner này?"
        onClose={() => setIsOpenDelete(prev => ({...prev, visible: false}))}
        onAgree={handleDelete}
      />
      <LoadingOverlay open={isDeleting} />
    </Page>
  );
};

export default DanhSachBannerPage;
