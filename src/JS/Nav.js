import { useNavigate } from "react-router-dom";
import {useState} from 'react';
import '../CSS/Nav.css'

import ottify from '../img/ottify.png';
import profile from '../img/사진.jpg';
import search from '../img/search.png';

const Nav = () =>{
  const [searchValue, setSearchValue] = useState('');
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };


  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/');
  }
  const goToMypage = () => {
    navigate('/Mypage');
  }
  const goToDebate = () => {
    navigate('/DebateAll');
  }

  return (
    <ul className="navbar">
      <li className="nav-item" onClick = {goToHome}>
        <img src={ottify} className='nav_logo' alt="Logo"/>
      </li>
      <li className="nav-item" onClick = {goToDebate}>
        <span className='nav_debate'>토론</span>
      </li>
      <li className="nav-item search">
        <input type="text" className = "nav_search" value = {searchValue} onChange = {handleChange} placeholder="콘텐츠를 검색해보세요." />
        <img src = {search} className='search_icon' alt ="검색"></img>
      </li>
      <li className="nav-item" onClick = {goToMypage}>
        <img src={profile} className='nav_profile' alt="User"/>
      </li>
    </ul>
  )
}

export default Nav;