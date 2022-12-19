const ReviewDetail = (props) => {
    return (
        <div>리뷰 상세 페이지 !</div>
    )
}

export const getServerSideProps = async (context) => {
    const reviewId = context.params.reviewId;

    return {
        props: {
            reviewId: reviewId
        }
    }
}

export default ReviewDetail;