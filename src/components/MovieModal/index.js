import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import axios from "../../api/axios";
import Casts from "./Casts";
import MyWrite from "./MyWrite";
import AllReviewList from "../../JS/AllReviewList";
import "./MovieModal.css";

import debateImage from "../MovieModal/my_debate.png"; // 토론 이미지 가져오기
import likeImage from "./heart.png";
import likeClickedImage from "./heart_clicked.png";
import notInterestedImage from "./hate.png";
import notInterestedClickedImage from "./hate_clicked.png";
import reviewImage from "./review.png";

function MovieModal({ setModalOpen, ...movie }) {
  const navigate = useNavigate();
  const ref = useRef();

  const [isWish, setIsWish] = useState(false); // 찜
  const [wishSrc, setWishSrc] = useState(likeImage); // 초기 상태는 선택이 되지 않은 상태를 나타내기 위함
  const [isNotInterested, setIsNotInterested] = useState(false); // 관심없음
  const [notInterestedSrc, setNotInterestedSrc] = useState(notInterestedImage);

  const [activePriceType, setActivePriceType] = useState(null);

  const handleHeart = () => {
    if (isWish) {
      setWishSrc(likeImage); // 초기 이미지 src
      setIsWish(!isWish);
    } else {
      setWishSrc(likeClickedImage); // 변경될 이미지 src
      setIsWish(!isWish);
    }
  };

  const handleButtonClick = (priceType) => {
    // 가격 유형 활성화 (정액제, 대여, 구매)
    setActivePriceType(priceType);
  };

  const services = [
    {
      name: "넷플릭스",
      link: "https://help.netflix.com/ko/node/24926",
      subscriptionPrice: "8,900원",
      rentalPrice: null, // 만약 해당 서비스에 대여 가격이 없으면 null 이나 적절한 값을 넣으세요.
      buyPrice: null, // 만약 해당 서비스에 구매 가격이 없으면 null 이나 적절한 값을 넣으세요.
    },
    {
      name: "왓차",
      link: "https://help.watcha.co.kr/hc/ko/articles/900003415306-%EC%99%93%EC%B1%A0%EC%97%90%EC%84%9C-%ED%8C%90%EB%A7%A4-%EC%A4%91%EC%9D%B8-%EC%9D%B4%EC%9A%A9%EA%B6%8C-%EC%A2%85%EB%A5%98%EA%B0%80-%EA%B6%81%EA%B8%88%ED%95%B4%EC%9A%94-",
      subscriptionPrice: "8,900원",
      rentalPrice: "12,000원", // 만약 해당 서비스에 대여 가격이 없으면 null 이나 적절한 값을 넣으세요.
      buyPrice: null, // 만약 해당 서비스에 구매 가격이 없으면 null 이나 적절한 값을 넣으세요.
    },
    // 왓차, 티빙 등 다른 서비스 정보를 여기에 추가...
  ];

  const handleDiscuss = () => {
    // 토론 관련 로직
    const programId = movie.programId;
    const title = movie.title;
    navigate("/DebateOne", { state: { programId, title } });
  };

  const handleReview = () => {
    // 리뷰 관련 로직
    const programId = movie.programId;
    // navigate(`/Detail/${programId}/ReviewWrite`);
  };

  const fanRating = 4.5;
  useOnClickOutside(ref, () => {
    setModalOpen(false);
  });

  const handleNotInterested = () => {
    if (isNotInterested) {
      setNotInterestedSrc(notInterestedImage); // 초기 이미지 src
      setIsNotInterested(!isNotInterested);
    } else {
      setNotInterestedSrc(notInterestedClickedImage); // 변경될 이미지 src
      setIsNotInterested(!isNotInterested);
    }
  };

  const [cast, setCast] = useState([]);
  const [programDetail, setProgramDetail] = useState();
  const [programNormalReviewRating, setProgramNormalReviewRating] =
    useState(0.0);
  const [programProviderList, setProgramProviderList] = useState([]);

  useEffect(() => {
    // 가정: API 호출로 캐스트 정보를 가져오는 함수가 있음
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `/api/v1/program/${movie.programId}/details`
        );
        const data = response.data.data;
        setCast(data.oaProgramCreditsDto.cast); // 받아온 데이터로 상태 업데이트
        setProgramDetail(data.programDetailResponse);
        setProgramNormalReviewRating(data.programNormalReviewRating);
        setProgramProviderList(data.programProviderListResponseDto);
      } catch (error) {
        console.error("Fetching cast failed", error);
      }
    };

    fetchCast();
  }); // movieId가 변하지 않는 이상 호출되지 않음

  return (
    <div className="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={ref}>
          <span onClick={() => setModalOpen(false)} className="modal-close">
            X
          </span>

          <img
            className="modal__poster-img"
            src={`https://image.tmdb.org/t/p/original/${
              programDetail?.backDropPath || ""
            }`}
            alt="modal__poster-img"
          />
          <div className="modal__container">
            <h2 className="modal__title">{programDetail?.title}</h2>
            <p className="modal__title-eng">{programDetail?.originalTitle}</p>

            <span className="modal__program-etc">
              <p className="modal__program-createdData">
                {programDetail?.createdDate.slice(0, 4)} ·{" "}
                {programDetail?.genreName.map((genre, index) => (
                  <React.Fragment key={index}>
                    {genre}
                    {index !== programDetail?.genreName.length - 1 && "/"}
                  </React.Fragment>
                ))}
                · {programDetail?.country}
              </p>
            </span>

            <div className="modal__ratings_and_buttons">
              <div className="modal__ratings">
                <div className="average-rating">
                  <p className="average-rating_rating">
                    {programNormalReviewRating}
                  </p>
                  <p className="average-rating_text">평균 별점</p>
                </div>
                <div className="fan-rating">
                  <p className="fan-rating_rating">{fanRating}</p>
                  <p className="fan-rating_text">매니아 별점</p>
                </div>
              </div>

              <div className="modal__buttons">
                {/* 찜하기 버튼 */}
                <div className="heart">
                  <button
                    onClick={handleHeart}
                    className={
                      isWish ? "heart-button-selected" : "heart-button"
                    }
                  >
                    <img
                      src={wishSrc}
                      alt="찜하기"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <p>찜하기</p>
                  </button>
                </div>

                {/* 리뷰하기 버튼 */}
                <div className="review">
                  <button onClick={handleReview}>
                    <img
                      src={reviewImage}
                      alt="리뷰하기"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <p>리뷰하기</p>
                  </button>
                </div>

                {/* 토론하기 버튼 */}
                <div className="discussion">
                  <button onClick={handleDiscuss}>
                    <img
                      src={debateImage}
                      alt="토론하기"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <p>토론하기</p>
                  </button>
                </div>

                {/* 관심없어요 버튼 */}
                <div className="not_interested">
                  <button
                    onClick={handleNotInterested}
                    className={
                      isNotInterested
                        ? "not-interested-button-selected"
                        : "not-interested-button"
                    }
                  >
                    <img
                      src={notInterestedSrc}
                      alt="관심없음"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <p>관심없음</p>
                  </button>
                </div>
              </div>
            </div>

            <div className="modal__content">
              <h3 className="modal__tagline">{programDetail?.tagline}</h3>
              <p className="modal__overview">{programDetail?.overview}</p>
            </div>

            {/* OTT 정보 테이블 */}
            <table>
              <thead>
                <h2>보러가기</h2>
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
                        <a
                          href={service.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {service.name}
                        </a>
                      </div>
                    </td>
                    <td>
                      <button onClick={() => handleButtonClick("subscription")}>
                        정액제
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleButtonClick("rental")}>
                        대여
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleButtonClick("buy")}>
                        구매
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2>출연/제작</h2>
            <Casts castList={cast} />

            {/* 리뷰 및 출연진 컴포넌트 */}
            <AllReviewList programId={movie.programId} />
            {/* <MyWrite programId={movie.programId} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
