import commentreply_img from '../img/second_comment_vector.png';
import more from '../img/more.png';
import thumb from '../img/thumb_up.png';

const CommentReplyItem = ({author, content, favorite, created_date, id}) =>{
  

  return (
    <div className = "CommentReplyItem">
      <img src = {commentreply_img} className='commentreply_img'></img>
      <div className='commentreply_all'>
        <div className='commentreply_info'>
          <span className='commentreply_author'>{author}님</span>
          <div className='commentreply_right'>
            <span className='commentreply_date'>{created_date}</span>
            <img src = {more} className='comment_more'></img>
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