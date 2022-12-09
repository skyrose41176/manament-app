import {Button, Grid} from '@mui/material';
import {useForm} from 'react-hook-form';
import {AutocompleteAsyncField, InputField} from 'src/components/hook-form';
import DatePickerField from 'src/components/hook-form/date-picker-field';
import DateTimePickerField from 'src/components/hook-form/datetime-picker-field';

interface Props {
  onSubmit: (data: FormSearch) => void;
}
interface FormSearch {
  productCode: string;
  name: string;
  price: number;
  point: number;
  type: string;
  partner: string;
  brandName: string;
  transactionId: string;
  CustomerId: string;
  voucherCode: string;
  stateCode: string;
  stateName: string;
  expiryDate: string;
  usedTime: string;
  useBrand: string;
  created: string;
}
const FormSearchComponent = (props: Props) => {
  const {onSubmit} = props;
  const form = useForm<FormSearch>();
  const {handleSubmit} = form;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3} lg={3}>
        <InputField form={form} name="productCode" label="Mã sản phẩm" />
      </Grid>
      <Grid item xs={12} md={3} lg={3}>
        <InputField form={form} name="name" label="Tên sản phẩm" />
      </Grid>

      <Grid item xs={12} md={3} lg={3}>
        <InputField form={form} type="number" name="price" label="Giá sản phẩm" />
      </Grid>

      <Grid item xs={12} md={3} lg={3}>
        <InputField form={form} type="number" name="point" label="Điểm sản phẩm" />
      </Grid>

      <Grid item xs={12} md={3} lg={3}>
        <InputField form={form} name="type" label="Loại sản phẩm" />
      </Grid>

      <Grid item xs={12} md={3} lg={3}>
        <InputField form={form} name="partner" label="Đối tác" />
      </Grid>

      <Grid item xs={12} md={3} lg={3}>
        <InputField form={form} name="brandName" label="Tên thương hiệu" />
      </Grid>

      <Grid item xs={12} md={3} lg={3}>
        <InputField form={form} name="transactionId" label="Mã giao dịch" />
      </Grid>

      <Grid item xs={12} md={3} lg={3}>
        <InputField form={form} name="customerId" label="Mã khách hàng" />
      </Grid>
      <Grid item xs={12} md={3} lg={3}>
        <InputField form={form} name="customerPhone" label="Số điện thoại khách hàng" />
      </Grid>

      <Grid item xs={12} md={3} lg={3}>
        <InputField form={form} name="voucherCode" label="Mã voucher" />
      </Grid>

      <Grid item xs={12} md={3} lg={3}>
        <AutocompleteAsyncField
          loading={false}
          form={form}
          items={[
            {
              value: 1,
              label: 'Chưa sử dụng',
            },
            {
              value: 2,
              label: 'Đã sử dụng',
            },
            {
              value: 3,
              label: 'Hết hạn sử dụng',
            },
            {
              value: 4,
              label: 'Huỷ',
            },
          ]}
          name="stateCode"
          label="Trạng thái"
        />
      </Grid>

      <Grid item xs={12} md={3} lg={3}>
        <DatePickerField form={form} name="expiryDate" label="Ngày hết hạn" />
      </Grid>

      <Grid item xs={12} md={3} lg={3}>
        <DateTimePickerField form={form} name="usedTime" label="Thời gian sử dụng" />
      </Grid>

      <Grid item xs={12} md={3} lg={3}>
        <InputField form={form} name="usedBrand" label="Thương hiệu đã sử dụng" />
      </Grid>

      <Grid item xs={12} md={3} lg={3}>
        <DatePickerField form={form} name="created" label="Ngày giao dịch" />
      </Grid>

      <Grid sx={{display: 'flex', justifyContent: 'flex-end'}} item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
          Tìm kiếm
        </Button>
      </Grid>
    </Grid>
  );
};

export default FormSearchComponent;
