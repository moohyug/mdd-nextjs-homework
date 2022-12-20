import { configureStore } from '@reduxjs/toolkit';

import hospitalListSlice from './hospital-list-slice';

const store = configureStore({
    reducer: {
        hospitalList: hospitalListSlice.reducer,
    }
})
export default store;