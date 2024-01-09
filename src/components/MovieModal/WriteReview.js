import React, { useState } from 'react';
import './MyCollect.css';

const WriteReview = ({ handleWriteReviewSubmit }) => {
  const [watchedDate, setWatchedDate] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [starRating, setStarRating] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleWatchedDateChange = (e) => {
    setWatchedDate(e.target.value);
  };

  const handleReviewContentChange = (e) => {
    setReviewContent(e.target.value);
  };

  const handleTagSelection = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      if (selectedTags.length < 3) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const handleStarRating = (rating) => {
    setStarRating(rating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      watchedDate: watchedDate,
      reviewContent: reviewContent,
      selectedTags: selectedTags,
      starRating: starRating,
    };
    handleWriteReviewSubmit(reviewData);
    setWatchedDate('');
    setReviewContent('');
    setSelectedTags([]);
    setStarRating(0);
    setShowModal(false);
  };

  const tags = [
    '시간 가는 줄 몰랐어요 ⏱',
    '심장질환자 관람유의 🫀',
    '보호자 동반 필요 👨‍👦',
    '노잼이에요 🤦‍♂',
    '극장에서 또 보고 싶어요 ☝',
    '반전이 있어요 😮',
    '연기가 좋아요 🙆',
    '손수건 필요 😥',
    'OST가 좋아요 🎼',
    '돈이 아까워요 💸',
    '팝콘 필수에요 🍿',
    '스토리 내용이 개연성 있어요 😲',
    '연인이랑 같이 보기 좋아요 💕👥',
  ];

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h2>리뷰 작성하기</h2>
      <button onClick={() => setShowModal(true)}>리뷰 작성하기</button>
      {showModal && (
        <div className="modal display-block">
          <section className="modal-main">
            <form onSubmit={handleSubmit}>
              {/* 별점 입력 부분 */}
              <div className="star-rating">
                <p>별점을 매겨주세요:</p>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    className={`star-button ${rating <= starRating ? 'star-selected' : ''}`}
                    onClick={() => handleStarRating(rating)}
                  >
                    ★
                  </button>
                ))}
              </div>

              {/* 관람 일자 입력 */}
              <label>
                관람 일자:
                <input
                  type="text"
                  value={watchedDate}
                  onChange={handleWatchedDateChange}
                  placeholder="영화를 관람한 날짜를 입력하세요"
                />
              </label>

              {/* 리뷰 내용 입력 */}
              <label>
                리뷰 내용:
                <textarea
                  value={reviewContent}
                  onChange={handleReviewContentChange}
                  placeholder="여기에 리뷰를 작성하세요..."
                  style={{
                    width: '100%',
                    height: '200px',
                    padding: '10px',
                    borderRadius: '5px',
                    resize: 'vertical',
                  }}
                ></textarea>
              </label>

              {/* 태그 선택 부분 */}
              <div className="tag-selector">
                <p>최대 3개의 태그를 선택하세요:</p>
                {tags.map((tag, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`tag-button ${selectedTags.includes(tag) ? 'tag-button-selected' : ''}`}
                    onClick={() => handleTagSelection(tag)}
                  >
                    {tag} {selectedTags.includes(tag) && '✔️'}
                  </button>
                ))}
              </div>

              {/* 리뷰 제출 버튼 */}
              <button type="submit">리뷰 제출</button>

              {/* 모달 닫기 버튼 */}
              <button onClick={handleCloseModal}>닫기</button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default WriteReview;
