import React, { useState } from 'react';
import WriteReview from './WriteReview';
import ReviewList from './ReviewList';
import './MyCollect.css';
import img1 from './사진.jpg';


const MyWrite = () => {
  // 기존의 dummyList를 myReviews 상태 변수로 변환합니다.
  const [myReviews, setMyReviews] = useState([
    {
      id: 1,
      profileimg: {img1},
      movie: "나폴레옹",
      tag: ["시간 가는 줄 몰랐어요", "심장질환자 관람유의"],
      content: "봉준호 영화 중에서 가장 음침하고 불편한 영화인 것 같다. 봉준호 영화 중에서 가장 음침하고 불편한 영화인 것 같다.봉준호 영화 중에서 가장 음침하고 불편한 영화인 것 같다.봉준호 영화 중에서 가장 음침하고 불편한 영화인 것 같다.<마더>에 가득 찬 오해들은 풀리지 못 한다. 오해를 오해로 해결하더니 끝내는 엉뚱한 사람이 갇힌다. 이 영화에서 해결된 것은 없다. 잊으려 애를 쓸 뿐이다. 하지만 그것도 불안하기 짝이 없어 보인다. 가나다라마바사 아자차카파타하.",
      evaluation: 3.5,
      created_date: "3달 전",
      favorite: 120,
    }, 
  
    {
      id: 2,
      profileimg: {img1},
      movie: "나폴레옹",
      tag: ["시간 가는 줄 몰랐어요", "심장질환자 관람유의"],
      content: "봉준호 영화 중에서 가장 음침하고 불편한 영화인 것 같다. <마더>에 가득 찬 오해들은 풀리지 못 한다. 오해를 오해로 해결하더니 끝내는 엉뚱한 사람이 갇힌다. 이 영화에서 해결된 것은 없다. 잊으려 애를 쓸 뿐이다. 하지만 그것도 불안하기 짝이 없어 보인다. 가나다라마바사 아자차카파타하.",
      evaluation: 3.5,
      created_date: "3달 전",
      favorite: 120,
    }, 
  
    {
      id: 3,
      
      profileimg: {img1},
      movie: "나폴레옹",
      tag: ["시간 가는 줄 몰랐어요", "심장질환자 관람유의"],
      content: "봉준호 영화 중에서 가장 음침하고 불편한 영화인 것 같다. <마더>에 가득 찬 오해들은 풀리지 못 한다. 오해를 오해로 해결하더니 끝내는 엉뚱한 사람이 갇힌다. 이 영화에서 해결된 것은 없다. 잊으려 애를 쓸 뿐이다. 하지만 그것도 불안하기 짝이 없어 보인다. 가나다라마바사 아자차카파타하.",
      evaluation: 3.5,
      created_date: "3달 전",
      favorite: 120,
    }
  
  ]);

  // 새로운 리뷰가 제출될 때 호출될 함수입니다.
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

    setMyReviews([...myReviews, newReview]); // 새 리뷰를 myReviews 상태에 추가합니다.
  };
  
  return (
    <div className='MyWrite'>
      <div className="mywrite_page">
        <div className="mywrite_title">
        
        </div>
        {/* WriteReview 컴포넌트를 불러와서 리뷰 작성 기능을 제공합니다. */}
        <WriteReview handleWriteReviewSubmit={handleWriteReviewSubmit} />

        {/* myReviews 상태에 저장된 리뷰들을 표시합니다. */}
        {myReviews.map((review) => (
          <div key={review.id} className="my-review">
            {/* 리뷰 내용을 표시하는 구조 */}
            <h3>{review.author}</h3>
            {/* 다른 리뷰 정보들을 표시합니다. */}
          </div>
        ))}

        {/* 전체 리뷰 목록을 표시하는 ReviewList 컴포넌트를 불러옵니다. */}
        <div className="all-reviews">
          <h2>모든 리뷰</h2>
          <ReviewList reviewList={myReviews} />
        </div>
      </div>
    </div>
  );
};

export default MyWrite;
