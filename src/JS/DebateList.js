import React from 'react';
import DebateItem from './DebateItem';
import { useNavigate } from 'react-router-dom';

const DebateList = ({debateList}) => {
  const navigate = useNavigate();
  const goToDetail = () => {
    navigate('/DebateDetail');
  }

  return (
    <div className = "DebateList">
      <div onClick={goToDetail}>
        {debateList.map((it)=>(  //각각의 요소
          <DebateItem key = {it.id} {...it} /> //별도의 component인 DebateItem 이용
        ))}
      </div>
  </div>
  );
};

DebateList.defaultProps = {  //undefined로 전달받을 수 있는 것의 기본값 설정
  debateList: []
};

export default DebateList;