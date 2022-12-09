import {TextField} from '@mui/material';
import debounce from 'lodash/debounce';
import {FC, useCallback} from 'react';
import {Controller} from 'react-hook-form';

interface Props {
  name: string;
  label?: string;
  form: any;
  type?: any;
  [x: string]: any;
  rules?: any;
}

const InputField: FC<Props> = ({name, rules, label, form, type, ...rest}) => {
  const {
    control,
    formState: {errors},
  } = form;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({field}) => (
        <TextField
          InputLabelProps={{shrink: true}}
          variant="standard"
          {...field}
          {...rest}
          id={name}
          label={label}
          margin="none"
          type={type}
          fullWidth
          error={!!errors[name]}
          helperText={errors[name]?.message}
        />
      )}
    />
  );
};

export default InputField;
