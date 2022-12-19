import { reviewListActions } from './review-list-slice';

const ACCESS_TOKEN = 'WOttAMeBZi2yR3XImaEzIOCqrDBD9k';

export const fetchReviewList = (props) => {
    return async dispatch => {
        const fetchReviewListData = async () => {
            const response = await fetch(`https://recruit.modoodoc.com/hospitals/${props.hospitalId}/reviews/?search_query=&page=1&size=5`, {
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
            dispatch(reviewListActions.replaceReviewList(reviewListData));
        } catch (error) {
            console.log(error);
        }
    }

}