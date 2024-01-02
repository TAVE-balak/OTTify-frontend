import '../App.css';
import '../CSS/ChangeOTT.css'
import netflix_word from '../img/netflix_word.png';
import watcha from '../img/watcha.png';
import wavve from '../img/wavve.png';
import coupang_play from '../img/coupang_play.png';
import tving from '../img/tving.png';
import apple_tv from '../img/apple_tv.png';
import disney from '../img/disney.png';
import laftel from '../img/laftel.png';
import prime_video from '../img/prime_video.png';
import series_on from '../img/series_on.png';
import google_play from '../img/google_play.png';
import u_plus from '../img/u_plus.png';
import close_gray from '../img/close_gray.png';

const ChangeOTT = () => {
  return (
    <div className="change_ott">
      <div className="ott_title">
        <h1>구독 중인 <span>OTT</span>를 선택해주세요</h1>
      </div>
      <div className = "choose_ott">
         <div className = "ott_pick_logo">
          <img src = {netflix_word} className='logo_img'></img>
          <span className='logo_name'>넷플릭스</span>
         </div>
         <div className = "ott_pick_logo">
          <img src = {watcha} className='logo_img'></img>
          <span className='logo_name'>왓챠</span>
         </div>
         <div className = "ott_pick_logo">
          <img src = {disney} className='logo_img'></img>
          <span className='logo_name'>디즈니+</span>
         </div>
         <div className = "ott_pick_logo">
          <img src = {tving} className='logo_img'></img>
          <span className='logo_name'>티빙</span>
         </div>
         <div className = "ott_pick_logo">
          <img src = {wavve} className='logo_img'></img>
          <span className='logo_name'>웨이브</span>
         </div>
         <div className = "ott_pick_logo">
          <img src = {coupang_play} className='logo_img'></img>
          <span className='logo_name'>쿠팡플레이</span>
         </div>
         <div className = "ott_pick_logo">
          <img src = {laftel} className='logo_img'></img>
          <span className='logo_name'>라프텔</span>
         </div>
         <div className = "ott_pick_logo">
          <img src = {apple_tv} className='logo_img'></img>
          <span className='logo_name'>Apple TV</span>
         </div>
         <div className = "ott_pick_logo">
          <img src = {prime_video} className='logo_img'></img>
          <span className='logo_name'>아마존 프라임 비디오</span>
         </div>
         <div className = "ott_pick_logo">
          <img src = {google_play} className='logo_img'></img>
          <span className='logo_name'>Google Play 무비</span>
         </div>
         <div className = "ott_pick_logo">
          <img src = {u_plus} className='logo_img'></img>
          <span className='logo_name'>U+ TV</span>
         </div>
         <div className = "ott_pick_logo">
          <img src = {series_on} className='logo_img'></img>
          <span className='logo_name'>네이버 시리즈온</span>
         </div>
      </div>

      <button className='all_delete'>
        <img src = {close_gray} className='delete_close'></img>
        <span className='delete_word'>전체 취소하기</span>
      </button>

      <button className='apply_button'>
        적용
      </button>

    </div>
  )

}

export default ChangeOTT;