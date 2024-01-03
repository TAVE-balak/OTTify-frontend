import React from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';

const ReviewCard = ({ review }) => {
  return (
    <div className='review-box'>
      <Container>
        <div>
          <div>
            {/* 사용자 아이콘과 리뷰 작성자 이름 표시 */}
            <FontAwesomeIcon icon={faUser} /> {review?.author}
          </div>
          {/* 리뷰 내용 표시 */}
          <span>{review?.content}</span>
          <div>
            {/* 리뷰 생성 날짜를 직접 표시 */}
            {review?.created_at ? new Date(review.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ReviewCard;
