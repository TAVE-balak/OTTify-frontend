import React from 'react';
import DebateItem from './DebateItem';

const DebateList = ({debateList}) => {
  return (
    <div className = "DebateList">
      <div>
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