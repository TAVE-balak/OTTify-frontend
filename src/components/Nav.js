import { useNavigate } from "react-router-dom";
import '../CSS/Nav.css';
import React, { useState, useEffect } from 'react';
import ottify from '../img/ottify.png';
import profile from '../img/사진.jpg';
import search from '../img/search.png';
import Login from "./Login/Login";

const Nav = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // 로그인 모달 표시 여부 상태
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  const goToHome = () =>{
    navigate('/');
  }

  const goToMypage = async () => {
      const userId = 1;
      navigate(`/Mypage/${userId}`);
  };
  const goToDebate = () => {
    navigate('/DebateAll');
  };
  const goToOne = () => {
    navigate('/DebateOne');
  };
  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen); // 로그인 모달 가시성 토글
  };

  return (
    <>
      <ul className="navbar">
        <li className="nav-item" onClick={goToHome}>
          <img src={ottify} className='nav_logo' alt="Logo" />
        </li>
        <li className="nav-item" onClick={goToDebate}>
          <span className='nav_debate'>토론</span>
        </li>
        <div className="search">
          <input
            value={searchValue}
            onChange={handleChange}
            className="nav__input"
            type="text"
            placeholder="영화와 드라마를 검색해주세요."
          />
          <img src = {search} className="search_icon"></img>
        </div>
        <li className="nav-item" onClick={goToMypage}>
          <img src={profile} className='nav_profile' alt="User" />
        </li>
        {/* Add a login button */}
        <li className="nav-item">
          <button onClick={toggleLoginModal} className="nav_login">로그인</button>
        </li>
      </ul>

     {/* 로그인 모달 표시 */}
     {isLoginModalOpen && (
        <div className="login-modal-background">
          <div className="login-modal">
            <Login onClose={toggleLoginModal} />
            <button onClick={toggleLoginModal}>닫기</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;