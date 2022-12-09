import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  styled,
} from '@mui/material';
import {Trash} from 'iconsax-react';
import React, {FC} from 'react';
import readXlsxFile from 'read-excel-file';
import {DataTable} from '../../../../components/base';
import {state, stateColor} from '../../../../utils/state';

interface Props {
  open: boolean;
  onClose: () => void;
  list: any[];
  setList: React.Dispatch<React.SetStateAction<any>>;
}

const DialogPreview: FC<Props> = ({open = false, onClose, list = [], setList}) => {
  let duplicates = list.map(i => i.transactionId).filter((e, i, a) => a.indexOf(e) !== i);

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
    {
      field: 'created',
      headerName: 'Ngày giao dịch',
    },
    {
      field: '',
      headerName: 'Thao tác',
      renderCell: (row: any) => (
        <Stack>
          <IconButton
            color="error"
            onClick={() => {
              const newList = [...list];
              const index = newList.findIndex(item => item?.transactionId === row?.transactionId);
              newList.splice(index, 1);
              setList(newList);
            }}
          >
            <Trash />
          </IconButton>
        </Stack>
      ),
    },

    // {
    //   field: 'expiryDate',
    //   headerName: 'Ngày hết hạn',
    //   renderCell: (row: any) => new Date(row.expiryDate).toLocaleDateString('vi'),
    // },
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

  return (
    <Dialog keepMounted open={open} onClose={onClose} fullWidth maxWidth="md" scroll="body">
      <DialogTitle sx={{fontSize: 16}}>Xem nội dung Excel</DialogTitle>
      <Divider />
      <DialogContent>
        <DataTable
          listIndexDuplicates={duplicates}
          columns={columns}
          rows={list}
          loading={false}
          pagination={{
            show: false,
            page: 0,
            totalCount: list.length,
            rowsPerPage: list.length,
          }}
        />
      </DialogContent>
      <DialogActions>
        <label htmlFor="upload2">
          <Input
            onChange={e => {
              e.target?.files?.[0] &&
                readXlsxFile(e.target.files[0], {
                  map: columns
                    .filter((item, index) => index !== columns.length - 1)
                    .reduce((a, v) => ({...a, [v.headerName]: v.field}), {}),
                }).then(({rows}: any) => {
                  setList(rows);
                });
              e.target.value = '';
            }}
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            id="upload2"
            type="file"
          />
          <Button component="span" variant="contained">
            Tải file Excel mới
          </Button>
        </label>
      </DialogActions>
    </Dialog>
  );
};

const Input = styled('input')({
  display: 'none',
});

export default DialogPreview;
