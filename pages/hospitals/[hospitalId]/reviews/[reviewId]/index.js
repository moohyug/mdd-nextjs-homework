import { useRouter } from 'next/router'

const ACCESS_TOKEN = 'WOttAMeBZi2yR3XImaEzIOCqrDBD9k';

import { reviewShortDetail } from '../../../../../components/Review/ReviewShortDetail.module.css';

const ReviewDetail = (props) => {
    const router = useRouter();
    const review = props.review;

    return (
        <div className={reviewShortDetail} key={review.id}>
            <button type="button" onClick={() => router.back()}>
                뒤로가기
            </button>
            {review.treatment_prices.map(((tp) => (
                <div><p>{tp.name}</p><p>{tp.price}</p></div>
            )))}
            <br />
            <p>{review.contents}</p>
            <br />
            <div>
                <button>도움됐어요 {review.liked_cnt}</button>
            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const hospitalId = context.params.hospitalId;
    const reviewId = context.params.reviewId;

    const fetchReviewDetailData = async () => {
        const response = await fetch(`https://recruit.modoodoc.com/hospitals/${hospitalId}/reviews/${reviewId}/`, {
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

    let review = null;

    try {
        const reviewData = await fetchReviewDetailData();
        review = reviewData.review;
    } catch (error) {
        console.log(error);
    }

    return {
        props: {
            reviewId: reviewId,
            review: review
        }
    }
}

export default ReviewDetail;