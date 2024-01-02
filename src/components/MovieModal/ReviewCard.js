//review정보 화면 표시
//리뷰 작성자 표시
//리뷰 날짜 표시
import React from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';

const ReviewCard = ({ review }) => {
  return (
    <div className='review-box'>
      <Container>
        <div>
          <div>
            <FontAwesomeIcon icon={faUser} /> {review?.author}
          </div>
          <span>{review?.content}</span>
          <div>
            {/* Display 'created_at' date directly */}
            {review?.created_at ? new Date(review.created_at).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) : ''}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ReviewCard;
