const ReviewDetail = (props) => {
    return (
        <div>리뷰 상세 페이지 !</div>
    )
}

export const getStaticPaths = async () => {
    return {
        fallback: 'blocking',
        paths: [{params: {reviewId: '1'}}, {params: {reviewId: '2'}}] // dummy data 우선 채움. 
    }
}

export const getStaticProps = async (context) => {
    const reviewId = context.params.reviewId;
    console.log(reviewId);
    return {
        props: {
            reviewData: {
                
            }
        }
    }
}

export default ReviewDetail;