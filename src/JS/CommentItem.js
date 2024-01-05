import '../CSS/DebateDetail.css';
import more from '../img/more.png';
import thumb from '../img/thumb_up.png';


const CommentItem = ({author, content, favorite, profile, created_date, id}) =>{
  return (
    <div className = "CommentItem">
      <div className = "comments_info">
        <div>
          <img src = {profile} className="comment_profile"></img>
          <span className="comment_author">{author}님</span>
        </div>
        <div>
          <span className="comment_date">{created_date}</span>
          <img src = {more} className ="comment_more"></img>
        </div>
      </div>

      <div className = "comments_content">
        <span className ="content_value">{content}</span>
      </div>

      <div className='comments_reaction'>
        <img src = {thumb} className='comment_thumb'></img>
        <span className='commentThumbNum'>{favorite}</span>
        <span className='comment_comment'>대댓글</span>
      </div>
    </div>
  )
}

export default CommentItem;