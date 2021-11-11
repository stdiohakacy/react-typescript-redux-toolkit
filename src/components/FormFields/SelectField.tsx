import { InputLabel, MenuItem, Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import React from 'react';
import { Control, useController } from 'react-hook-form';

export interface SelectOptions {
    label?: string;
    value: number | string;
}

export interface SelectFieldProps {
    name: string;
    control: Control<any>,
    label?: string;
    disabled?: boolean;
    options: SelectOptions[];
}

export function SelectField ({name, control, label, disabled, options }: SelectFieldProps) {
    const { 
        field: { value, onChange, onBlur }, 
        fieldState: { invalid, error } 
    } = useController({ name, control })
    return (
        <FormControl 
            fullWidth
            variant="outlined" 
            size="small" 
            margin="normal"
            disabled={disabled}
            error={invalid}
        >
            <InputLabel id={`${name}_label`}>{label}</InputLabel>
            <Select
              labelId={`${name}_label`}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              label="Sort"
            >
              {options.map(option => (
                  <MenuItem key={option.value} value={option.value} >{option.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
    );
}
