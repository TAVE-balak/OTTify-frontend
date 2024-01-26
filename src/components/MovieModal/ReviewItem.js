import React, { useState } from "react";
import "./DetailReview.css";
import star from "./star1.png";
import thumb from "./thumb_up.png";

const ReviewItem = ({
  id,
  contents,
  like,
  localDateTime,
  ratings,
  reviewId,
  reviewTagNames,
  userNickName,
  userPosterPath,
}) => {
  const [likes, setLikes] = useState(like); // 좋아요 개수를 상태로 관리
  const handleLike = () => {
    setLikes(likes + 1); // 좋아요 개수를 1 증가시킴
    // TODO: 서버에 좋아요 개수 업데이트 요청 등의 로직 추가 가능
  };

  const targetDate = new Date(localDateTime);
  const currentDate = new Date();
  const timeDiff = currentDate - targetDate;
  // 밀리초를 일로 변환
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  let displayDate;
  if (daysDiff < 30) {
    displayDate = `${daysDiff}일 전`;
  } else if (daysDiff < 365) {
    const monthsDiff = Math.floor(daysDiff / 30);
    displayDate = `${monthsDiff}달 전`;
  } else {
    const yearsDiff = Math.floor(daysDiff / 365);
    displayDate = `${yearsDiff}년 전`;
  }

  return (
    <div className="ReviewItem" style={{ backgroundColor: "var(--neutral2)" }}>
      <div className="reviewInfo">
        <div className="writerInfo">
          <img
            src={userPosterPath}
            className="writer_profile"
            alt="프로필 이미지"
          ></img>
          <span className="writer">{userNickName}님의 평가</span>
        </div>
        <span className="writeDate">{displayDate}</span>
      </div>

      <div className="reviewMain">
        <div className="reviewPick">
          <img src={star} className="star" alt="별점"></img>
          <span className="reviewNum">{ratings}</span>
          <div className="tags">
            {reviewTagNames.map((tag, index) => (
              <span key={index} className={`tag_${index + 1}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="reviewContent">{contents}</div>
        <div className="reviewFavorite">
          <button onClick={handleLike}>
            <img src={thumb} className="reviewthumb" alt="좋아요"></img>
          </button>
          <span className="thumbNum">{likes}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
