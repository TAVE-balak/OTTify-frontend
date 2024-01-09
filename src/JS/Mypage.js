import { useNavigate } from "react-router-dom";
import {useState} from "react";
import '../App.css';
import '../CSS/Mypage.css'
import GradeGraph from './GradeGraph';
import PickButton from "./PickButton";
import SlidePoster from "./SlidePoster";
import Modal from "./Modal";

import img1 from '../img/사진.jpg';
import badge from '../img/profile_badge.png';
import ott from '../img/netflix.png';
import arrow from '../img/arrow.png';
import star from '../img/star.png';
import poster from '../img/poster.jpg';
import write_review from '../img/write_review.png';
import like_review from '../img/like_review.png';
import my_debate from '../img/my_debate.png';
import par_debate from '../img/par_debate.png';
import change_img from '../img/change_img.png';
import close_gray from '../img/close_gray.png';

const Mypage = () => {
  const navigate = useNavigate();
  const goToOTT = () => {
    navigate('/ChangeOTT');
  }
  const goToWrite = () => {
    navigate('/MyWrite');
  }

  const goToFavorite = () => {
    navigate('/MyFavorite');
  }

  const goToParticipate = () =>{
    navigate('/MyParticipate');
  }

  const goToHost = () =>{
    navigate('/MyHost');
  }

  const reviews = [0.5, 0.5, 1, 1.5, 2, 2, 2.5, 3, 4, 5, 3, 4, 3, 4, 3, 4, 3, 4]
  
  const likeData = [
    {poster: poster},
    {poster: poster},
    {poster: poster},
    {poster: poster},
    {poster: poster},
    {poster: poster},
    {poster: poster},
    {poster: poster},
  ]


  const hateData = [
    {poster: poster},
    {poster: poster},
    {poster: poster},
    {poster: poster},
    {poster: poster},
    {poster: poster},
    {poster: poster},
    {poster: poster},
  ]


  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }

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
              <button className='edit_btn' onClick={openModal}>프로필 변경</button>
              <Modal open={modalOpen} close={closeModal}>
                <img src = {close_gray} className="modal_close" onClick={closeModal}></img>
                <div className="modal_img">
                  <img src = {img1} className="edit_img"></img>
                  <img src = {change_img} className="change_img"></img>
                </div>
                <span className="nickname">닉네임</span>
                <div className="modal_nickname">
                  <input className="nickname_input"></input>
                  <button className="nickname_btn">변경</button>
                </div>
              </Modal>
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

      <div className='my_content'>
        <div className='content_div'>
          <div className='content_subject'>
            <span className='content_mine'>내 취향 장르</span>
            <select className='content_select' name = 'genre_1st'>
              <option selected disabled hidden>1순위 장르</option>
              <option value = "action">액션</option>
              <option value = "thriller">스릴러</option>
              <option value = "musical">뮤지컬</option>
              <option value = "comedy">코미디</option>
            </select>
          </div>

          <div className='content_pick' >
            <PickButton className='pick'>액션</PickButton>
            <PickButton className='pick'>스릴러</PickButton>
            <PickButton className='pick'>서스펜스</PickButton>
            <PickButton className='pick'>미스터리</PickButton>
            <PickButton className='pick'>로맨스</PickButton>
            <PickButton className='pick'>느와르</PickButton>
            <PickButton className='pick'>서부극</PickButton>
            <PickButton className='pick'>음악영화</PickButton>
            <PickButton className='pick'>뮤지컬</PickButton>
            <PickButton className='pick'>다큐멘터리</PickButton>
            <PickButton className='pick'>모큐멘터리</PickButton>
            <PickButton className='pick'>재난</PickButton>
            <PickButton className='pick'>블록버스터</PickButton>
            <PickButton className='pick'>스펙타클</PickButton>
            <PickButton className='pick'>시리즈</PickButton>
            <PickButton className='pick'>서사극</PickButton>
            <PickButton className='pick'>로맨틱코미디</PickButton>
            <PickButton className='pick'>코미디</PickButton>
            <PickButton className='pick'>음악영화</PickButton>
            <PickButton className='pick'>B급</PickButton>
            <PickButton className='pick'>모험</PickButton>
            <PickButton className='pick'>가족</PickButton>
          </div>

          <div className='content_like'>
            <span className='like_title'>보고싶어요</span>
            <div className='like_posters'>
              <SlidePoster data = {likeData} type = "favorite"/>
            </div>
          </div>

          <div className='content_hate'>
            <span className='hate_title'>관심없어요</span>
            <div className='hate_posters'>
              <SlidePoster data = {hateData} type = "hate"/>
            </div>
          </div>
        </div>
      </div>

      <div className='my_review'>
        <div className='write_review' onClick={goToWrite}>
          <img src = {write_review} className='write_img'></img>
          <a className='write_text'>작성 리뷰 모아보기</a>
        </div>
        <div className='like_review' onClick={goToFavorite}>
          <img src = {like_review} className='like_img'></img>
          <a className='like_text'>좋아요한 리뷰 모아보기</a>
        </div>
        <div className='my_debate' onClick={goToHost}>
          <img src = {my_debate} className='my_img'></img>
          <a className='my_text'>내가 주최한 토론 모아보기</a>
        </div>
        <div className='par_debate' onClick = {goToParticipate}>
          <img src = {par_debate} className='par_img'></img>
          <a className='par_text'>내가 참여한 토론 모아보기</a>
        </div>
      </div>

      <div className='my_out'>
        <a className='log_out'>로그아웃</a>
      </div>
    </div>
  )
}

export default Mypage;