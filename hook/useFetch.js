import { useState, useEffect, useCallback } from 'react';

const ACCESS_TOKEN = 'WOttAMeBZi2yR3XImaEzIOCqrDBD9k';

export const useFetchReviewList = (hospitalId, searchQuery, page, initReviewList) => {
    console.log('useFetchReviewList!');
    const [reviewList, setReviewList] = useState(initReviewList);

    const sendQuery = useCallback(async () => {
        const fetchReviewListData = async () => {
            const response = await fetch(`https://recruit.modoodoc.com/hospitals/${hospitalId}/reviews/?search_query=${searchQuery}&page=${page}&size=5`, {
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
            console.log(newReviewList);
            let existing = false;
            if (newReviewList && typeof newReviewList[0] !== 'undefined'){
                existing = reviewList.find(item => item.id === newReviewList[0].id);
            }

            if (page === 1 && !searchQuery) {
                console.log('case1')
            } else if (page === 1 && searchQuery) {
                console.log('case2')
                setReviewList(newReviewList);
            } else if (!existing) {
                console.log('case3')
                setReviewList((prev) => [...prev, ...newReviewList]);
            }
            
        } catch (error) {
            console.log(error);
        }
    }, [searchQuery, page])

    useEffect(() => {
        sendQuery();
    }, [searchQuery, page, sendQuery]);

    return { reviewList }
}