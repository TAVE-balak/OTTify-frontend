import {useRef, useCallback, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import '../CSS/MyDebate.css';
import '../CSS/DebateDetail.css';
import DetailList from './DetailList';

import back from '../img/back.png';
import CommentList from './CommentList';
import CommentEditor from './CommentEditor';

const DebateDetail = () =>{
  const navigate = useNavigate();  

  const [comment, setComment] = useState([]); //일기 데이터 빈 배열로 시작

  const commentId = useRef(0)

  const onCreate = (author, content, favorite, profile, created_date) =>{
    const newItem = {
      author,
      content,
      favorite,
      profile,
      created_date,
      id: commentId.current
    }

    commentId.current += 1;
    setComment([newItem, ...comment]); //newItem 뒤에 comment 붙이기
  }

  return (
    <div className='DebateDetail'>
      <div className = "debatedetail_page">
        <div className = "debatedetail_title">
          <img src = {back} id="debateCommentTextarea" className = "debatedetail_back" alt = "뒤로 가기" onClick={() => navigate(-1)}/>
          <h2>토론 상세 보기</h2>
        </div>
        
        <div className='debatedetail_Main'>
          <DetailList/>
        </div>


        <div className='comments'>
          <CommentEditor onCreate = {onCreate}/>
          <CommentList commentList = {comment}/>
        </div>
        
      </div>
    </div>
  )
}

export default DebateDetail;