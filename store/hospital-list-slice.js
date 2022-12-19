import { createSlice } from '@reduxjs/toolkit';

const hospitalListSlice = createSlice({
    name: 'hospitalList',
    initialState: {
        hospitalList: [],
        changed: false,
    },
    reducers: {
        replaceHospitalList(state, action) {
            state.hospitalList = action.payload.hospitals;
        }
    }
})
export const hospitalListActions = hospitalListSlice.actions;
export default hospitalListSlice;