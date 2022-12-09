import {DateTimePicker, LocalizationProvider} from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import {TextField} from '@mui/material';
import {FC} from 'react';
import {Controller, ControllerProps, UseFormReturn} from 'react-hook-form';

interface Props {
  label: string;
  name: string;
  form: UseFormReturn<any>;
  rules?: ControllerProps['rules'];
}

const DateTimePickerField: FC<Props> = props => {
  const {label, name, rules, form, ...rest} = props;
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
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DateTimePicker
            {...field}
            {...rest}
            value={field.value || null}
            onChange={field.onChange}
            label={
              rules?.required ? (
                <div className="flex flex-row">
                  {label} <div className="text-error">&nbsp;*</div>
                </div>
              ) : (
                label
              )
            }
            inputFormat={'HH:MM - DD/MM/YYYY'}
            renderInput={params => (
              <TextField
                className="style-icon"
                {...params}
                variant="standard"
                margin="none"
                fullWidth
                error={!!errors[name]}
                helperText={errors[name]?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default DateTimePickerField;
