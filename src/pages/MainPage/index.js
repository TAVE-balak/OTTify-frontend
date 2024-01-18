import React, { useState, useEffect } from 'react';
import Row from '../../components/Row';
import requests from '../../api/requests';
import poster from '../MainPage/poster.jpg';
import sweethome from '../MainPage/sweethome.png';
import lilju from '../MainPage/lilju.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
const MainPage = () => {
  const likeData = [
    { poster: poster },
    { poster: poster },
    { poster: poster },
    { poster: poster },
    { poster: poster },
    { poster: poster },
   
    // Add other poster objects here
  ];
    // 클릭 상태 및 컬러 인덱스를 다루는 상태 값
  const [clickedButtons, setClickedButtons] = useState(Array(likeData.length).fill(false));
  const [colorIndex, setColorIndex] = useState(0);
  // 버튼 클릭 처리
  const handleButtonClick = (index) => {
    const newClickedButtons = [...clickedButtons]; // 이전 클릭 상태 복사
    newClickedButtons[index] = !newClickedButtons[index]; // 클릭된 버튼 상태 변경
    setClickedButtons(newClickedButtons); // 변경된 클릭 상태 적용
  };
    // Rendering only first 6 items from likeData
    const displayedLikeData = likeData.slice(0, 6);

// 트렌딩 아이템 배열
const trendingItems = [
  {
    title: '스위트 홈 시즌 2',
    posterUrl: sweethome, // Use the imported image here
    releaseYear: 2022, // Add the release year
    rating: '4.5/5',
    isMovie: true, 
  },
  {
    title: '태어난 김에 세계일주 3',
    posterUrl: lilju, // 실제 이미지 경로로 변경해야 함
    releaseYear: 2023, // Add the release year
    rating: '3.8/5',
    isMovie: true,
  },
  // 다른 트렌딩 영화들...
];

// 1초마다 컬러 인덱스 변경
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % 10);
    }, 1000); // Change color every second

    return () => clearInterval(interval);
  }, []);
  // 리뷰에 대한 컬러 스타일 배열
  const colorStyles = [
    { color: '#000' },
    { color: '#333' },
    { color: '#666' },
    { color: '#999' },
    { color: '#BBB' },
    { color: '#DDD' },
    { color: '#EEE' },
    { color: '#888' },
    { color: '#555' },
    { color: '#222' },
  ];

  const reviews = [
    {
      "reviewId": 11,
      "nickName": "김지윤",
      "content": "재개봉언제해!!!",
      "programTitle": "어벤져스 컨피덴셜: 블랙 위도우 앤 퍼니셔",
      "userRating": 5,
      "profilePhoto": "https://lh3.googleusercontent.com/a/ACg8ocIi-9_9OTivTqJ10vMK1JjYs1PkCrW8oc8Kk9W5kb8L=s96-c",
      "likeCount": 0
    },
    {
      "reviewId": 10,
      "nickName": "김지윤",
      "content": "기대했는데 재미없어요",
      "programTitle": "오펜하이머",
      "userRating": 1.5,
      "profilePhoto": "https://lh3.googleusercontent.com/a/ACg8ocIi-9_9OTivTqJ10vMK1JjYs1PkCrW8oc8Kk9W5kb8L=s96-c",
      "likeCount": 0
    },
    {
      "reviewId": 9,
      "nickName": "김지윤",
      "content": "노량도보고싶고위시도보고싶다!",
      "programTitle": "얼티밋 어벤져스 2",
      "userRating": 3.5,
      "profilePhoto": "https://lh3.googleusercontent.com/a/ACg8ocIi-9_9OTivTqJ10vMK1JjYs1PkCrW8oc8Kk9W5kb8L=s96-c",
      "likeCount": 0
    },
    {
      "reviewId": 8,
      "nickName": "김지윤",
      "content": "zzz핵꿀잼이였어영 완전완전!!!!!!",
      "programTitle": "레고 마블 어벤져스: 코드 레드",
      "userRating": 3.5,
      "profilePhoto": "https://lh3.googleusercontent.com/a/ACg8ocIi-9_9OTivTqJ10vMK1JjYs1PkCrW8oc8Kk9W5kb8L=s96-c",
      "likeCount": 0
    },
    {
      "reviewId": 7,
      "nickName": "김지윤",
      "content": "핵꿀잼이였어영 완전완전2222",
      "programTitle": "어벤져스",
      "userRating": 4.5,
      "profilePhoto": "https://lh3.googleusercontent.com/a/ACg8ocIi-9_9OTivTqJ10vMK1JjYs1PkCrW8oc8Kk9W5kb8L=s96-c",
      "likeCount": 0
    },
    {
      "reviewId": 6,
      "nickName": "김지윤",
      "content": "핵꿀잼이였어영 완전완전!!",
      "programTitle": "어벤져스: 인피니티 워",
      "userRating": 3.5,
      "profilePhoto": "https://lh3.googleusercontent.com/a/ACg8ocIi-9_9OTivTqJ10vMK1JjYs1PkCrW8oc8Kk9W5kb8L=s96-c",
      "likeCount": 0
    },
    {
      "reviewId": 5,
      "nickName": "이진우",
      "content": "이진우의 두번째 리뷰 테스트~",
      "programTitle": "어벤져스: 엔드게임",
      "userRating": 2,
      "profilePhoto": "https://phinf.pstatic.net/contact/20230615_207/1686815329264fVtbk_PNG/%BD%BA%C5%A9%B8%B0%BC%A6_2023-06-15_164754.png",
      "likeCount": 1
    },
    {
      "reviewId": 4,
      "nickName": "이진우",
      "content": "이진우의 리뷰테스트~",
      "programTitle": "어벤져스: 인피니티 워",
      "userRating": 4,
      "profilePhoto": "https://phinf.pstatic.net/contact/20230615_207/1686815329264fVtbk_PNG/%BD%BA%C5%A9%B8%B0%BC%A6_2023-06-15_164754.png",
      "likeCount": 0
    },
  ];
   // Initialize likes count state where each review starts with 0 likes
const [likes, setLikes] = useState(reviews.map(() => 0));


  return (
    <div>
      <Row
        title="인기차트"
        id="TR"
        fetchUrl={requests.fetchTopRated}
        isLargeRow
      />
<h2>
  최신리뷰 한줄평{' '}
  <span style={{ fontSize: 'smaller', color: 'lightgrey' }}>눌러서 스와이프</span>
</h2>

      <Swiper
        spaceBetween={10} // 슬라이드 간 간격
        slidesPerView={4} // 한 번에 보을 슬라이드 수
        navigation // 네비게이션 화살표 사용
        pagination={{ clickable: true }} // 페이지 표시기 사용
        scrollbar={{ draggable: true }} // 스크롤바로 슬라이드를 넘길 수 있게 설정
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div style={{
              borderRadius: '15px',
              background: 'var(--White, #FFF)',
              boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.10)',
              padding: '10px',
              marginBottom: '10px',
            }}>
              <strong>리뷰 작성자:</strong> {review.nickName || review.reviewer}<br />
              <strong>영화 제목:</strong> {review.programTitle || review.title}<br />
              <strong>리뷰 내용:</strong> {review.content}<br />
              <strong>평점:</strong> {review.userRating || review.rating}
               {/* Add the like button with the count, which updates on click */}
        <button
          onClick={() => {
            const newLikes = [...likes];
            newLikes[index]++;
            setLikes(newLikes);
          }}
          style={{
            marginTop: '10px',
            backgroundColor: 'grey',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          따봉 {likes[index]}
        </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

        {/* 추가: '당신의 인생작이 될 수도 있어요!' 제목 */}

        <h2>당신의 인생작이 될 수 있어요!{' '}<span style={{ fontSize: 'smaller', color: 'lightgrey' }}>*추천 기준은 찜(50%), 별점(50%) 기준으로 산정됩니다. </span></h2>
      {/* Displaying only first 6 posters */}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {displayedLikeData.map((item, index) => (
          <div key={index} style={{ margin: '10px', width: '30%' }}>
            <img
              src={item.poster}
              alt={`poster-${index}`}
              style={{ width: '100%', height: 'auto' }}
            />
            <button
              onClick={() => handleButtonClick(index)}
              style={{
                marginTop: '5px',
                backgroundColor: clickedButtons[index] ? 'green' : 'var(--Primary-Primary, var(--primary, #FD7E14))',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              {clickedButtons[index] ? '클릭됨!' : '찜하기'}
            </button>
          </div>
        ))}
      </div>


      <h2>오늘의 트렌딩</h2>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
<Swiper
  modules={[Autoplay]}
  spaceBetween={10}
  slidesPerView={1}
  loop={true}
  autoplay={{
    delay: 3500, // 3.5초 간격으로 자동 슬라이드 변경
    disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생 계속
  }}
>
<SwiperSlide>
  {/* {trendingItems.map((item, index) => (
    <SwiperSlide key={index}>
      <img
        src={item.posterUrl}
        alt={item.title}
        style={{ width: '300px', height: '150px' }}
      />
    <strong>{`${index + 1}. ${item.title}`}</strong>
      <br />
      {`개봉년도: ${item.releaseYear}`} 
      <br />
      {`평점: ${item.rating}`}
      <br />
      {item.isMovie ? '영화' : '드라마'} */}
      <Row
        title=""
        id="NO"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
    </SwiperSlide>

</Swiper>

        {/* Movie titles */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ol style={{ listStyleType: 'none', padding: 0 }}>
            {trendingItems.map((item, index) => (
              <li key={index} style={colorStyles[(colorIndex + index) % 10]}>
              </li>
            ))}
          </ol>
      </div>
      </div>
    </div>
  );
}
  export default MainPage ;