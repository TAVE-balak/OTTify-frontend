import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DetailReview.css";

const WriteReview = ({ handleWriteReviewSubmit, programId = 1  }) => {
  const [watchedDate, setWatchedDate] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [starRating, setStarRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 태그를 가져오는 함수 호출
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axios.get("http://52.79.200.90:8080/api/v1/reviewTag/list");
      // 객체의 값을 배열로 변환하여 설정
      setTags(Object.values(response.data));
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleWatchedDateChange = (e) => {
    setWatchedDate(e.target.value);
  };

  const handleReviewContentChange = (e) => {
    setReviewContent(e.target.value);
  };

  const handleTagSelection = (tag) => {
    const tagId = tag.id; // Use tag ID
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((selectedTagId) => selectedTagId !== tagId));
    } else {
      if (selectedTags.length < 3) {
        setSelectedTags([...selectedTags, tagId]);
      }
    }
  };
  

  const handleStarRating = (rating) => {
    setStarRating(rating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Adjust the review data structure to match the expected format
      const reviewData = {
        contents: reviewContent,
        programId: programId,
        rating: starRating,
        reviewTagIdDtoList: selectedTags.map(tag => ({tagId: tag})), // Assuming selectedTags holds tag IDs
      };

      // 리뷰 작성 API 호출
      const response = await axios.post("http://52.79.200.90:8080/api/v1/review", reviewData);
      console.log("Review submitted:", response.data);
      // 리뷰 작성 완료 후 상태 초기화 및 모달 닫기
      setWatchedDate("");
      setReviewContent("");
      setSelectedTags([]);
      setStarRating(0);
      setShowModal(false);
      // 리뷰 작성 완료 후 부모 컴포넌트로 콜백 호출
      handleWriteReviewSubmit(response.data);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const WriteIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M33.333 3.33301H6.66634C4.83301 3.33301 3.34967 4.83301 3.34967 6.66634L3.33301 36.6663L9.99967 29.9997H33.333C35.1663 29.9997 36.6663 28.4997 36.6663 26.6663V6.66634C36.6663 4.83301 35.1663 3.33301 33.333 3.33301ZM33.333 26.6663H8.61634L6.66634 28.6163V6.66634H33.333V26.6663ZM17.4997 23.333H29.9997V19.9997H20.833L17.4997 23.333ZM23.933 13.5497C24.2663 13.2163 24.2663 12.6997 23.933 12.3663L20.983 9.41634C20.6497 9.08301 20.133 9.08301 19.7997 9.41634L9.99967 19.2163V23.333H14.1163L23.933 13.5497Z"
        fill="#ADB5BD"
      />
    </svg>
  );

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button
        className="write-review-button"
        onClick={() => setShowModal(true)}
      >
        <WriteIcon />
        <p>리뷰하기</p>
      </button>
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
                    className={`star-button ${
                      rating <= starRating ? "star-selected" : ""
                    }`}
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
                    width: "100%",
                    height: "200px",
                    padding: "10px",
                    borderRadius: "5px",
                    resize: "vertical",
                  }}
                ></textarea>
              </label>

              {/* 태그 선택 부분 */}
              <div className="tag-selector">
                <p>최대 3개의 태그를 선택하세요:</p>
                {tags.map((tag) => (
  <button
    key={tag.id}
    type="button"
    className={`tag-button ${
      selectedTags.includes(tag.id) ? "tag-button-selected" : ""
    }`}
    onClick={() => handleTagSelection(tag)}
  >
    {tag.name} {selectedTags.includes(tag.id) && "✔️"}
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
