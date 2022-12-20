import { Fragment, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { fetchReviewList } from '../../../store/review-list-actions';
import { reviewListActions } from '../../../store/review-list-slice';

import { reviewShortDetail } from '../../../components/Review/ReviewShortDetail.module.css';

const ACCESS_TOKEN = 'WOttAMeBZi2yR3XImaEzIOCqrDBD9k';

let isInitial = true;

const HospitalDetail = (props) => {
    const hospitalId = props.hospitalId;

    const dispatch = useDispatch();
    // reviewListSlice 정보 초기화
    const initializeReviewListHandler = useCallback(() => {
        console.log('init');
        dispatch(reviewListActions.initializeReviewList({
            reviewList: props.reviewList
        }))
    }, []);

    const reviewList = useSelector(state => state.reviewList.reviewList);
    const searchQuery = useSelector(state => state.reviewList.searchQuery);
    const page = useSelector(state => state.reviewList.page);
    const loader = useRef(null);

    // 2. 치료항목 클릭할 때
    const clickTcButtonHandler = () => {

    }

    // 3. 검색어 기입 후  검색할 때  
    const searchQueryEnterHandler = () => {

    }
    
    // 4. infinite scroll 
    const loadMoreHandler = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            console.log('intersected!');
            dispatch(reviewListActions.incrementPage())
            // // 리뷰 리스트 추가 로딩
            // dispatch(fetchReviewList({
            //     hospitalId: hospitalId,
            //     searchQuery: searchQuery,
            //     page: page,
            // }))
        }
    }, [])

    useEffect(() => {
        initializeReviewListHandler();
    }, [])

    useEffect(() => {

        const option = {
            root: null,
            rootMargin: '20px',
            threshold: 0
        };
        const observer = new IntersectionObserver(loadMoreHandler, option);
        if (loader.current) {
            observer.observe(loader.current);
        };
        // clean up 함수
        return () => {
            observer.disconnect();
        }
    }, [loader, initializeReviewListHandler, loadMoreHandler])

    useEffect(() => {
        if (isInitial){
            isInitial = false;
            return;
        }
        console.log('page3');
        console.log(page);
        console.log(searchQuery);
    }, [searchQuery, page])

    return (
        <Fragment>
            {reviewList && reviewList.map((review) => (
                <div className={reviewShortDetail} key={review.id}>
                    <Link href={`/reviews/${review.id}`}>{review.contents}</Link>
                </div>
            ))}
            <div ref={loader} />
        </Fragment>

    )
}

export const getServerSideProps = async (context) => {
    const hospitalId = context.params.hospitalId;

    // 1. 페이지 처음 로딩할때
    const fetchReviewListData = async () => {
        const response = await fetch(`https://recruit.modoodoc.com/hospitals/${hospitalId}/reviews/?search_query=&page=1&size=5`, {
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

    let newReviewList = []

    try {
        const reviewListData = await fetchReviewListData();
        newReviewList = reviewListData.reviews;
    } catch (error) {
        console.log(error);
    }

    return {
        props: {
            hospitalId: hospitalId,
            reviewList: newReviewList
        }
    }
}

export default HospitalDetail;