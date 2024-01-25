import React, { useState } from "react";
import "./MyCollect.css";
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

  return (
    <div className="ReviewItem">
      <div className="reviewInfo">
        <div className="writerInfo">
          <img
            src={userPosterPath}
            className="writer_profile"
            alt="프로필 이미지"
          ></img>
          <span className="writer">{userNickName}님의 평가</span>
        </div>
        <span className="writeDate">{localDateTime}</span>
      </div>

      <div className="reviewMain">
        {/* <span className="reviewName">{review.}</span> */}
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
        <button onClick={handleLike}>
          <img src={thumb} className="reviewthumb" alt="좋아요"></img>
        </button>
        <span className="thumbNum">{likes}</span>
      </div>
    </div>
  );
};

export default ReviewItem;
