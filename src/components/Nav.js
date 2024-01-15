import { useNavigate } from "react-router-dom";
import '../CSS/Nav.css';
import React, { useState, useEffect } from 'react';
import ottify from '../img/ottify.png';
import profile from '../img/사진.jpg';
import search from '../img/search.png';
import Login from "./Login/Login";
//api 호출
import {fetchUserProfile} from '../JS/WonAPI';

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

  const goToMypage = () => {
    navigate('/Mypage');
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

  //api 호출 (마이페이지)
  const userId = 1;
  const fetchData = async () => {
    try {
      await fetchUserProfile(userId);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  useEffect(() => {
    fetchData(); // 마운트 시에 데이터를 불러오기 위한 호출
  }, []);

  const fetchDataOnClick = async () => {
    fetchData(); // 버튼 클릭 시에도 동일한 로직을 수행
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
        <input
          value={searchValue}
          onChange={handleChange}
          className="nav__input"
          type="text"
          placeholder="영화를 검색해주세요."
        />
        <li className="nav-item" onClick={(e)=>{goToMypage(e); fetchDataOnClick(e)}}>
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