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
      reviewer: '리뷰어 1',
      title: '영화 제목 1',
      content: '리뷰 내용 1',
      rating: '⭐️⭐️⭐️⭐️⭐️',
    },
    {
      reviewer: '리뷰어 1',
      title: '영화 제목 1',
      content: '리뷰 내용 1',
      rating: '⭐️⭐️⭐️⭐️⭐️',
    },
    {
      reviewer: '리뷰어 1',
      title: '영화 제목 1',
      content: '리뷰 내용 1',
      rating: '⭐️⭐️⭐️⭐️⭐️',
    },
    {
      reviewer: '리뷰어 1',
      title: '영화 제목 1',
      content: '리뷰 내용 1',
      rating: '⭐️⭐️⭐️⭐️⭐️',
    },
    {
      reviewer: '리뷰어 1',
      title: '영화 제목 1',
      content: '리뷰 내용 1',
      rating: '⭐️⭐️⭐️⭐️⭐️',
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
        slidesPerView={3} // 한 번에 보을 슬라이드 수
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
              <strong>리뷰 작성자:</strong> {review.reviewer}<br />
              <strong>영화 제목:</strong> {review.title}<br />
              <strong>리뷰 내용:</strong> {review.content}<br />
              <strong>평점:</strong> {review.rating}
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
      <Swiper
        spaceBetween={0}
        slidesPerView={4}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop={true}
      >
        {likeData.map((item, index) => (
          <SwiperSlide key={index}>
            <div style={{ margin: '10px', width: '30%' }}>
              <img
                src={item.poster}
                alt={`poster-${index}`}
                style={{ width: '100%', height: 'auto' }}
              />
              <button
                   onClick={() => handleButtonClick(index)} // 클릭 핸들러에 인덱스 전달
                style={{
                  marginTop: '5px',
                  backgroundColor: clickedButtons[index] ? 'green' : 'var(--Priamary-Primary, var(--primary, #FD7E14))',
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
          </SwiperSlide>
        ))}
      </Swiper>

      <h2>오늘의 트렌딩</h2>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
<Swiper
  modules={[Autoplay]}
  spaceBetween={10}
  slidesPerView={2}
  loop={true}
  autoplay={{
    delay: 3500, // 3.5초 간격으로 자동 슬라이드 변경
    disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생 계속
  }}
>
  {trendingItems.map((item, index) => (
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
      {item.isMovie ? '영화' : '드라마'}
    </SwiperSlide>
  ))}
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