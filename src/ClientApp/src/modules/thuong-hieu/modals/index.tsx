import {Checkbox} from '@mui/material';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {DataTable, DialogBase, SearchBar} from 'src/components/base';
import {PaginationParams, Product, QueryParams} from 'src/models';
import {productService} from 'src/services';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  listChosenProduct: Product[];
  handleChecked: (check: boolean, row: Product) => void;
}

export default function Modal({onClose, open, handleChecked, listChosenProduct}: ModalProps) {
  const [listProduct, setListProduct] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<QueryParams>({
    search: '',
    pageNumber: 1,
    pageSize: 10,
  });
  const [pagination, setPagination] = useState<PaginationParams>({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalCount: 0,
    hasPrevious: false,
    hasNext: false,
  });
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const res = await productService.getAll(filters);
      if (res) {
        const {currentPage, pageSize, totalCount, totalPages, hasNext, hasPrevious} = res;

        setListProduct(res.data);
        setPagination({currentPage, pageSize, totalCount, totalPages, hasNext, hasPrevious});
      }
      setIsLoading(false);
    };
    getData();
  }, [filters]);

  const columns = [
    {
      field: 'Check',
      headerName: 'Select',
      renderCell: (row: Product) => (
        <Checkbox
          checked={listChosenProduct.map(item => item.id).includes(row.id)}
          onChange={(e, checked) => handleChecked(checked, row)}
        />
        // <img src={row.image} width={50} height={50} alt={row.name} style={{objectFit: 'contain'}} />
      ),
    },
    {
      field: 'id',
      headerName: 'Id sản phẩm',
    },
    {
      field: 'productCode',
      headerName: 'Mã sản phẩm',
    },
    {
      field: 'name',
      headerName: 'Tên sản phẩm',
    },
    {
      field: 'price',
      headerName: 'Giá',
    },
    {
      field: 'point',
      headerName: 'Điểm',
    },
    {
      field: 'partner',
      headerName: 'Đối tác',
    },
    {
      field: 'brandName',
      headerName: 'Thương hiệu',
    },
  ];

  return (
    <DialogBase
      open={open}
      title="Chọn sản phẩm cho chiến dịch"
      onClose={onClose}
      textPositive="OK"
      hasSubmitButton={true}
      onSubmit={() => {
        onClose();
      }}
    >
      <SearchBar onSubmit={value => setFilters(prev => ({...prev, search: value}))} />
      <DataTable
        columns={columns}
        rows={listProduct}
        loading={isLoading}
        // height={height - 200}
        // onRowClick={
        //   checkQuyen('edit')
        //     ? (row: Campaign) => {
        //         navigate(`/banner/quan-ly/sua-banner/${row.id}`);
        //       }
        //     : undefined
        // }
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
    </DialogBase>
  );
}
