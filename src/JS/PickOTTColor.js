import React, { useState, useEffect } from 'react';

function PickOTTColor({ children, resetStyles }) {
  const [divState, setDivState] = useState(false);
  const [filterState, setFilterState] = useState('none');
  const [backState, setBackState] = useState('var(--neutral2)');

  useEffect(() => {
    // 전체 취소하기 버튼이 눌렸을 때
    if (resetStyles) {
      setDivState(true);
      setFilterState('grayscale(100%)');
      setBackState('var(--orange_400)');
    }
  }, [resetStyles]);

  const handleDivClick = () => {
    setFilterState(divState ? 'none' : 'grayscale(100%)');
    setBackState(divState ? 'var(--neutral2)' : 'var(--orange_400)');
    setDivState(!divState);
  };

  const divStyle = {
    filter: filterState,
    backgroundColor: backState,
  };

  return (
    <div 
      style={divStyle} 
      className={`ott_pick_logo${divState ? ' change_styles' : ''}`} 
      onClick={handleDivClick}>
      {children}
    </div>
  );
}

export default PickOTTColor;