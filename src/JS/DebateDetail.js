import {useRef, useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import '../CSS/MyDebate.css';
import '../CSS/DebateDetail.css';
import DetailList from './DetailList';

import back from '../img/back.png';
import CommentList from './CommentList';
import CommentEditor from './CommentEditor';

import { fetchDiscussionEach } from './WonAPI';

const DebateDetail = () =>{
  const navigate = useNavigate();  
  const location = useLocation();
  const debateItem = location.state?.debateItem;

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

  const onDelete = (targetId) =>{
    const newCommentList = comment.filter((it)=>it.id !== targetId); //삭제한 값은 안 보이게 filter 사용 
    setComment(newCommentList);
  };

  //댓글 수정
  const onEditComment = (targetId, newContent) => {  //수정대상, 수정내용
    setComment(  
      comment.map((it) =>  //모든 요소들이 id끼리 일치하는지 확인 
      it.id === targetId ? {...it, content: newContent} : it) //일치하면 원본대상 + 내용수정함 / 아니면 원본대상
    )
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectId = debateItem.id; // 변경 필요
        const discussionData = await fetchDiscussionEach(subjectId);

        const transformedData = discussionData.data.commentListsDTOList.map(comment => {
          const targetDate = new Date(comment.createdAt);
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
            id: comment.commentId,
            author: comment.nickName,
            content: comment.content,
            favorite: comment.likeCount,
            profile: comment.profileUrl,
            created_date: displayDate,
          };
        });
  
        const sortedData = transformedData.slice(0).sort((a, b) => b.id - a.id);
        setComment(sortedData);

      } catch (error) {
        console.error('Error fetching discussion data:', error);
      }
    };

    fetchData();
  }, [debateItem]);


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
          <CommentEditor onCreate = {onCreate} subjectId={debateItem.id}/>
          <CommentList onEditComment = {onEditComment} onDelete={onDelete} commentList = {comment} subjectId={debateItem.id}/>
        </div>
        
      </div>
    </div>
  )
}

export default DebateDetail;