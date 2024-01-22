import React, { useState } from 'react';
import { update2ndGenre } from './WonAPI';

function PickButton({ genre, userId, userProfileGenres, children }) {
  // 각 버튼의 독립적 상태 관리 위해 useState 이용
  const [buttonState, setButtonState] = useState(
    userProfileGenres.some(userGenre => userGenre.name === genre.name)
  );
  const [backgroundColor, setBackgroudColor] = useState(
    buttonState ? '#ffA500' : '#EEEEEE'
  );
  const [textColor, setTextColor] = useState(buttonState ? '#FFFFFF' : '#000000');

  // 버튼 클릭 이벤트 핸들러 함수
  const handleBtnClick = async () => {
    try {
      const newBackgroundColor = buttonState ? '#EEEEEE' : '#ffA500';
      const newTextColor = buttonState ? '#000000' : '#FFFFFF';

      setButtonState(!buttonState);
      setBackgroudColor(newBackgroundColor);
      setTextColor(newTextColor);

      // 여기에서 update2ndGenre API 호출
      const updatedRequestDto = {
        genreId: genre.id,
      };
      const updatedData = await update2ndGenre(updatedRequestDto, userId);
      console.log("2ndGenre가 성공적으로 업데이트되었습니다:", updatedData);
    } catch (error) {
      console.error("2ndGenre 업데이트 중 에러 발생:", error);
    }
  };

  return (
    <button
      className='pick'
      style={{ backgroundColor: backgroundColor, color: textColor }}
      onClick={handleBtnClick}
    >
      {children}
    </button>
  );
}

export default PickButton;
