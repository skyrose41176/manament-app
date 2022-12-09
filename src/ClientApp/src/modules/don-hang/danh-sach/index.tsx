import {DateRange, LocalizationProvider} from '@mui/lab';
import AdapterDate from '@mui/lab/AdapterMoment';
import DateRangePicker from '@mui/lab/DateRangePicker';
import {Box, Button, IconButton, Stack, TextField, Tooltip} from '@mui/material';
import {Verify} from 'iconsax-react';
import queryString from 'query-string';
import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAppDispatch} from 'src/redux/hooks';
import {setShowAlert} from 'src/redux/slice/alertSlice';
import writeXlsxFile from 'write-excel-file';
import {DataTable, SearchBar} from '../../../components/base';
import useCheckQuyen from '../../../hooks/useCheckQuyen';
import Page from '../../../layouts/Page';
import {PaginationParams, QueryParams, Transaction} from '../../../models';
import transactionService from '../../../services/transaction-service';
import {colors} from '../../../theme';
import {state, stateColor} from '../../../utils/state';
import DialogDetail from './dialog-detail';
import DialogVerify from './dialog-verify';

const DanhSachDonHangPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams: QueryParams = queryString.parse(location.search);
  const [openDialog, setOpenDialog] = useState<{open: boolean; row?: any}>({
    open: false,
    row: null,
  });
  const [openDialogVerify, setOpenDialogVerify] = useState<{open: boolean; data?: any}>({
    open: false,
    data: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const [list, setList] = useState<Transaction[]>([]);
  const [dateRange, setDateRange] = useState<DateRange<Date>>([null, null]);

  const [filters, setFilters] = useState<QueryParams & {from?: Date; to?: Date}>({
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

  const handleCloseDialog = () => setOpenDialog(prev => ({...prev, open: false}));

  const columns = [
    {
      field: 'transactionId',
      headerName: 'Mã giao dịch',
    },
    {
      field: 'customerId',
      headerName: 'Mã khách hàng',
    },
    {
      field: 'customerPhone',
      headerName: 'Sđt khách hàng',
    },
    {field: 'productCode', headerName: 'Mã sản phẩm'},

    {
      field: 'productName',
      headerName: 'Tên sản phẩm',
    },
    {
      field: 'productPoint',
      headerName: 'Điểm',
    },
    {
      field: 'productPrice',
      headerName: 'Giá',
    },
    {
      field: 'state',
      headerName: 'Trạng thái',
      renderCell: (row: any) => <Box sx={{color: stateColor(row.state)}}>{state(row.state)}</Box>,
    },
    // {
    //   field: 'linkUse',
    //   headerName: 'Đường dẫn sử dụng voucher',
    // },
    {
      field: 'created',
      headerName: 'Ngày giao dịch',
      renderCell: (row: any) => (row.created ? new Date(row.created).toLocaleDateString('vi') : ''),
    },
    {
      field: 'expiryDate',
      headerName: 'Ngày hết hạn',
      renderCell: (row: any) =>
        row.expiryDate ? new Date(row.expiryDate).toLocaleDateString('vi') : '',
    },
    {
      field: 'usedTime',
      headerName: 'Thời gian sử dụng',
      renderCell: (row: any) => (row.usedTime ? new Date(row.usedTime).toLocaleString('vi') : ''),
    },
    {
      field: '',
      headerName: '',
      renderCell: (row: Transaction) => (
        <Tooltip title="Kiểm tra giao dịch">
          <IconButton
            size="medium"
            color="primary"
            onClick={e => {
              e.stopPropagation();
              transactionService
                .stateTrans({
                  partner: row.product?.partner,
                  transId: row.transactionId + '',
                })
                .then(res => {
                  setOpenDialogVerify({open: true, data: res});
                });
            }}
          >
            <Verify color={colors.primary} />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  useEffect(() => {
    const getList = async () => {
      setIsLoading(true);
      const res = await transactionService.getAll(filters);
      if (res) {
        const {currentPage, pageSize, totalCount, totalPages, hasNext, hasPrevious} = res;

        setList(res.data);
        setPagination({currentPage, pageSize, totalCount, totalPages, hasNext, hasPrevious});
      }
      setIsLoading(false);
    };
    getList();
  }, [filters]);

  useEffect(() => {
    dateRange[0] &&
      dateRange[1] &&
      setFilters(prev => ({
        ...prev,
        from: dateRange[0] || undefined,
        to: dateRange[1] || undefined,
      }));
  }, [dateRange]);

  const [checkQuyen] = useCheckQuyen();
  const dispatch = useAppDispatch();
  return (
    <Page title="Danh sách đơn hàng">
      <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom={2}>
        <SearchBar onSubmit={value => setFilters(prev => ({...prev, search: value}))} />
        <LocalizationProvider dateAdapter={AdapterDate} locale={'vi'}>
          <DateRangePicker
            startText="Từ ngày"
            toolbarPlaceholder="dd/mm/yyyy"
            endText="Đến ngày"
            value={dateRange}
            inputFormat={'DD/MM/YYYY'}
            onChange={newValue => {
              setDateRange(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} margin="dense" InputLabelProps={{shrink: true}} />
                <Box sx={{mx: 2}}> Đến </Box>
                <TextField {...endProps} margin="dense" InputLabelProps={{shrink: true}} />
              </>
            )}
          />
        </LocalizationProvider>

        <Button
          variant="contained"
          onClick={async () => {
            const res = await transactionService.getAll({
              pageNumber: 1,
              pageSize: pagination.totalCount ?? 10,
            });
            if (res?.data) {
              const datas: any[] = res?.data.map(item => {
                const {customerId, product, created, expiryDate, usedTime, ...rest} = item;
                return {
                  ...rest,
                  customerId: customerId + '',
                  productName: product?.name,
                  productCode: product?.productCode,
                  productPoint: product.point + '',
                  productPrice: product.price + '',
                  state: state(item.state),
                  created: created ? new Date(created).toLocaleDateString('vi') : '',
                  expiryDate: expiryDate ? new Date(expiryDate).toLocaleDateString('vi') : '',
                  usedTime: usedTime ? new Date(usedTime).toLocaleString('vi') : '',
                };
              });
              await writeXlsxFile(datas, {
                schema: columns.map(item => ({
                  column: item.headerName,
                  type: String,
                  value: (row: {[x: string]: string}) => row?.[`${item.field}`],
                })),
                fileName: `DanhSach_DonHang.xlsx`,
              });
            } else {
              dispatch(setShowAlert({type: 'info', message: 'Không có dữ liệu để xuất file'}));
            }
          }}
        >
          Tải xuống file Excel
        </Button>
      </Stack>

      <DataTable
        columns={columns}
        rows={list.map(item => ({
          ...item,
          productCode: item.product.productCode,
          productName: item.product.name,
          productPoint: item.product.point,
        }))}
        loading={isLoading}
        onRowClick={row => {
          setOpenDialog(prev => ({...prev, open: true, row}));
        }}
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

      {openDialog.open && (
        <DialogDetail open={openDialog.open} row={openDialog.row} onClose={handleCloseDialog} />
      )}
      {openDialogVerify.open && (
        <DialogVerify
          open={openDialogVerify.open}
          data={openDialogVerify.data}
          onClose={() =>
            setOpenDialogVerify({
              open: false,
              data: null,
            })
          }
        />
      )}
    </Page>
  );
};

export default DanhSachDonHangPage;
