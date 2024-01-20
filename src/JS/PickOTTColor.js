import React, { useState, useEffect } from 'react';

function PickOTTColor({ children, resetStyles, myOTTArray, id }) {
  const [divState, setDivState] = useState(myOTTArray?.includes(String(id)) || false);
  const [filterState, setFilterState] = useState(divState ? 'none' : 'grayscale(100%)');
  const [backState, setBackState] = useState(divState ? 'var(--neutral2)' : 'var(--orange_400)');

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
