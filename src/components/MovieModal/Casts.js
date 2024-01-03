import React from 'react'
import { useParams } from 'react-router-dom';
import api from '../redux/api';
import CastCard from './CastCard';
import { useState,useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Container, Row } from 'react-bootstrap';



const API_KEY=process.env.REACT_APP_API_KEY
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
// Cast.js
// ...기존 코드
const Cast = () => {
  const { id } = useParams();
  const [cast, setCast] = useState([]); // 상태명을 'character'에서 'cast'로 변경했습니다
  
  const getCast = async () => {
    let url = `/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;
    try {
      let response = await api.get(url);
      let data = response.data;
      setCast(data.cast); // 'character'를 'cast'로 변경하고, data.cast를 직접 상태에 저장합니다
    } catch (error) {
      console.error('출연진 정보를 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    getCast();
  }, [id]); // 'id'를 의존성 배열에 추가해서 id가 변경될 때마다 getCast를 호출

  return (
    <div className='castBox'>
      <h1>Character</h1>
      <Container>
        <Row>
          {/* 'cast-box-mobile'이라는 이름의 'div'는 불필요할 수도 있으니,
              필요 없다면 삭제하거나 반응형 디자인에 맞게 조정하세요 */}
          {cast.length > 0 ? cast.map((item) => (
            <CastCard key={item.cast_id} item={item} />
          )) : <p>No cast available</p>}
        </Row>
      </Container>
      {/* 여기에 Carousel을 원한다면 주석을 해제하고 사용하세요 */}
    </div>
  );
};

export default Cast;
