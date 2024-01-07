import {useState} from 'react';
import commentreply_img from '../img/second_comment_vector.png';
import more from '../img/more.png';
import thumb from '../img/thumb_up.png';

const CommentReplyItem = ({author, content, favorite, created_date, id}) =>{
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className = "CommentReplyItem">
      <img src = {commentreply_img} className='commentreply_img'></img>
      <div className='commentreply_all'>
        <div className='commentreply_info'>
          <span className='commentreply_author'>{author}님</span>
          <div className='commentreply_right'>
            <span className='commentreply_date'>{created_date}</span>
            <img src = {more} className='comment_more' onClick={handleMenuClick}></img>
            {isMenuOpen && (
              <div className='menu_list'>
                <div className='menu_edit'>댓글 수정</div>
                <div className='menu_delete'>댓글 삭제</div>
              </div>
            )}
          </div>
        </div>

        <div className='commentreply_content'>
          {content}
        </div>

        <div className='commentreply_reaction'>
          <img src = {thumb} className='comment_thumb'></img>
          <span className='commentreply_favoriteNum'>{favorite}</span>
        </div>
      </div>

    </div>
  )
}

export default CommentReplyItem;