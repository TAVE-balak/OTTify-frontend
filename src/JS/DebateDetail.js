import {useRef, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';

import '../CSS/MyDebate.css';
import '../CSS/DebateDetail.css';
import DetailList from './DetailList';

import back from '../img/back.png';

const DebateDetail = () =>{
  const navigate = useNavigate();

  const textRef = useRef();
  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);
  

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

        <div className='debatedetail_comment'>
          <textarea ref = {textRef} className='debate_comment' placeholder='댓글을 작성해주세요' onInput = {handleResizeHeight}></textarea>
          <button className='comment_enroll'>등록</button>
        </div>
      </div>
    </div>
  )
}

export default DebateDetail;