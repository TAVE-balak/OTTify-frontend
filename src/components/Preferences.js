import React, { useState } from 'react';
import './Preferences.css'; // 스타일시트 임포트
import PickButton from './PickButton';

const genreOptions = [
  { label: '액션', value: 'action' },
  { label: '코미디', value: 'comedy' },
  { label: '로맨스', value: 'romantic' },
  { label: '스릴러', value: 'thriller' },
  { label: '서스펜스', value: 'suspense' },
  { label: '미스터리', value: 'mystery' },
  { label: '느와르', value: 'filmNoir' },
  { label: '서부극', value: 'western' },
  { label: '뮤지컬', value: 'musical' },
  { label: '다큐멘터리', value: 'documentary' },
  { label: '모큐멘터리', value: 'mockumentary' },
  { label: '재난', value: 'disaster' },
  { label: '블록버스터', value: 'blockbuster' },
  { label: '스펙타클', value: 'spectacle' },
  { label: '시리즈', value: 'series' },
  { label: '서사극', value: 'epic' },
  { label: '로코(로맨틱 코미디)', value: 'romcom' },
  { label: '음악여행', value: 'musicJourney' },
  { label: 'B급', value: 'bMovie' },
  { label: '모험', value: 'adventure' },
  { label: '가족', value: 'family' },
];

const Preferences = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [preferences, setPreferences] = useState([]);

  const handlePreferenceChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value); // 현재 선택된 옵션을 업데이트합니다.
    
    // 선택된 취향이 기존 배열에 없는 경우에만 배열에 추가합니다.
    if (value && !preferences.includes(value)) {
      setPreferences([...preferences, value]);
    }
  };

  const handleClearPreferences = () => {
    setPreferences([]); // 선택된 취향 리스트 초기화
    setSelectedOption(''); // 드롭다운 메뉴 선택 초기화
  };

  const handleGenreButtonClick = (value) => {
    if (!preferences.includes(value)) {
      setPreferences([...preferences, value]); // 버튼을 클릭으로 선택된 취향 추가
    }
  };

  const handleApplyPreferences = () => {
    console.log('선택된 취향:', preferences);
    // 이 부분에 취향에 따른 필터링 로직을 추가할 수 있습니다.
  };

  return (
    <div>
      <h2 className="title-typography">당신의 <span className="highlight">취향</span>을 선택해 주세요</h2>
     
      {/* 1순위 장르 선택하기 */}
      <h3>1순위 장르 선택하기</h3>
      <select
        className="select-layout select-option"
        value={selectedOption}
        onChange={handlePreferenceChange}
      >
        {/* option 선택 */}
        <option value="" disabled>취향 옵션을 선택하세요</option>
        {genreOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>

      {/* 선택된 취향 리스트 */}
      <div className="preferences-list">
        {preferences.map((preference, index) => (
          <span key={index} className="preference-item">
            {genreOptions.find(option => option.value === preference)?.label || preference}
          </span>
        ))}
      </div>
      
      {/* 내가 좋아하는 장르 더 선택하기 */}
      <h3>내가 좋아하는 장르 더 선택하기</h3>
      <div className="genre-buttons">
        {genreOptions.map((genre) => (
          <PickButton
            key={genre.value}
            className={"genre-button " + (preferences.includes(genre.value) ? "selected" : "")}
            onClick={handleGenreButtonClick}
          >
            {genre.label}
          </PickButton>
        ))}
      </div>

      {/* 버튼 - 전체 취소하기 */}
      <button className="clear-button" onClick={handleClearPreferences}>
        전체 취소하기
      </button>

      {/* 버튼 - 적용하기 */}
      <button className="apply-button" onClick={handleApplyPreferences}>
        적용하기
      </button>
    </div>
  );
};

export default Preferences;
