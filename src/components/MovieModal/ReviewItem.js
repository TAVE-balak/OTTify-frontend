import React, { useState } from "react";
import axios from "axios"; // axios import
import "./DetailReview.css";
import star from "./star1.png";
import thumb from "./thumb_up.png";

const ReviewItem = ({
  id,
  contents,
  like,
  localDateTime,
  ratings,
  reviewTagNames,
  userNickName,
  userPosterPath,
}) => {
  const [likes, setLikes] = useState(like);
  const [content, setContent] = useState(contents); // 컨텐츠 상태 관리

  const handleLike = async () => {
    // 예시 URL 및 메소드, 실제 구현에 맞게 조정해야 함
    try {
      const response = await axios.post(`http://52.79.200.90:8080/api/v1/review/${id}/like`);
      if (response.status === 200) {
        setLikes(likes + 1); // 성공 응답 시에만 좋아요 수 증가
      }
    } catch (error) {
      console.error("좋아요 업데이트 실패:", error);
    }
  };

  // 올바른 삭제 버튼 이벤트 핸들러 코드
  const handleDelete = async (reviewId) => {
    const accessToken =  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwOTk3NjQ3MCwiZW1haWwiOiJtYXR0bmF2ZXJAZ21haWwuY29tIn0.kWUZjTMbqP6YzKsfnkJJvR_Dt0JkgX6-5uixemDDsPszzY1WbispSlo898lFTNnJqoTkzV_IEhm6IWjb0nnAJA"
    if (window.confirm("리뷰를 정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(`http://52.79.200.90:8080/api/v1/review/${reviewId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`, // accessToken 변수에 담긴 값을 사용
          },
        });
        // 삭제 후 UI 처리는 부모 컴포넌트에서 수행해야 함
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  const handleEdit = async () => {
    const newContents = prompt("리뷰 내용을 수정하세요", content);
    const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcwOTk3NjQ3MCwiZW1haWwiOiJtYXR0bmF2ZXJAZ21haWwuY29tIn0.kWUZjTMbqP6YzKsfnkJJvR_Dt0JkgX6-5uixemDDsPszzY1WbispSlo898lFTNnJqoTkzV_IEhm6IWjb0nnAJA"
    if (newContents !== null && newContents !== content) {
      try {
        await axios.put(
          `http://52.79.200.90:8080/api/v1/review/${id}`,
          { contents: newContents },
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`, // accessToken 변수에 담긴 값을 사용
            },
          }
        );
        setContent(newContents); // 상태 업데이트로 UI 반영
      } catch (error) {
        console.error(error);
      }
    }
  };

  // 날짜 처리 로직은 동일하게 유지
  const targetDate = new Date(localDateTime);
  const currentDate = new Date();
  const timeDiff = currentDate - targetDate;
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  let displayDate;
  if (daysDiff < 30) {
      displayDate = `${daysDiff}일 전`;
  } else if (daysDiff < 365) {
      const monthsDiff = Math.floor(daysDiff / 30); // 여기로 이동
      displayDate = `${monthsDiff}달 전`;
  } else {
      const yearsDiff = Math.floor(daysDiff / 365); // 여기로 이동
      displayDate = `${yearsDiff}년 전`;
  }

  return (
    <div className="ReviewItem" style={{ backgroundColor: "var(--neutral2)" }}>
      {/* 기존 UI 코드 유지 */}
      <div className="reviewContent">{content}</div>
      <div className="reviewActions">
        <button onClick={handleEdit}>수정</button>
        <button onClick={() => handleDelete(id)}>삭제</button>
      </div>
      <div className="reviewFavorite">
        <button onClick={handleLike}>
          <img src={thumb} className="reviewthumb" alt="좋아요"></img>
        </button>
        <span className="thumbNum">{likes}</span>
      </div>
    </div>
  );
};

export default ReviewItem;
