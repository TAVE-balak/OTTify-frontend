import {useState, useRef} from 'react';
import '../CSS/DebateDetail.css';
import CommentReplyList from './CommentReplyList';

import more from '../img/more.png';
import thumb from '../img/thumb_up.png';
import CommentReplyEditor from './CommentReplyEditor';


const CommentItem = ({onDelete, author, content, favorite, profile, created_date, id}) =>{
  
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
                <div className='menu_edit'>댓글 수정</div>
                <div className='menu_delete' 
                    onClick={() =>{
                      if(window.confirm("댓글을 삭제하시겠습니까?")){
                        onDelete(id);
                      }
                    }}>
                  댓글 삭제</div>
              </div>
            )}
        </div>
      </div>

      <div className = "comments_content">
        <span className ="content_value">{content}</span>
      </div>

      <div className='comments_reaction'>
        <img src = {thumb} className='comment_thumb'></img>
        <span className='commentThumbNum'>{favorite}</span>
        <CommentReplyEditor onCreate = {onCreate}/>
      </div>

      <div className='CommentReplyList'>
        <CommentReplyList onDelete = {onDeleteReply} commentReplyList = {commentreply}/>
        
      </div>
    </div>
  )
}

export default CommentItem;