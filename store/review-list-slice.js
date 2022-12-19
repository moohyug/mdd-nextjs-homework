import { createSlice } from '@reduxjs/toolkit';

const reviewListSlice = createSlice({
    name: 'reviewList',
    initialState: {
        reviewList: [],
        changed: false
    },
    reducers: {
        replaceReviewList(state, action) {
            state.reviewList = action.payload.reviews;
        }
    }
})
export const reviewListActions = reviewListSlice.actions;
export default reviewListSlice;