import { useNavigate, useParams } from "react-router-dom";
import {useEffect, useState} from 'react';
import DebateList from './DebateList';
import { fetchMyHost } from "./WonAPI";
import '../CSS/MyDebate.css'

import back from '../img/back.png';
import poster from '../img/debate_poster.png';

const MyHost = () =>{
  const {userId} = useParams();
  const [myHostData, setMyHostData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let storedMyHost = sessionStorage.getItem(`myHostData_${userId}`);
        let MyDiscussionHostData;

        if (storedMyHost) {
          // 세션 스토리지에 사용자 정보가 있으면 가져오기
          MyDiscussionHostData = JSON.parse(storedMyHost);
        } else {
          // 세션 스토리지에 사용자 정보가 없으면 API 호출하여 가져오기
          MyDiscussionHostData = await fetchMyHost(userId);
          // 가져온 정보를 세션 스토리지에 저장
          sessionStorage.setItem(`myHostData_${userId}`, JSON.stringify(MyDiscussionHostData));
        }
        setMyHostData(MyDiscussionHostData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    if (userId) {
      fetchData();
    }
  }, [userId]);


  const dummyList = myHostData ? myHostData.data.map(item => {
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

//   const dummyList = [
//   {
//     id: 1,
//     author: "김영리", 
//     movie: "나폴레옹",
//     poster: "",
//     debateTitle: "서울의 봄은 최고의 영화이다",
//     content: "봉준호 영화 중에서 가장 음침하고 불편한 영화인 것 같다. <마더>에 가득 찬 오해들은 풀리지 못 한다. 오해를 오해로 해결하더니 끝내는 엉뚱한 사람이 갇힌다. 이 영화에서 해결된 것은 없다. 잊으려 애를 쓸 뿐이다. 하지만 그것도 불안하기 짝이 없어 보인다. 가나다라마바사 아자차카파타하.",
//     created_date: "3달 전",
//     favorite: 120,
//     comment: 4,
//   }, 

//   {
//     id: 2,
//     author: "김영리", 
//     movie: "나폴레옹",
//     poster: {poster},
//     debateTitle: "서울의 봄은 최고의 영화이다",
//     content: "",
//     created_date: "3달 전",
//     favorite: 120,
//     comment: 4,
//   }, 

//   {
//     id: 3,
//     author: "김영리", 
//     movie: "나폴레옹",
//     poster: {poster},
//     debateTitle: "서울의 봄은 최고의 영화이다",
//     content: "봉준호 영화 중에서 가장 음침하고 불편한 영화인 것 같다. <마더>에 가득 찬 오해들은 풀리지 못 한다. 오해를 오해로 해결하더니 끝내는 엉뚱한 사람이 갇힌다. 이 영화에서 해결된 것은 없다. 잊으려 애를 쓸 뿐이다. 하지만 그것도 불안하기 짝이 없어 보인다. 가나다라마바사 아자차카파타하.",
//     created_date: "3달 전",
//     favorite: 120,
//     comment: 4,
//   }
// ]


  return (
    <div className='MyHost'>
      <div className = "myhost_page">
        <div className = "myhost_title">
          <img src = {back} className = "myhost_back" alt = "뒤로 가기" onClick={() => navigate(-1)}/>
          <h2>내가 주최한 토론 보기</h2>
        </div>
        <DebateList debateList={dummyList}/>
      </div>
    </div>
  )
}

export default MyHost;