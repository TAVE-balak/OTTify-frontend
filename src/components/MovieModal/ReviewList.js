import React from "react";
import ReviewItem from "./ReviewItem";

const ReviewList = ({ reviewList }) => {
  return (
    <div className="ReviewList">
      <div>
        {reviewList.map(
          (
            it //각각의 요소
          ) => (
            <ReviewItem key={it.id} {...it} /> //별도의 component인 ReviewItem 이용
          )
        )}
      </div>
    </div>
  );
};

ReviewList.defaultProps = {
  //undefined로 전달받을 수 있는 것의 기본값 설정
  reviewList: [],
};

export default ReviewList;
