import {Box, Button, Stack} from '@mui/material';
import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router';
import {state, stateColor} from 'src/utils/state';
import {DataTable, SearchBar} from '../../../components/base';
import {useWindowDimensions} from '../../../hooks';
import useCheckQuyen from '../../../hooks/useCheckQuyen';
import Page from '../../../layouts/Page';
import {Transaction} from '../../../models';
import {transactionService} from '../../../services';

const DanhSachCacheDonHangPage = () => {
  const [checkQuyen] = useCheckQuyen();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {height} = useWindowDimensions();

  const [listTransaction, setListTransaction] = useState<Transaction[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageTotal, setPageTotal] = useState(listTransaction?.length ?? 0);

  const columns = [
    {
      field: 'transactionId',
      headerName: 'Mã giao dịch',
    },
    {
      field: 'customerId',
      headerName: 'Mã khách hàng',
    },
    {field: 'productId', headerName: 'Mã sản phẩm'},

    // {
    //   field: 'productName',
    //   headerName: 'Tên sản phẩm',
    // },
    // {
    //   field: 'productPoint',
    //   headerName: 'Điểm',
    // },
    {
      field: 'voucherCode',
      headerName: 'Mã voucher',
    },
    {
      field: 'state',
      headerName: 'Trạng thái',
      renderCell: (row: any) => <Box sx={{color: stateColor(row.state)}}>{state(row.state)}</Box>,
    },
    // {
    //   field: 'created',
    //   headerName: 'Ngày giao dịch',
    //   renderCell: (row: any) => new Date(row.created).toLocaleDateString('vi'),
    // },
    {
      field: 'expiryDate',
      headerName: 'Ngày hết hạn',
      renderCell: (row: any) =>
        row.expiryDate ? new Date(row.expiryDate).toLocaleDateString('vi') : '',
    },
  ];

  const getList = async () => {
    setIsLoading(true);
    const res = await transactionService.cache();
    if (res) {
      setListTransaction(res);
      // setPagination({currentPage, pageSize, totalCount, totalPages, hasNext, hasPrevious});
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getList();
  }, []);

  const [newData, setNewData] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      if (search) {
        const newPage = 1;
        const newData = [
          ...(listTransaction?.filter(item =>
            Object.entries(item)
              .map(([key, value]) => {
                return value?.toString().toLowerCase();
              })
              .toString()
              .includes(search.toLowerCase())
          ) ?? []),
        ];
        const newPageTotal = newData.length;
        setPage(newPage);
        setPageTotal(newPageTotal);

        setNewData(newData.slice((newPage - 1) * newPageTotal, newPage * pageSize));
        return;
      }
      setPageTotal(listTransaction?.length ?? 0);
      setNewData([...(listTransaction?.slice((page - 1) * pageSize, page * pageSize) ?? [])]);
    };
    loadData();
  }, [listTransaction, page, pageSize, search]);

  console.log(search);
  return (
    <Page title="Danh sách cache đơn hàng">
      <Stack direction="row" justifyContent="space-between" marginBottom={2}>
        <SearchBar onSubmit={setSearch} />

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              transactionService.loadCache().then(() => getList());
            }}
          >
            Load cache
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              transactionService.flush().then(() => getList());
            }}
          >
            Xoá bộ nhớ cache
          </Button>
        </Stack>
      </Stack>

      <DataTable
        columns={columns}
        rows={newData}
        loading={isLoading}
        height={height - 200}
        pagination={{
          show: true,
          page: page - 1,
          totalCount: pageTotal,
          rowsPerPage: pageSize,
          onPageChange: page => {
            // setFilters(prev => ({...prev, pageNumber: page + 1}));
            setPage(prev => page + 1);
          },
          onRowsPerPageChange: value => {
            // setFilters(prev => ({...prev, pageSize: value, pageNumber: 1}));
            setPageSize(value);
            setPage(1);
          },
        }}
      />
    </Page>
  );
};

export default DanhSachCacheDonHangPage;
