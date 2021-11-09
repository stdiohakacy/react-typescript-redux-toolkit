// import { Box, Grid } from '@material-ui/core';
import { Button, MenuItem, Select } from '@material-ui/core';
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

export default function StudentFilters({ filter, cityList, onChange, onSearchChange }: StudentFilterProps) {
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!onSearchChange) return;

        const newFilter: ListParams = {
            ...filter,
            name_like: e.target.value,
            _page: 1,
        };
        onSearchChange(newFilter);
    };

    const handleCityChange = (e: ChangeEvent<{name?: string; value: unknown}>) => {
        if(!onChange) return;
        const newFilter: ListParams = {
            ...filter,
            _page: 1,
            city: e.target.value || undefined
        }
        onChange(newFilter)
    };

    return (
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel htmlFor="searchByName">Search by name</InputLabel>
              <OutlinedInput
                id="searchByName"
                label="Search by name"
                endAdornment={<Search />}
                defaultValue={filter.name_like}
                onChange={handleSearchChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel id="filterByCity">Filter by city</InputLabel>
              <Select
                labelId="filterByCity"
                value={filter.city || ''}
                onChange={handleCityChange}
                label="Filter by city"
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>

                {cityList.map((city) => (
                  <MenuItem key={city.code} value={city.code}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} lg={1}>
            <Button variant="outlined" color="primary" fullWidth >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Box>
    )
}