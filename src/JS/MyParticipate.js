import { useNavigate, useParams } from "react-router-dom";
import {useEffect, useState} from 'react';
import DebateList from './DebateList';
import { fetchMyParticipate } from "./WonAPI";
import '../CSS/MyDebate.css'

import back from '../img/back.png';
import poster from '../img/debate_poster.png';

const MyParticipate = () =>{
  const {userId} = useParams();
  const [myFavoriteData, setMyFavoriteData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let storedMyFavorite = sessionStorage.getItem(`myFavoriteData_${userId}`);
        let MyDiscussionFavoriteData;

        if (storedMyFavorite) {
          // 세션 스토리지에 사용자 정보가 있으면 가져오기
          MyDiscussionFavoriteData = JSON.parse(storedMyFavorite);
        } else {
          // 세션 스토리지에 사용자 정보가 없으면 API 호출하여 가져오기
          MyDiscussionFavoriteData = await fetchMyParticipate(userId);
          // 가져온 정보를 세션 스토리지에 저장
          sessionStorage.setItem(`myFavoriteData_${userId}`, JSON.stringify(MyDiscussionFavoriteData));
        }
        setMyFavoriteData(MyDiscussionFavoriteData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const dummyList = myFavoriteData ? myFavoriteData.data.map(item => {
    const targetDate = new Date(item.createdDate);
    const currentDate = new Date();
    const timeDiff = currentDate - targetDate;
    // 밀리초를 일로 변환
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
    let displayDate;
    if (daysDiff < 30) {
      displayDate = `${daysDiff}일 전`;
    } else if (daysDiff < 365) {
      const monthsDiff = Math.floor(daysDiff / 30);
      displayDate = `${monthsDiff}달 전`;
    } else {
      const yearsDiff = Math.floor(daysDiff / 365);
      displayDate = `${yearsDiff}년 전`;
    }
  
    return {
      id: item.discussonId,
      movie: item.programTitle,
      poster: item.imgUrl || "",
      debateTitle: item.discussionTitle,
      content: item.content,
      created_date: displayDate,
      favorite: item.likeCnt,
      comment: item.replyCnt
    };
  }) : [];


  return (
    <div className='MyParticipate'>
      <div className = "myparticipate_page">
        <div className = "myparticipate_title">
          <img src = {back} className = "myparticipate_back" alt = "뒤로 가기" onClick={() => navigate(-1)}/>
          <h2>내가 참여한 토론 보기</h2>
        </div>
        <DebateList debateList={dummyList}/>
      </div>
    </div>
  )
}

export default MyParticipate;