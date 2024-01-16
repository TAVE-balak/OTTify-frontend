import { useNavigate, useParams } from "react-router-dom";
import {useEffect, useState} from 'react';
import WonReviewList from './WonReviewList';
import { fetchMyWrite } from "./WonAPI";
import '../CSS/MyCollect.css'

import back from '../img/back.png';
import img1 from '../img/사진.jpg';

const MyWrite = () =>{
  const {userId} = useParams();
  const [myWriteData, setMyWriteData] = useState(null);
  const navigate = useNavigate();
  console.log("test");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let storedMyWrite = sessionStorage.getItem(`myWriteData_${userId}`);
        let MyReviewData;

        if (storedMyWrite) {
          // 세션 스토리지에 사용자 정보가 있으면 가져오기
          MyReviewData = JSON.parse(storedMyWrite);
        } else {
          // 세션 스토리지에 사용자 정보가 없으면 API 호출하여 가져오기
          MyReviewData = await fetchMyWrite(userId);
          // 가져온 정보를 세션 스토리지에 저장
          sessionStorage.setItem(`myWriteData_${userId}`, JSON.stringify(MyReviewData));
        }
        setMyWriteData(MyReviewData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    if (userId) {
      fetchData();
    }
  }, [userId]);

  //내가 쓴 리뷰 list
  const dummyList = myWriteData ? myWriteData.data.map(item => {
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
    <div className='MyWrite'>
      <div className = "mywrite_page">
        <div className = "mywrite_title">
          <img src = {back} className = "mywrite_back" alt = "뒤로 가기" onClick={() => navigate(-1)}/>
          <h2>내가 쓴 리뷰</h2>
        </div>
        <WonReviewList reviewList={dummyList}/>
      </div>
    </div>
  )
}

export default MyWrite;