import {useState} from 'react';
import {ControllerProps, UseFormReturn} from 'react-hook-form';
import {useQuery} from 'react-query';
import {thuongHieuService} from 'src/services';
import AutocompleteAsyncField from '../../autocomplete-async-field';

interface Props {
  form: UseFormReturn<any>;
  rules?: ControllerProps['rules'];
  required?: boolean;
  valueTypeSelectObject?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  onChange?: any;
  name: string;
}
const ThuongHieuField = ({
  form,
  disabled = undefined,
  onChange,
  required = false,
  multiple = false,
  rules,
  valueTypeSelectObject = false,
  name,
}: Props) => {
  const [search, setSearch] = useState('');
  const {data, isFetching} = useQuery(['listThuongHieu', search], () =>
    thuongHieuService.getAll({
      pageNumber: 1,
      pageSize: 100,
      search,
    })
  );
  return (
    <AutocompleteAsyncField
      multiple={multiple}
      disabled={disabled}
      required={required}
      form={form}
      name={name}
      label="Thương hiệu"
      onChange={onChange}
      loading={isFetching}
      items={data?.data?.map(item => ({label: item?.ten, value: item?.id})) || []}
      onSubmit={setSearch}
      rules={{required: {value: required, message: 'Vui lòng chọn thương hiệu'}, ...rules}}
    />
  );
};

export default ThuongHieuField;
