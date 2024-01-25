import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import Toggle from "../components/MovieModal/Toggle";
import ReviewList from "../components/MovieModal/ReviewList";
import "../components/MovieModal/DetailReview.css";

const AllReviewList = ({ programId }) => {
  const [allReviews, setAllReviews] = useState([]);
  const [showFanReviews, setShowFanReviews] = useState(false);

  const handleToggleFanReviews = () => {
    // 매니아 리뷰 표시 여부를 토글하는 함수
    setShowFanReviews(!showFanReviews);
  };

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(
          `/api/v1/reviews/${programId}/normal/count/4`
        );
        const data = response.data.data;
        setAllReviews(data.reviewProgramResponseDtoList);
      } catch (error) {
        console.error("Fetching review failed", error);
      }
    };

    fetchReview();
  });

  return (
    <div className="all-reviews">
      <div className="review-header">
        <h2>모든 리뷰</h2>
        {/* 매니아 리뷰 토글 스위치 */}
        <Toggle
          isOn={showFanReviews}
          handleToggle={handleToggleFanReviews}
          text="매니아 리뷰 모아보기"
        />
      </div>
      <ReviewList reviewList={allReviews} />
    </div>
  );
};

export default AllReviewList;
