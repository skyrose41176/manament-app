import {Box, Button, Card, CardContent} from '@mui/material';
import moment from 'moment';
import queryString from 'query-string';
import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAppDispatch} from 'src/redux/hooks';
import {setShowAlert} from 'src/redux/slice/alertSlice';
import {state, stateColor} from 'src/utils/state';
import writeXlsxFile from 'write-excel-file';
import {DataTable} from '../../../components/base';
import useCheckQuyen from '../../../hooks/useCheckQuyen';
import Page from '../../../layouts/Page';
import {PaginationParams, QueryParams, Transaction} from '../../../models';
import transactionService from '../../../services/transaction-service';
import DialogDetail from './dialog-detail';
import DialogVerify from './dialog-verify';
import FormSearchComponent from './FormSearch';

const TimKiemDonHangPage = () => {
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
      field: 'name',
      headerName: 'Tên sản phẩm',
    },
    {
      field: 'point',
      headerName: 'Điểm',
    },
    {
      field: 'price',
      headerName: 'Giá',
    },
    {
      field: 'stateName',
      headerName: 'Trạng thái',
      renderCell: (row: any) => (
        <Box sx={{color: stateColor(row.stateCode)}}>{state(row.stateCode)}</Box>
      ),
    },
    {
      field: 'linkUse',
      headerName: 'Đường dẫn sử dụng voucher',
    },
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
      renderCell: (row: any) => (row.expiryDate ? new Date(row.usedTime).toLocaleString('vi') : ''),
    },
    // {
    //   field: '',
    //   headerName: '',
    //   renderCell: (row: Transaction) => (
    //     <Tooltip title="Kiểm tra giao dịch">
    //       <IconButton
    //         size="medium"
    //         color="primary"
    //         onClick={e => {
    //           e.stopPropagation();
    //           transactionService
    //             .stateTrans({
    //               partner: row.product?.partner,
    //               transId: row.transactionId + '',
    //             })
    //             .then(res => {
    //               setOpenDialogVerify({open: true, data: res});
    //             });
    //         }}
    //       >
    //         <Verify color={colors.primary} />
    //       </IconButton>
    //     </Tooltip>
    //   ),
    // },
  ];

  const onSubmit = (data: any) => {
    setFilters(prev => ({
      ...prev,
      ...data,
      stateCode: data.stateCode?.value,
      expiryDate: data?.expiryDate ? moment(data?.expiryDate).format('YYYY-MM-DD') : undefined,
      usedTime: data?.usedTime ? moment(data?.usedTime).format('YYYY-MM-DD HH:MM') : undefined,
      created: data?.created ? moment(data?.created).format('YYYY-MM-DD') : undefined,
    }));
  };

  const handleXuatFile = async () => {
    const res: any = await transactionService.giaoDich({
      pageNumber: 1,
      pageSize: pagination.totalCount ?? 10,
    });
    if (res?.data) {
      const data: any[] = res?.data.map((item: any) => {
        console.log(item);
        const {customerId, point, price, stateCode, type, created, expiryDate, usedTime, ...rest} =
          item;
        return {
          ...rest,
          customerId: customerId + '',
          point: point + '',
          price: price + '',
          created: created ? new Date(created).toLocaleDateString('vi') : '',
          expiryDate: expiryDate ? new Date(expiryDate).toLocaleDateString('vi') : '',
          usedTime: usedTime ? new Date(usedTime).toLocaleString('vi') : '',
        };
      });
      await writeXlsxFile(data, {
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
  };

  useEffect(() => {
    const getList = async () => {
      setIsLoading(true);
      const res = await transactionService.giaoDich(filters);
      if (res) {
        const {currentPage, pageSize, totalCount, totalPages, hasNext, hasPrevious} = res;

        setList(res.data);
        setPagination({currentPage, pageSize, totalCount, totalPages, hasNext, hasPrevious});
      }
      setIsLoading(false);
    };
    getList();
  }, [filters]);

  const [checkQuyen] = useCheckQuyen();
  const dispatch = useAppDispatch();
  return (
    <Page title="Danh sách đơn hàng">
      <Button variant="contained" onClick={handleXuatFile}>
        Tải xuống file Excel
      </Button>

      <Card sx={{mt: 2, mb: 2}}>
        <CardContent>
          <FormSearchComponent onSubmit={onSubmit} />
        </CardContent>
      </Card>

      <DataTable
        columns={columns}
        rows={list}
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

export default TimKiemDonHangPage;
