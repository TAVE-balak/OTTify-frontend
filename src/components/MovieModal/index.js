import React, { useRef, useState } from "react";
import "./MovieModal.css";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Reviews from "./Reviews";
import Casts from "./Casts";
import debateImage from "../MovieModal/my_debate.png"; // 토론 이미지 가져오기
import reviewImage from "../MovieModal/write_review.png"; // 리뷰 이미지 가져오기
import WriteReview from "./WriteReview";
import Toggle from "./Toggle";
import notInterestedImage from './hate.png';
function MovieModal({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen,
}) {
  const [isWritingReview, setIsWritingReview] = useState(false);
  const ref = useRef();
  const [reviews, setReviews] = useState([]); // 리뷰 목록을 저장할 상태 추가
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [showFanReviews, setShowFanReviews] = useState(false); // 매니아 리뷰 표시 여부 상태 추가
  const [showNotInterested, setShowNotInterested] = useState(false); // 관심없어요 상태 추가
  const handleAddToWatchlist = () => {
    // 워치리스트에 추가하는 로직
    setIsWatchlisted(!isWatchlisted); // 찜하기 상태 토글
  };
  const [activePriceType, setActivePriceType] = useState(null);

  const handleButtonClick = (priceType) => {
    setActivePriceType(priceType);
  };
  const services = [
    {
      name: '넷플릭스',
      link: 'https://help.netflix.com/ko/node/24926',
      subscriptionPrice: '8,900원',
      rentalPrice: null, // 만약 해당 서비스에 대여 가격이 없으면 null 이나 적절한 값을 넣으세요.
      buyPrice: null, // 만약 해당 서비스에 구매 가격이 없으면 null 이나 적절한 값을 넣으세요.
    },
    // 왓차, 티빙 등 다른 서비스 정보를 여기에 추가...
  ];
  const handleWriteReview = () => {
    // WriteReviewComponent를 보이거나 숨기는 상태를 토글합니다.
    setIsWritingReview(!isWritingReview);
  };

  const handleDiscuss = () => {
    // 토론 관련 로직
  };
  const handleToggleFanReviews = () => {
    // 매니아 리뷰 표시 여부를 토글하는 함수
    setShowFanReviews(!showFanReviews);
  };
  const handleWriteReviewSubmit = (reviewContent) => {
    // 리뷰 제출 핸들러
    console.log('Submitted Review:', reviewContent);
  
    // 리뷰 목록에 추가
    const newReview = {
      content: reviewContent,
      date: new Date().toLocaleDateString(),
      // 여기에 필요한 다른 정보를 추가할 수 있습니다.
    };

    setReviews(prevReviews => [...prevReviews, newReview]);

  setIsWritingReview(false); // 리뷰 작성 상태 변경
};

  const fanRating = 4.5;
  useOnClickOutside(ref, () => {
    setModalOpen(false);
  });
  const handleNotInterested = () => {
    setShowNotInterested(true);
  };

  return (
    <div className="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={ref}>
          <span onClick={() => setModalOpen(false)} className="modal-close">
            X
          </span>

          <img
            className="modal__poster-img"
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt="modal__poster-img"
          />
          <div className="ratings">
           <p className="modal__overview">
          <span className="average-rating">☆평균 별점: {vote_average}</span>
          <span className="fan-rating">⭐매니아 별점: {fanRating}</span>
          </p>
          </div>

            <div className="modal__buttons">
              {/* 찜하기 하트 버튼 */}
            <button onClick={handleAddToWatchlist} className={isWatchlisted ? 'heart-button-selected' : 'heart-button'}>
              <span role="img" aria-label="찜하기">{isWatchlisted ? '💖' : '🤍'}</span>
            </button>
              {/* 리뷰 작성하기 이미지 버튼 */}
              <button onClick={handleWriteReview} >
                <img src={reviewImage} alt="리뷰 작성" style={{ width: '40px', height: '30px' }}/>
              </button>
              {/* 토론하기 이미지 버튼 */}
              <button onClick={handleDiscuss}>
                <img src={debateImage} alt="토론하기" style={{ width: '40px', height: '30px' }} />
              </button>
               {/* 관심없어요 이미지 버튼 */}


              <button onClick={handleNotInterested} style={{ display: showNotInterested ? 'none' : 'block' }}>
              <img src={notInterestedImage} alt="관심없어요" style={{ width: '40px', height: '30px' }} />
              </button>

               {/* 매니아 리뷰 토글 스위치 */}
               <Toggle
        isOn={showFanReviews}
        handleToggle={handleToggleFanReviews}
        text="매니아 리뷰"
      />
            </div>
             {/* OTT 정보 테이블 */}
    <table>
      <thead><h2>보러가기</h2>
      <tr>
        <th>OTT</th>
        <th>정액제</th>
        <th>대여</th>
        <th>구매</th>
        <th>가격</th>
      </tr>
      </thead>
      <tbody>
        {services.map((service, index) => (
          <tr key={index}>
            <td>
              <div className="service-box">
                <a href={service.link} target="_blank" rel="noopener noreferrer">{service.name}</a>
              </div>
            </td>
            <td>
              <button onClick={() => handleButtonClick('subscription')}>정액제</button>
            </td>
            <td>
              <button onClick={() => handleButtonClick('rental')}>대여</button>
            </td>
            <td>
              <button onClick={() => handleButtonClick('buy')}>구매</button>
            </td>
            <td>
              <span className="price">
                {activePriceType === 'subscription' ? service.subscriptionPrice : activePriceType === 'rental' ? service.rentalPrice : activePriceType === 'buy' ? service.buyPrice : ''}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    

            {isWritingReview && (
              <WriteReview handleWriteReviewSubmit={handleWriteReviewSubmit} />
            )}
          <div className="modal__content">
            <p className="modal__details">
              <span className="modal__user_perc"></span>{" "}
              {release_date ? release_date : first_air_date}
            </p>

            <h2 className="modal__title">{title ? title : name}</h2>
            <p className="modal__overview">{overview}</p>

            {/* 리뷰 및 출연진 컴포넌트 */}
            <Reviews reviews={reviews} />
            <Casts />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
