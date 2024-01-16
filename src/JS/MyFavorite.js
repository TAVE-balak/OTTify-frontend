import { useNavigate, useParams } from "react-router-dom";
import {useEffect, useState} from 'react';
import WonReviewList from './WonReviewList';
import { fetchMyFavorite } from "./WonAPI";
import '../CSS/MyCollect.css'

import back from '../img/back.png';
import img1 from '../img/사진.jpg';

const MyFavorite = () =>{
  const {userId} = useParams();
  const [myFavoriteData, setMyFavoriteData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let storedMyFavorite = sessionStorage.getItem(`myFavoriteData_${userId}`);
        let MyReviewFavoriteData;

        if (storedMyFavorite) {
          // 세션 스토리지에 사용자 정보가 있으면 가져오기
          MyReviewFavoriteData = JSON.parse(storedMyFavorite);
        } else {
          // 세션 스토리지에 사용자 정보가 없으면 API 호출하여 가져오기
          MyReviewFavoriteData = await fetchMyFavorite(userId);
          // 가져온 정보를 세션 스토리지에 저장
          sessionStorage.setItem(`myFavoriteData_${userId}`, JSON.stringify(MyReviewFavoriteData));
        }
        setMyFavoriteData(MyReviewFavoriteData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const dummyList = myFavoriteData ? myFavoriteData.data.map(item => {
    const tagList = item.reviewTags.map(tag => tag.name);

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
      id: item.reviewId,
      author: item.userNickName,
      profileimg: item.userProfilePhoto,
      movie: item.programTitle,
      tagList: tagList,
      content: item.content,
      evaluation: item.reviewRating,
      created_date: displayDate,
      favorite: item.likeCnt,
    };
  }) : [];


  return (
    <div className='MyFavorite'>
      <div className = "myfavorite_page">
        <div className = "myfavorite_title">
          <img src = {back} className = "myfavorite_back" alt = "뒤로 가기" onClick={() => navigate(-1)}/>
          <h2>좋아요한 리뷰</h2>
        </div>
        <WonReviewList reviewList={dummyList}/>
      </div>
    </div>
  )
}

export default MyFavorite;