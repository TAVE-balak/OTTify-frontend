import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import DebateList from './DebateList';
import '../CSS/MyDebate.css';

import { fetchTotalDiscussion } from "./WonAPI";

import back from '../img/back.png';

const DebateAll = () =>{
  const navigate = useNavigate();
  const [totalData, setTotalData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let storedTotal = sessionStorage.getItem(`totalData`);
        let discussionTotalData;

        if (storedTotal) {
          // 세션 스토리지에 사용자 정보가 있으면 가져오기
          discussionTotalData = JSON.parse(storedTotal);
        } else {
          // 세션 스토리지에 사용자 정보가 없으면 API 호출하여 가져오기
          discussionTotalData = await fetchTotalDiscussion();
          // 가져온 정보를 세션 스토리지에 저장
          sessionStorage.setItem(`totalData`, JSON.stringify(discussionTotalData));
        }
        setTotalData(discussionTotalData);
      } catch (error) {
        console.error('Error fetching Discussion Total:', error);
      }
    };
    fetchData();
  }, []);

  
  const dummyList = totalData ? totalData.data.list.map(item => {
    const targetDate = new Date(item.createdAt);
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
      id: item.subjectId,
      movie: item.programName,
      poster: item.imageUrl || "",
      debateTitle: item.title,
      content: item.content,
      created_date: displayDate,
      favorite: item.likeCount,
      comment: item.commentCount
    };
  }) : [];


  return (
    <div className='DebateAll'>
      <div className = "debateall_page">
        <div className = "debateall_title">
          <img src = {back} className = "debateall_back" alt = "뒤로 가기" onClick={() => navigate(-1)}/>
          <h2>전체 토론 보기</h2>
        </div>
        <DebateList debateList={dummyList}/>
      </div>
    </div>
  )
}

export default DebateAll;