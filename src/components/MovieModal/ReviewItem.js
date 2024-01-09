import React, { useState } from 'react';
import './MyCollect.css';
import star from './star1.png'
import thumb from './thumb_up.png';
const ReviewItem = ({author, profileimg, movie, tag, content, created_date, evaluation, favorite, id}) =>{
  const [likes, setLikes] = useState(favorite); // 좋아요 개수를 상태로 관리
  const handleLike = () => {
    setLikes(likes + 1); // 좋아요 개수를 1 증가시킴
    // TODO: 서버에 좋아요 개수 업데이트 요청 등의 로직 추가 가능
  };

  return (
    <div className = "ReviewItem">
      <div className="reviewInfo">
        <div className="writerInfo">
          <img src = {profileimg.img1} className="writer_profile" alt = "프로필 이미지"></img>
          <span className="writer">{author}님의 평가</span>
        </div>
        <span className="writeDate">{created_date}</span>
      </div>

      <div className="reviewMain">
          <span className="reviewName">{movie}</span>
          <div className="reviewPick">
            <img src = {star} className='star' alt = "별점"></img>
            <span className='reviewNum'>{evaluation}</span>
            <div className='tags'>
              <span className='tag_1'>{tag[0]}</span>
              <span className='tag_2'>{tag[1]}</span>
            </div>
          </div>
          <div className='reviewContent'>
            {content}
          </div>
          <button onClick={handleLike}>
          <img src={thumb} className='reviewthumb' alt="좋아요"></img>
        </button>
        <span className='thumbNum'>{likes}</span>
          </div>
        </div>

  )
}

export default ReviewItem;