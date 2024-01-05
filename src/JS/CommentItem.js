import '../CSS/DebateDetail.css';

const CommentItem = ({author, content, favorite, created_date, id}) =>{
  return (
    <div className = "CommentItem">
      <div className = "info">
        <span>{author}</span>
        <span>{content}</span>
        <span>{favorite}</span>
        <span>{created_date}</span>
      </div>
    </div>
  )
}

export default CommentItem;