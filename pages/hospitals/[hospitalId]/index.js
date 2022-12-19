import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { fetchReviewList } from '../../../store/review-list-actions';

const HospitalDetail = (props) => {
    const dispatch = useDispatch();
    const reviewList = useSelector(state => state.reviewList.reviewList);

    useEffect(() => {
        dispatch(fetchReviewList(props));
    }, [dispatch])

    return (
        <Fragment>
            {reviewList && reviewList.map((review) => (
                <div key={review.id}>
                    <Link href={`/reviews/${review.id}`}>{review.contents}</Link>
                </div>
            ))}
        </Fragment>

    )
}

export const getServerSideProps = async (context) => {
    const hospitalId = context.params.hospitalId;

    return {
        props: {
            hospitalId: hospitalId
        }
    }
}

export default HospitalDetail;