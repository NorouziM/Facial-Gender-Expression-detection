import PropTypes from 'prop-types';
// form
import { useFormContext, Controller, FormProvider, useForm } from 'react-hook-form';
// @mui
import { FormHelperText } from '@mui/material';
//
import { UploadAvatar, UploadSingleFile, UploadMultiFile } from '../upload';

// ----------------------------------------------------------------------

RHFUploadSingleFile.propTypes = {
  name: PropTypes.string,
};

export function RHFUploadSingleFile({ name, setFile, ...other }) {
  const { control } = useForm({});

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;

        return (
          <UploadSingleFile
            accept="image/*"
            file={field.value}
            error={checkError}
            setFile={setFile}
            helperText={
              checkError && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error.message}
                </FormHelperText>
              )
            }
            {...other}
          />
        );
      }}
    />
  );
}
