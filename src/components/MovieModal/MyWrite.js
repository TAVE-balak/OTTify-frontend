import React, { useEffect, useState } from "react";
import WriteReview from "./WriteReview";
import ReviewList from "./ReviewList";
import "./DetailReview.css";
import img1 from "./사진.jpg";

import ReviewItem from "./ReviewItem";
import axios from "../../api/axios";

const MyWrite = ({ programId }) => {
  const [myReviews, setMyReviews] = useState([]); // 사용자가 작성한 리뷰들을 담는 상태
  const [editReview, setEditReview] = useState(null); // 수정 중인 리뷰 정보를 담는 상태

  useEffect(() => {
    // useEffect 내에서 API 호출 등으로 리뷰 데이터를 가져오는 비동기 함수를 호출할 수 있음
    // 현재는 주석 처리되어 있으며, 필요에 따라 활용할 수 있습니다.
    const fetchReview = async () => {
      try {
        const response = await axios.get(
          `/api/v1/reviews/${programId}/normal/count/4`
        );
        const data = response.data.data;
        setMyReviews(data.reviewProgramResponseDtoList);
      } catch (error) {
        console.error("Fetching review failed", error);
      }
    };
    fetchReview();
  }, [programId]); // useEffect의 의존성 배열에 programId를 추가하여 해당 값이 변경될 때만 호출

  // 새로운 리뷰를 추가하는 함수
  const handleWriteReviewSubmit = (reviewData) => {
    const newReview = {
      id: myReviews.length > 0 ? myReviews[myReviews.length - 1].id + 1 : 1, // 고유한 ID 생성
      author: " ", // 유저 이름
      profileimg: img1, // 프로필 이미지
      movie: "Your Movie", // 영화 이름
      tag: reviewData.selectedTags, // 선택된 태그들
      content: reviewData.reviewContent, // 리뷰 내용
      evaluation: reviewData.starRating, // 별점 평가
      created_date: new Date().toLocaleDateString(), // 생성된 날짜 (오늘 날짜로 설정)
      favorite: 0, // 좋아요 수 (기본값 0)
    };

    setMyReviews([...myReviews, newReview]); // 이전 리뷰 배열에 새로운 리뷰 추가
  };

  // 리뷰를 삭제하는 함수
const handleDeleteReview = async (id) => {
  try {
    await axios.delete(`http://52.79.200.90:8080/api/v1/review/${id}`);
    const updatedReviews = myReviews.filter((review) => review.id !== id);
    setMyReviews(updatedReviews); // 삭제된 리뷰를 제외한 나머지 리뷰로 상태 업데이트
  } catch (error) {
    console.error("Deleting review failed", error);
  }
};

  // 리뷰를 수정하기 위해 편집 상태로 변경하는 함수
  const handleEditClick = (id) => {
    const reviewToEdit = myReviews.find((review) => review.id === id);
    setEditReview(reviewToEdit); // 수정 중인 리뷰 정보를 상태에 설정
  };

 // 수정 중인 리뷰를 저장하고 편집 상태를 종료하는 함수
const handleEditReview = async (id, editedReview) => {
  try {
    // API 요청을 통해 리뷰 수정
    await axios.put(`http://52.79.200.90:8080/api/v1/review/${id}`, {
      // 수정할 리뷰 데이터
      contents: editedReview.content,
      rating: editedReview.evaluation, // 별점 등 필요한 데이터를 여기에 포함시킵니다.
      // 서버가 요구하는 형식에 맞게 다른 필드도 추가할 수 있습니다.
    });

    const updatedReviews = myReviews.map((review) =>
      review.id === id ? { ...review, ...editedReview } : review
    );
    setMyReviews(updatedReviews); // 수정된 리뷰 정보로 상태 업데이트
    setEditReview(null); // 수정이 완료되면 editReview 상태를 초기화합니다.
  } catch (error) {
    console.error("Editing review failed", error);
  }
};


  return (
    <div className="MyWrite">
      <div className="mywrite_page">
        <div className="mywrite_title"></div>
        {/* 리뷰 작성 컴포넌트 */}
        <WriteReview handleWriteReviewSubmit={handleWriteReviewSubmit} />
        
        {/* 이전에 작성한 리뷰 리스트 */}
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
        ))}
      </div>
    </div>
  );
};

export default MyWrite;
