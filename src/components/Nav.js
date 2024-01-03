import { useNavigate } from "react-router-dom";
import '../CSS/Nav.css'

import ottify from '../img/ottify.png';
import profile from '../img/사진.jpg';
import search from '../img/search.png';

const Nav = () =>{
  const navigate = useNavigate();
  const goToMypage = () => {
    navigate('/');
  }
  const goToDebate = () => {
    navigate('/DebateAll');
  }
  const goToOne = () => {
    navigate('/DebateOne');
  }

  return (
    <ul className="navbar">
      <li className="nav-item" onClick = {goToMypage}>
        <img src={ottify} className='nav_logo' alt="Logo"/>
      </li>
      <li className="nav-item" onClick = {goToDebate}>
        <span className='nav_debate'>토론</span>
      </li>
      <li className="nav-item search">
        <input type="text" className = "nav_search" placeholder="콘텐츠를 검색해보세요. (작품명, 태그, 감독, 배우, 유저)" />
        <img src = {search} className='search_icon' alt ="검색"></img>
      </li>
      <li className="nav-item" onClick = {goToOne}>
        <img src={profile} className='nav_profile' alt="User"/>
      </li>
    </ul>
  )
}

export default Nav;