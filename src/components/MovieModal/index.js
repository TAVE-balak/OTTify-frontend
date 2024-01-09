import React, { useRef, useState,useEffect } from "react";
import "./MovieModal.css";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Casts from "./Casts";
import debateImage from "../MovieModal/my_debate.png"; // 토론 이미지 가져오기
import Toggle from "./Toggle";
import notInterestedImage from './hate.png';
import MyWrite from "./MyWrite";
import { useNavigate } from "react-router-dom";


function MovieModal({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen,
  movieId
}) {
  const navigate = useNavigate();
  const ref = useRef();
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [showFanReviews, setShowFanReviews] = useState(false);
  const [showNotInterested, setShowNotInterested] = useState(false);
  const [activePriceType, setActivePriceType] = useState(null);


  const handleAddToWatchlist = () => {
    // 워치리스트에 추가하는 로직
    setIsWatchlisted(!isWatchlisted);
  };

  const handleButtonClick = (priceType) => {
    // 가격 유형 활성화 (정액제, 대여, 구매)
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
    {
      name: '왓차',
      link: 'https://help.watcha.co.kr/hc/ko/articles/900003415306-%EC%99%93%EC%B1%A0%EC%97%90%EC%84%9C-%ED%8C%90%EB%A7%A4-%EC%A4%91%EC%9D%B8-%EC%9D%B4%EC%9A%A9%EA%B6%8C-%EC%A2%85%EB%A5%98%EA%B0%80-%EA%B6%81%EA%B8%88%ED%95%B4%EC%9A%94-',
      subscriptionPrice: '8,900원',
      rentalPrice: '12,000원', // 만약 해당 서비스에 대여 가격이 없으면 null 이나 적절한 값을 넣으세요.
      buyPrice: null, // 만약 해당 서비스에 구매 가격이 없으면 null 이나 적절한 값을 넣으세요.
    },
    // 왓차, 티빙 등 다른 서비스 정보를 여기에 추가...
  ];
 
  const handleDiscuss = () => {
    // 토론 관련 로직
    navigate('/DebateOne');
  };
  const handleToggleFanReviews = () => {
    // 매니아 리뷰 표시 여부를 토글하는 함수
    setShowFanReviews(!showFanReviews);
  };


  const fanRating = 4.5;
  useOnClickOutside(ref, () => {
    setModalOpen(false);
  });
  const handleNotInterested = () => {
    setShowNotInterested((prevShowNotInterested) => !prevShowNotInterested);
  };
  const [cast, setCast] = useState([]);

  useEffect(() => {
    // 가정: API 호출로 캐스트 정보를 가져오는 함수가 있음
    const fetchCast = async () => {
      try {
        const response = await fetch(`/api/cast?movieId=${movieId}`);
        const data = await response.json();
        setCast(data.cast); // 받아온 데이터로 상태 업데이트
      } catch (error) {
        console.error("Fetching cast failed", error);
      }
    };

    fetchCast();
  }, []); // movieId가 변하지 않는 이상 호출되지 않음

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
           
              {/* 토론하기 이미지 버튼 */}
              <button onClick={handleDiscuss}>
                <img src={debateImage} alt="토론하기" style={{ width: '40px', height: '30px' }} />
              </button>
               {/* 관심없어요 이미지 버튼 */}


               <button
  onClick={handleNotInterested}
  className={showNotInterested ? 'not-interested-button-active' : 'not-interested-button'}
>
  <img src={notInterestedImage} alt="관심없어요" style={{ width: '40px', height: '30px' }} />
</button>


               {/* 매니아 리뷰 토글 스위치 */}
               <Toggle
        isOn={showFanReviews}
        handleToggle={handleToggleFanReviews}
        text="매니아 리뷰"
      />
            </div>
            <div className="modal__content">
            <p className="modal__details">
              <span className="modal__user_perc"></span>{" "}
              {release_date ? release_date : first_air_date}
            </p>

            <h2 className="modal__title">{title ? title : name}</h2>
            <p className="modal__overview">{overview}</p>
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
    <h2>출연/제작</h2>
            <Casts castList={cast} />
            {/* 리뷰 및 출연진 컴포넌트 */}
            <MyWrite />
          </div>
        </div>
      </div>

  );
}

export default MovieModal;
