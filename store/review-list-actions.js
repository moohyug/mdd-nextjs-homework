import { reviewListActions } from './review-list-slice';

const ACCESS_TOKEN = 'WOttAMeBZi2yR3XImaEzIOCqrDBD9k';

export const fetchReviewList = (props) => {
    return async (dispatch) => {
        const fetchReviewListData = async () => {
            const response = await fetch(`https://recruit.modoodoc.com/hospitals/${props.hospitalId}/reviews/?search_query=${props.searchQuery}&page=${props.page}&size=5`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Bearer ${ACCESS_TOKEN}`
                    }
                });
        
                if (!response.ok) {
                    console.log('not ok');
                }
        
                const data = await response.json();
                return data;
        }

        try {
            const reviewListData = await fetchReviewListData();
            const newReviewList = reviewListData.reviews;

            console.log(reviewListData);

            dispatch(reviewListActions.replaceReviewList({
                reviewList: newReviewList,
                page: props.page + 1,
                searchQuery: props.searchQuery,
            }));
        } catch (error) {
            console.log(error);
        }
    }

}