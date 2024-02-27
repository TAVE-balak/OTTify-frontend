import React, { useState } from "react";

function PickButton({ children, id, genreOptions, onClick }) {
  // 각 버튼의 독립적 상태 관리 위해 useState 이용
  const [buttonState, setButtonState] = useState(false);
  const [backgroundColor, setBackgroudColor] = useState("#EEEEEE");
  const [textColor, setTextColor] = useState("#000000");

  //버튼 클릭 이벤트 핸들러 함수
  const handleBtnClick = () => {
    //버튼 상태에 따라 배경색과 텍스트 색상 변경
    const newBackgroundColor = buttonState ? "#EEEEEE" : "#ffA500";
    const newTextColor = buttonState ? "#000000" : "#FFFFFF";

    //상태 업데이트
    setButtonState(!buttonState);
    setBackgroudColor(newBackgroundColor);
    setTextColor(newTextColor);
  };

  const handleDivClick = () => {
    handleBtnClick();
    onClick(id);
  };

  return (
    <button
      className="pick"
      style={{ backgroundColor: backgroundColor, color: textColor }}
      onClick={() => handleDivClick(id)}
      value={id}
    >
      {children}
    </button>
  );
}

export default PickButton;
