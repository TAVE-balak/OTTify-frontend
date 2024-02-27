import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pickbutton from "./Pickbutton";
import axios from "../api/axios";
import requests from "../api/requests";
import "./Preferences.css"; // 스타일시트 임포트

const genreOptions = [
  { label: "액션", id: 1 },
  { label: "코미디", id: 2 },
  { label: "로맨스", id: 3 },
  { label: "스릴러", id: 4 },
  { label: "서스펜스", id: 5 },
  { label: "미스터리", id: 6 },
  { label: "느와르", id: 7 },
  { label: "서부극", id: 8 },
  { label: "뮤지컬", id: 9 },
  { label: "다큐멘터리", id: 10 },
  { label: "모큐멘터리", id: 11 },
  { label: "재난", id: 12 },
  { label: "블록버스터", id: 13 },
  { label: "스펙타클", id: 14 },
  { label: "시리즈", id: 15 },
  { label: "서사극", id: 16 },
  { label: "로코(로맨틱 코미디)", id: 17 },
  { label: "음악여행", id: 18 },
  { label: "B급", id: 19 },
  { label: "모험", id: 20 },
  { label: "가족", id: 21 },
];

const Preferences = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [preferences, setPreferences] = useState([]);
  const navigate = useNavigate();

  const handlePreferenceChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value); // 현재 선택된 옵션을 업데이트합니다.
  };

  const handleClearPreferences = () => {
    setPreferences([]); // 선택된 취향 리스트 초기화
    setSelectedOption(""); // 드롭다운 메뉴 선택 초기화
  };

  const handleGenreButtonClick = (value) => {
    if (value && !preferences.includes(value)) {
      setPreferences([value, ...preferences]); // 버튼을 클릭으로 선택된 취향 추가
    }
  };

  const handleApplyPreferences = async () => {
    let accessToken = localStorage.getItem("accessToken") || "";
    const ottList = sessionStorage.getItem("selectedOTT") || "";

    try {
      const response = await axios.post(
        requests.fetchSaveSignUpInfo,
        {
          firstGenre: selectedOption,
          genreList: preferences,
          ottList: JSON.parse(ottList),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error("Error Update data:", error);
    }

    navigate("/");
    // 이 부분에 취향에 따른 필터링 로직을 추가할 수 있습니다.
  };

  return (
    <div>
      <h2 className="title-typography">
        당신의 <span className="highlight">취향</span>을 선택해 주세요
      </h2>

      {/* 1순위 장르 선택하기 */}
      <h3>1순위 장르 선택하기</h3>
      <select
        className="select-layout select-option"
        value={selectedOption}
        onChange={handlePreferenceChange}
      >
        {/* option 선택 */}
        <option value="" disabled>
          취향 옵션을 선택하세요
        </option>
        {genreOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>

      {/* 선택된 취향 리스트 */}
      <div className="preferences-list">
        {preferences.map((preference, index) => (
          <span key={index} className="preference-item">
            {genreOptions.find((option) => option.label === preference)
              ?.label || preference}
          </span>
        ))}
      </div>

      {/* 내가 좋아하는 장르 더 선택하기 */}
      <h3>내가 좋아하는 장르 더 선택하기</h3>
      <div className="genre-buttons">
        {genreOptions.map((genre) => (
          <Pickbutton
            key={genre.id}
            id={String(genre.id)}
            className={
              "genre-button " +
              (preferences.includes(genre.label) ? "selected" : "")
            }
            genreOptions={genreOptions}
            onClick={handleGenreButtonClick}
          >
            {genre.label}
          </Pickbutton>
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
