import { configureStore } from '@reduxjs/toolkit';

import hospitalListSlice from './hospital-list-slice';
import reviewListSlice from './review-list-slice';

const store = configureStore({
    reducer: {
        hospitalList: hospitalListSlice.reducer,
        reviewList: reviewListSlice.reducer,
    }
})
export default store;