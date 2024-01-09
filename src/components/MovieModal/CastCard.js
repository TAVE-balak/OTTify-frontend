import React from 'react';
import { Container } from 'react-bootstrap';

const CastCard = ({ item }) => {
  return (
    <div>
      <Container>
        <div className='cast-img'>
          {item.profile_path ? (
            <img src={`https://image.tmdb.org/t/p/original/${item.profile_path}`} alt='Profile' />
          ) : (
            <img src='https://previews.123rf.com/images/julynx/julynx1408/julynx140800023/30746516-%EC%82%AC%EC%9A%A9%ED%95%A0-%EC%88%98-%EC%97%86%EA%B1%B0%EB%82%98-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%82%AC%EC%A7%84-%EC%97%86%EC%9D%8C.jpg' alt='Profile' />
          )}
          <p>{item.original_name}</p>
        </div>
      </Container>
    </div>
  );
}


export default CastCard;
