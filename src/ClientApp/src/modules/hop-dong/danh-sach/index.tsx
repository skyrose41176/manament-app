import {Button, IconButton, Stack, styled} from '@mui/material';
import {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import queryString from 'query-string';
import {DataTable, DialogConfirm, SearchBar} from 'src/components/base';
import LoadingOverlay from 'src/components/base/loading-overlay';
import useCheckQuyen from 'src/hooks/useCheckQuyen';
import Page from 'src/layouts/Page';
import {Campaign, HopDong, PaginationParams, QueryParams} from 'src/models';
import {TickCircle, Trash} from 'iconsax-react';
import {colors} from 'src/theme';
import {useWindowDimensions} from 'src/hooks';
import {campaignService, hopDongService} from 'src/services';
import readXlsxFile from 'read-excel-file';
import {ColumnTableProps} from 'src/components/types';
import {formatNumber} from 'src/utils/format';

const Input = styled('input')({
  display: 'none',
});

const DanhSachHopDongPage = () => {
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
  const [listHopDong, setListHopDong] = useState<HopDong[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState<{visible: boolean; id: number | string}>({
    visible: false,
    id: 0,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [listUpload, setListUpload] = useState<HopDong[]>([]);
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
      field: 'maHopDong',
      headerName: 'Mã hợp đồng',
    },
    {
      field: 'maKh',
      headerName: 'Mã khách hàng',
    },
    {
      field: 'tenKh',
      headerName: 'Tên khách hàng',
    },
    {
      field: 'sdtKh',
      headerName: 'Số điện thoại KH',
    },
    {
      field: 'point',
      headerName: 'Số điểm',
      renderCell: (row: HopDong) => formatNumber(row?.point),
    },
    {
      field: 'maNv',
      headerName: 'Nhân viên sale',
    },
    ...(checkQuyen('delete')
      ? [
          {
            field: '',
            headerName: '',
            renderCell: (row: HopDong) => (
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
    const res = await hopDongService.delete(isOpenDelete.id);
    if (res) {
      setFilters(prev => ({...prev, pageNumber: 1}));
    }
    setIsDeleting(false);
  };

  const columnsExcel = [
    {
      field: 'maHopDong',
      headerName: 'MaHopDong',
    },
    {
      field: 'point',
      headerName: 'Point',
    },
    {
      field: 'maNv',
      headerName: 'MaNv',
    },
    {
      field: 'tenKh',
      headerName: 'TenKh',
    },
  ];
  const getList = async () => {
    setIsLoading(true);
    const res = await hopDongService.getAll(filters);
    if (res) {
      const {currentPage, pageSize, totalCount, totalPages, hasNext, hasPrevious} = res;

      setListHopDong(res.data);
      setPagination({currentPage, pageSize, totalCount, totalPages, hasNext, hasPrevious});
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getList();
  }, [filters]);

  const importHopDong = async (rows: any) => {
    const res = await hopDongService.import({hopDongs: rows});
    getList();
  };
  return (
    <Page title="Danh sách hợp đồng">
      <Stack direction="row" justifyContent="space-between" marginBottom={2}>
        <SearchBar onSubmit={value => setFilters(prev => ({...prev, search: value}))} />

        {checkQuyen('create') && (
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <label htmlFor={listUpload.length > 0 ? '' : 'upload'}>
              <Input
                onChange={e => {
                  e.target?.files?.[0] &&
                    readXlsxFile(e.target.files[0], {
                      map: columnsExcel.reduce((a, v) => ({...a, [v.headerName]: v.field}), {}),
                    }).then(async ({rows}: any) => {
                      await importHopDong(rows);
                      setListUpload(rows);
                      setOpenDialog(true);
                    });
                  e.target.value = '';
                }}
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                id="upload"
                type="file"
              />
              <Button
                component="span"
                variant="outlined"
                startIcon={listUpload.length ? <TickCircle size="16" variant="Bulk" /> : null}
              >
                Tải lên file Excel
              </Button>
            </label>
            <Button
              variant="contained"
              onClick={() => {
                navigate('/hop-dong/quan-ly/them-hop-dong');
              }}
            >
              Thêm hợp đồng
            </Button>
          </Stack>
        )}
      </Stack>
      <DataTable
        columns={columns}
        rows={listHopDong}
        loading={isLoading}
        height={height - 200}
        onRowClick={
          checkQuyen('edit')
            ? (row: HopDong) => {
                navigate(`/hop-dong/quan-ly/sua-hop-dong/${row.id}`);
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
        content="Bạn có chắc chắn muốn xóa hợp đồng này?"
        onClose={() => setIsOpenDelete(prev => ({...prev, visible: false}))}
        onAgree={handleDelete}
      />
      <LoadingOverlay open={isDeleting} />
    </Page>
  );
};

export default DanhSachHopDongPage;
