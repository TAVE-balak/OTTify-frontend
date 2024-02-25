import React, { useState, useEffect } from 'react';
import { update2ndGenre } from './WonAPI';

function PickButton({ genre, userId, userProfileGenres, children }) {
  //2순위 장르 세션 스토리지 추가
  const [sessionData, setSessionData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem('userProfileGenres'));
    if (data) {
      setSessionData(data);
    } else {
      // 세션 스토리지에 데이터가 없을 경우 userProfileGenres의 값을 초기값으로 설정
      const initialData = [];
      setSessionData(initialData);
      sessionStorage.setItem('userProfileGenres', JSON.stringify(initialData));
    }
  }, [userProfileGenres]);

  // 각 버튼의 독립적 상태 관리 위해 useState 이용
  const [buttonState, setButtonState] = useState(
    sessionData.some(userGenre => userGenre === genre.name)
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
      const updatedData = await update2ndGenre(updatedRequestDto);
      console.log("2ndGenre가 성공적으로 업데이트되었습니다:", updatedData);

      // 세션 스토리지 업데이트
      const newData = sessionData.includes(genre.name)
        ? sessionData.filter(item => item !== genre.name)
        : [...sessionData, genre.name];
      setSessionData(newData);
      sessionStorage.setItem('userProfileGenres', JSON.stringify(newData));
      
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
