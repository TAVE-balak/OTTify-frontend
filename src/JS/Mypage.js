import { useNavigate } from "react-router-dom";
import '../App.css';
import '../CSS/Mypage.css'
import GradeGraph from './GradeGraph';
import img1 from '../img/사진.jpg';
import badge from '../img/profile_badge.png';
import ott from '../img/netflix.png';
import arrow from '../img/arrow.png';
import star from '../img/star.png';


const Mypage = () => {
  const navigate = useNavigate();
  const goToOTT = () => {
    navigate('/ChangeOTT');
  }
  
  const reviews = [0.5, 0.5, 1, 1.5, 2, 2, 2.5, 3, 4, 5]

  return (
    <div className = "Mypage">
      <div className = "my_profile">
        <img src = {img1} className = "profile_img"alt = "profile"></img>
        <div className='profile_bottom'>
          <div className = "profile_info">
            <div className='info_nickname'>
              <span className='name'>이임생</span>
              <img src = {badge} className='badge'></img>
            </div>
            <div className='info_email'>
              <span className='email'>leeeeemmmsanngg@naver.com</span>
            </div>
            <div className='info_edit'>
              <button className='edit_btn'>프로필 변경</button>
            </div>
          </div>

          <div className = "profile_ott">
            <div className='ott_subject'>
              <span className='ott_mine'>구독 중인 OTT</span>
            </div>
            <div className='ott_imgs'>
              <img src = {ott} className='ott_logo'></img>
              <img src = {ott} className='ott_logo'></img>
              <img src = {ott} className='ott_logo'></img>
              <img src = {arrow} className='arrow' onClick={goToOTT} alt = "화면 전환 화살표"></img>
            </div>
          </div>

          <div className='profile_grade'>
            <div className='grade_subject'>
              <span className='grade_mine'>내 리뷰 평균 평점</span>
              <div className='grade_num'>
                <img src = {star} className='grade_star'></img>
                <span className='grade_point'>3.75/5</span>
              </div>
            </div>
            <div className='grade_graph'>
              <GradeGraph reviews = {reviews}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mypage;