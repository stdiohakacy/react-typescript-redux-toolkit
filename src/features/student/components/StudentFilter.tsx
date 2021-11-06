// import { Box, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Search } from '@material-ui/icons';
import { City, ListParams } from 'models';
import React, { ChangeEvent } from 'react'


export interface StudentFilterProps {
    filter: ListParams;
    cityList: City[];
    
    onChange?: (newFilter: ListParams) => void;
    onSearchChange?: (newFilter: ListParams) => void;
}

export default function StudentFilters({filter, cityList, onChange, onSearchChange}: StudentFilterProps) {
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!onSearchChange) return;

        const newFilter: ListParams = {
            ...filter,
            name_like: e.target.value,
            _page: 1,
        };
        onSearchChange(newFilter);
    };

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="searchByName">Search by name</InputLabel>
                    <OutlinedInput
                        id="searchByName"
                        endAdornment={<Search />}
                        label="Search by name"
                        defaultValue={filter.name_like}
                        onChange={handleSearchChange}
                    />
                </FormControl>
                </Grid>
            </Grid>
        </Box>
    )
}