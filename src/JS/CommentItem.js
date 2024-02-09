import {useState, useEffect, useRef} from 'react';
import {useLocation} from 'react-router-dom'
import '../CSS/DebateDetail.css';
import CommentReplyList from './CommentReplyList';

import { deleteDiscussionComment, editDiscussionComment, fetchDiscussionEach } from './WonAPI';

import more from '../img/more.png';
import thumb from '../img/thumb_up.png';
import CommentReplyEditor from './CommentReplyEditor';


const CommentItem = ({onEditComment, onDelete, author, content, favorite, profile, created_date, id, subjectId}) =>{
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //대댓글
  const [commentreply, setCommentReply] = useState([]); //일기 데이터 빈 배열로 시작

  const commentReplyId = useRef(0)

  const onCreate = (author, content, favorite, created_date) =>{
    const newItem = {
      author,
      content,
      favorite,
      created_date,
      id: commentReplyId.current
    }

    commentReplyId.current += 1;
    setCommentReply([newItem, ...commentreply]);
  }

  const onDeleteReply = (targetId) =>{
    const newCommentReplyList = commentreply.filter((it)=>it.id !== targetId); //삭제한 값은 안 보이게 filter 사용 
    setCommentReply(newCommentReplyList);
  };

  //대댓글 수정
  const onEdit = (targetId, newContent) => {  //수정대상, 수정내용
    setCommentReply(  
      commentreply.map((it) =>  //모든 요소들이 id끼리 일치하는지 확인 
      it.id === targetId ? {...it, content: newContent} : it) //일치하면 원본대상 + 내용수정함 / 아니면 원본대상
    )
  }

  //댓글 수정
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit); //false & true 계속 변경됨

  const [localContent, setLocalContent] = useState(content);

  const localContentInput = useRef();

  const handleQuitEdit = () =>{
    setIsEdit(false);
    setLocalContent(content);
  }

  const handleEdit = async() =>{
    if(localContent.length < 5){
      localContentInput.current.focus();
      return;
    }

    if(window.confirm("수정하시겠습니까?")){
      try{
        const replyCommentEditDTO = {
          subjectId: subjectId,
          commentId: id,
          comment: localContent
        };
        const editCommentData = await editDiscussionComment(replyCommentEditDTO);
        console.log(editCommentData)
        onEditComment(id, localContent);
        toggleIsEdit();
      }catch(error){
        console.log('Error editing comment:', error)
      }
    }
  }

  //댓글 삭제 api 연결
  const deleteComment = async() =>{
    deleteDiscussionComment(subjectId, id);
    onDelete(id)
  }

  //대댓글 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentData = await fetchDiscussionEach(1);
        const commentLists = commentData.data.commentListsDTOList;
        // commentId와 일치하는 comment을 찾음
        const targetComment = commentLists.find(comment => comment.commentId === id);
        if (targetComment && targetComment.replyListsDTOList) {
          const replyLists = targetComment.replyListsDTOList;
          console.log(replyLists)
          
          const updatedCommentReply = replyLists.map(reply => {
            const targetDate = new Date(reply.createdAt);
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
              id: reply.recommentId,
              author: reply.nickName,
              content: reply.content,
              favorite: reply.likeCount,
              created_date: displayDate,
            };
          });

          setCommentReply(updatedCommentReply);
          // replyLists를 사용하여 작업을 수행할 수 있음
        }

      } catch (error) {
        console.error('Error fetching discussion data:', error);
      }
    };

    fetchData();
  }, []);

  // const recommentList = [
  //   {
  //     author: "나",
  //     content: "내용",
  //     favorite: 120,
  //     created_date: "1달 전",
  //     id: 300
  //   }
  // ]

  return (
    <div className = "CommentItem">
      <div className = "comments_info">
        <div>
          <img src = {profile} className="comment_profile"></img>
          <span className="comment_author">{author}님</span>
        </div>
        <div>
          <span className="comment_date">{created_date}</span>
          <img src = {more} className ="comment_more" onClick={handleMenuClick}></img>
            {isMenuOpen && (
              <div className='menu_list'>
                <div className='menu_edit' 
                    onClick={toggleIsEdit}>
                    댓글 수정</div>
                <div className='menu_delete' 
                    onClick={() =>{
                      if(window.confirm("댓글을 삭제하시겠습니까?")){
                        deleteComment()
                      }
                    }}>
                  댓글 삭제</div>
              </div>
            )}
        </div>
      </div>

      <div className = "comments_content">
        <div className ="content_value">
          {isEdit ? 
          (<>
            <textarea ref = {localContentInput} value = {localContent} 
                      className='content_value_textarea'
                      onChange = {(e) => setLocalContent(e.target.value)}/>
          </>) : 
          (<>{content}</>)}
        </div>

        <div className='content_value_btn'>
          {isEdit ? 
          (<>
            <button onClick={(e)=>{handleQuitEdit(e); handleMenuClick(e)}}>수정 취소</button>
            <button onClick={(e)=>{handleEdit(e); handleMenuClick(e)}}>수정 완료</button>
          </>) : 
          (<>
          </>)}
        </div>
      </div>

      <div className='comments_reaction'>
        <img src = {thumb} className='comment_thumb'></img>
        <span className='commentThumbNum'>{favorite}</span>
        <CommentReplyEditor onCreate = {onCreate}/>
      </div>

      <div className='CommentReplyList'>
        <CommentReplyList onEdit = {onEdit} onDelete = {onDeleteReply} commentReplyList = {commentreply}/>
        
      </div>
    </div>
  )
}

export default CommentItem;