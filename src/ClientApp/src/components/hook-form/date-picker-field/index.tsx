import {DatePicker, DatePickerProps, LocalizationProvider} from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import {TextField} from '@mui/material';
import moment from 'moment';
import React, {FC} from 'react';
import {Controller, ControllerProps, UseFormReturn} from 'react-hook-form';

interface Props extends Omit<DatePickerProps, 'onChange' | 'renderInput' | 'value'> {
  label: string;
  name: string;
  form: UseFormReturn<any>;
  rules?: ControllerProps['rules'];
}

const DatePickerField: FC<Props> = props => {
  const {label, name, rules, form, views, ...rest} = props;
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
        <LocalizationProvider dateAdapter={DateAdapter} locale={moment.locale('en')}>
          <DatePicker
            {...field}
            {...rest}
            onChange={date => {
              field.onChange(date ? new Date(date) : date);
            }}
            openTo="day"
            views={views ?? ['year', 'month', 'day']}
            value={field.value || null}
            label={
              rules?.required ? (
                <div className="flex flex-row">
                  {label} <div className="text-error">&nbsp;*</div>
                </div>
              ) : (
                label
              )
            }
            inputFormat={views?.find(item => item === 'year') ? 'YYYY' : 'DD/MM/YYYY'}
            renderInput={params => (
              <TextField
                className="style-icon"
                {...params}
                variant="standard"
                margin="none"
                placeholder="DD/MM/YYYY"
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

export default DatePickerField;
