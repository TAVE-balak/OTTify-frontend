import React, { useEffect, useState } from "react";
import WriteReview from "./WriteReview";
import ReviewList from "./ReviewList";
import "./DetailReview.css";
import img1 from "./사진.jpg";
import Toggle from "./Toggle";
import ReviewItem from "./ReviewItem";
import axios from "../../api/axios";

const MyWrite = ({ programId }) => {
  const [myReviews, setMyReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [editReview, setEditReview] = useState(null); // 수정 중인 리뷰 정보를 담는 상태

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(
          `/api/v1/reviews/${programId}/normal/count/4`
        );
        const data = response.data.data;
        console.log(3, data);
        setAllReviews(data.reviewProgramResponseDtoList);
      } catch (error) {
        console.error("Fetching review failed", error);
      }
    };

    fetchReview();
  });

  const handleWriteReviewSubmit = (reviewData) => {
    const newReview = {
      id: myReviews.length > 0 ? myReviews[myReviews.length - 1].id + 1 : 1,
      author: " ", // 유저 이름
      profileimg: img1, // 프로필 이미지
      movie: "Your Movie", // 영화 이름
      tag: reviewData.selectedTags, // 선택된 태그들
      content: reviewData.reviewContent, // 리뷰 내용
      evaluation: reviewData.starRating, // 별점 평가
      created_date: new Date().toLocaleDateString(), // 생성된 날짜 (오늘 날짜로 설정)
      favorite: 0, // 좋아요 수 (기본값 0)
    };

    setMyReviews([...myReviews, newReview]);
  };

  const handleDeleteReview = (id) => {
    const updatedReviews = myReviews.filter((review) => review.id !== id);
    setMyReviews(updatedReviews);
  };

  const handleEditReview = (id, editedReview) => {
    const updatedReviews = myReviews.map((review) =>
      review.id === id ? { ...review, ...editedReview } : review
    );

    setMyReviews(updatedReviews);
    setEditReview(null); // 수정이 완료되면 editReview 상태를 초기화합니다.
  };

  const handleEditClick = (id) => {
    const reviewToEdit = myReviews.find((review) => review.id === id);
    setEditReview(reviewToEdit);
  };

  const [showFanReviews, setShowFanReviews] = useState(false);

  const handleToggleFanReviews = () => {
    // 매니아 리뷰 표시 여부를 토글하는 함수
    setShowFanReviews(!showFanReviews);
  };

  return (
    <div className="MyWrite">
      <div className="mywrite_page">
        {/* <div className="mywrite_title"></div>
        <WriteReview handleWriteReviewSubmit={handleWriteReviewSubmit} />
        {myReviews.map((review) => (
          <div key={review.id} className="my-review">
            <ReviewItem
              author={review.author}
              profileimg={review.profileimg}
              movie={review.movie}
              tag={review.tag}
              content={editReview && editReview.id === review.id ? (
                <div>
                  <input
                    type="text"
                    value={editReview.content}
                    onChange={(e) =>
                      setEditReview({ ...editReview, content: e.target.value })
                    }
                  />
                  <button onClick={() => handleEditReview(editReview.id, editReview)}>
                    저장
                  </button>
                </div>
              ) : (
                review.content
              )}
              created_date={review.created_date}
              evaluation={review.evaluation}
              favorite={review.favorite}
              id={review.id}
            />
            <div className="review-buttons">
              <button onClick={() => handleDeleteReview(review.id)}>삭제</button>
              <button onClick={() => handleEditClick(review.id)}>수정</button>
            </div>
          </div>
        ))} */}
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
      </div>
    </div>
  );
};

export default MyWrite;
