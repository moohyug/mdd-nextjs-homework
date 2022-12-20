import { createSlice } from '@reduxjs/toolkit';

const reviewListSlice = createSlice({
    name: 'reviewList',
    initialState: {
        reviewList: [],
        page: 1,
        searchQuery: '',
    },
    reducers: {
        initializeReviewList(state, action) {
            state.reviewList = action.payload.reviewList;
        },
        replaceReviewList(state, action) {
            if (!state.reviewList){
                state.reviewList = action.payload.reviewList;
            } else {
                console.log('haha');
                const newReviewList = action.payload.reviewList;
                const firstNewReview = newReviewList[0];
                const existing = state.reviewList.find(item => item.id === firstNewReview.id)
                if (!existing){
                    state.reviewList = [...state.reviewList, ...action.payload.reviewList];
                    state.page = action.payload.page;
                } 
            }
            // state.reviewList = [...state.reviewList, ...action.payload.reviewList];
            
            state.page = action.payload.page;
            state.searchQuery = action.payload.searchQuery;
        },
        incrementPage(state) {
            state.page++
        },
    }
})
export const reviewListActions = reviewListSlice.actions;
export default reviewListSlice;