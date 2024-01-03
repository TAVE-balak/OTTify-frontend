import React, { useState } from 'react';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>닫기</button>
      </section>
    </div>
  );
};
const ReviewForm = ({ handleWriteReviewSubmit }) => {
  const [watchedDate, setWatchedDate] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showModal, setShowModal] = useState(false); // 모달 열림/닫힘 상태

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      watchedDate: watchedDate,
      reviewContent: reviewContent,
      selectedTags: selectedTags,
    };
    handleWriteReviewSubmit(reviewData);
    setWatchedDate('');
    setReviewContent('');
    setSelectedTags([]);
  };

  const tags = [
    '시간 가는 줄 몰랐어요 ⏱️',
    '심장질환자 관람유의 🫀',
    '보호자 동반 필요 👨‍👦',
    '노잼이에요 🤦‍♂️',
    '극장에서 또 보고 싶어요 ☝️',
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
      <Modal show={showModal} handleClose={handleCloseModal}>
        <form onSubmit={handleSubmit}>
        <label>
          관람 일자:
          <input
            type="text"
            value={watchedDate}
            onChange={handleWatchedDateChange}
            placeholder="영화를 관람한 날짜를 입력하세요"
          />
        </label>
        <label>
          리뷰 내용:
          <textarea
            value={reviewContent}
            onChange={handleReviewContentChange}
            placeholder="여기에 리뷰를 작성하세요..."
            style={{ width: '100%', height: '200px', padding: '10px', borderRadius: '5px', resize: 'vertical' }}
          ></textarea>
        </label>
        <div className="tag-selector">
          <p>최대 3개의 태그를 선택하세요:</p>
          {tags.map((tag, index) => (
           <button
           key={index}
           type="button" // 버튼이 폼을 제출하는 것을 방지하기 위해 type을 button으로 지정
           className={`tag-button ${selectedTags.includes(tag) ? 'tag-button-selected' : ''}`}
           onClick={() => handleTagSelection(tag)}
         >
           {tag} {selectedTags.includes(tag) && '✔️'}
         </button>
         
          ))}
        </div>
        <button type="submit">리뷰 제출</button>
      </form>
      </Modal>
    </div>
  );
};

export default ReviewForm;
