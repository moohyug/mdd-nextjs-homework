import { useEffect, useCallback } from 'react';

const ACCESS_TOKEN = 'WOttAMeBZi2yR3XImaEzIOCqrDBD9k';

const HospitalDetail = (props) => {

    const fetchReviewList = async () => {
        const fetchReviewListData = async () => {
            const response = await fetch(`https://recruit.modoodoc.com/hospitals/${props.hospitalId}/reviews/?search_query=&page=1&size=5`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': `Bearer ${ACCESS_TOKEN}`
                }
              });
        
              if (!response.ok) {
        
              }
        
              const data = await response.json();
        
              return data;
        }

        try {
            const reviewListData = await fetchReviewListData();
            console.log("reviewListData!")
            console.log(reviewListData);
        } catch (error) {
    
        }
    }

    useEffect(() => {
        fetchReviewList();
    }, [fetchReviewList])

    return (
        <div>병원 리스트 페이지!</div>
    )
}

export const getStaticPaths = async () => {
    return {
        fallback: 'blocking',
        paths: [{params: {hospitalId: '1'}}, {params: {hospitalId: '2'}}] // dummy data 우선 채움. 
    }
}

export const getStaticProps = async (context) => {
    const hospitalId = context.params.hospitalId;
    console.log(hospitalId);

    return {
        props: {
            hospitalId: hospitalId
        }
    }
}
export default HospitalDetail;