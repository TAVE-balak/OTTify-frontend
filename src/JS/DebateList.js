import React from 'react';
import DebateItem from './DebateItem';
import { useNavigate } from 'react-router-dom';

const DebateList = ({debateList}) => {
  const navigate = useNavigate();

  const handleClick = (event, debateItem) => {
    // 이벤트 객체에서 필요한 정보 추출
    const eventData = {
      clientX: event.clientX,
      clientY: event.clientY,
      // 필요한 다른 속성들 추출
    };

    // navigate 함수 호출 시 직렬화 가능한 형태로 데이터 전달
    navigate('/DebateDetail', { state: { debateItem, eventData } });
  };

  return (
    <div className = "DebateList">
      <div>
        {debateList.map((it)=>(  //각각의 요소
          <DebateItem key = {it.id} {...it} onClick={(event) => handleClick(event, it)}/> //별도의 component인 DebateItem 이용
        ))}
      </div>
  </div>
  );
};

DebateList.defaultProps = {  //undefined로 전달받을 수 있는 것의 기본값 설정
  debateList: []
};

export default DebateList;