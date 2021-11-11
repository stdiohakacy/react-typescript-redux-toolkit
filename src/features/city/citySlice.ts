import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { City, ListResponse } from "models";

export interface CityState {
    loading: boolean;
    list: City[]
}

const initialState: CityState = {
    loading: false,
    list: []
}

const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        fetchCityList(state) {
            state.loading = true;
        },
        fetchCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
            state.loading = false;
            state.list = action.payload.data
        },
        fetchCityListFailed(state) {
            state.loading = false;
        }
    }
})

// Actions
export const cityActions = citySlice.actions

// Selectors
export const selectCityList = (state: RootState) => state.city.list

export const selectCityMap = createSelector(selectCityList, 
    (cityList) => {
        const citiesMapResponse = cityList.reduce((map: { [key: string]: City }, city) => {
            map[city.code] = city;
            return map;
        }, {})
        return citiesMapResponse;
    }
)

export const selectCityOptions = createSelector(selectCityList, (cityList) => 
    cityList.map(city => ({
        label: city.name,
        value: city.code
    }))
)

// Reducers
const cityReducer = citySlice.reducer;
export default cityReducer;