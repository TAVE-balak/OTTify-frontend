import React, { useEffect, useState } from "react";
import WriteReview from "./WriteReview";
import ReviewList from "./ReviewList";
import "./MyCollect.css";
import img1 from "./사진.jpg";
import ReviewItem from "./ReviewItem";
import axios from "../../api/axios";

const MyWrite = ({ programId }) => {
  // 기존의 dummyList를 myReviews 상태 변수로 변환합니다.
  // const [myReviews, setMyReviews] = useState([
  //   {
  //     id: 1,
  //     profileimg: { img1 },
  //     movie: "나폴레옹",
  //     tag: ["시간 가는 줄 몰랐어요", "심장질환자 관람유의"],
  //     content:
  //       "봉준호 영화 중에서 가장 음침하고 불편한 영화인 것 같다. 봉준호 영화 중에서 가장 음침하고 불편한 영화인 것 같다.봉준호 영화 중에서 가장 음침하고 불편한 영화인 것 같다.봉준호 영화 중에서 가장 음침하고 불편한 영화인 것 같다.<마더>에 가득 찬 오해들은 풀리지 못 한다. 오해를 오해로 해결하더니 끝내는 엉뚱한 사람이 갇힌다. 이 영화에서 해결된 것은 없다. 잊으려 애를 쓸 뿐이다. 하지만 그것도 불안하기 짝이 없어 보인다. 가나다라마바사 아자차카파타하.",
  //     evaluation: 3.5,
  //     created_date: "3달 전",
  //     favorite: 120,
  //   },

  //   {
  //     id: 2,
  //     profileimg: { img1 },
  //     movie: "나폴레옹",
  //     tag: ["시간 가는 줄 몰랐어요", "심장질환자 관람유의"],
  //     content:
  //       "봉준호 영화 중에서 가장 음침하고 불편한 영화인 것 같다. <마더>에 가득 찬 오해들은 풀리지 못 한다. 오해를 오해로 해결하더니 끝내는 엉뚱한 사람이 갇힌다. 이 영화에서 해결된 것은 없다. 잊으려 애를 쓸 뿐이다. 하지만 그것도 불안하기 짝이 없어 보인다. 가나다라마바사 아자차카파타하.",
  //     evaluation: 3.5,
  //     created_date: "3달 전",
  //     favorite: 120,
  //   },

  //   {
  //     id: 3,

  //     profileimg: { img1 },
  //     movie: "나폴레옹",
  //     tag: ["시간 가는 줄 몰랐어요", "심장질환자 관람유의"],
  //     content:
  //       "봉준호 영화 중에서 가장 음침하고 불편한 영화인 것 같다. <마더>에 가득 찬 오해들은 풀리지 못 한다. 오해를 오해로 해결하더니 끝내는 엉뚱한 사람이 갇힌다. 이 영화에서 해결된 것은 없다. 잊으려 애를 쓸 뿐이다. 하지만 그것도 불안하기 짝이 없어 보인다. 가나다라마바사 아자차카파타하.",
  //     evaluation: 3.5,
  //     created_date: "3달 전",
  //     favorite: 120,
  //   },
  // ]);
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
          <h2>모든 리뷰</h2>
          <ReviewList reviewList={allReviews} />
        </div>
      </div>
    </div>
  );
};

export default MyWrite;
