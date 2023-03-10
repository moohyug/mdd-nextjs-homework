import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useFetchReviewList } from '../../../hook/useFetch';
import Link from 'next/link';
import { useRouter } from 'next/router'

import { reviewShortDetail } from '../../../components/Review/ReviewShortDetail.module.css';

const ACCESS_TOKEN = 'WOttAMeBZi2yR3XImaEzIOCqrDBD9k';

const HospitalDetail = (props) => {
    const router = useRouter();
        
    const hospitalId = props.hospitalId;
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const { reviewList } = useFetchReviewList(hospitalId, searchQuery, page, props.reviewList);

    const loader = useRef(null);

    // 2. 치료항목 클릭할 때
    const clickTcButtonHandler = (event) => {
        event.preventDefault();
        console.log(event.target.value);

        setSearchQuery(event.target.value);
        setPage(1);
    }

    // 3. 검색어 기입 후  검색할 때  
    const searchQuerySubmitHandler = (event) => {
        event.preventDefault();
        console.log(event.target);

        setSearchQuery(event.target.query.value);
        setPage(1);
    }
    
    // 4. infinite scroll 
    const loadMoreHandler = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            console.log('intersected!');
            setPage((prev) => prev+1);
        }
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
    }, [loader, loadMoreHandler])

    return (
        <Fragment>
            <button type="button" onClick={() => router.back()}>
                뒤로가기
            </button>
            <form onSubmit={searchQuerySubmitHandler}>
                <label>
                    <input type="text" name="query" />
                </label>
                <input type="submit" value="검색" />
            </form>
            <div>
                <button key='12345' onClick={clickTcButtonHandler} value="사랑니 발치" style={{backgroundColor: 'purple'}}>사랑니 발치</button>
                <button key='12346' onClick={clickTcButtonHandler} value="임플란트" style={{backgroundColor: 'purple'}}>임플란트</button>
                <button key='12347' onClick={clickTcButtonHandler} value="치아교정" style={{backgroundColor: 'purple'}}>치아교정</button>
            </div>
            {reviewList && reviewList.map((review) => (
                <div className={reviewShortDetail} key={review.id}>
                    <Link href={`/hospitals/${hospitalId}/reviews/${review.id}`}>
                        {review.treatment_prices.map(((tp) => (
                            <div><p>{tp.name}</p><p>{tp.price}</p></div>
                        )))}
                        <br />
                        <p>{review.contents}</p>
                    </Link>
                    <br />
                    <div>
                        <button>도움됐어요 {review.liked_cnt}</button>
                    </div>
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