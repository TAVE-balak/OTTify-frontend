const CommentItem = ({author, content, created_date, id}) =>{
  return (
    <div className = "CommentItem">
      <div className = "info">
        <span>{author}</span>
        <span>{content}</span>
        <span>{created_date}</span>
      </div>
    </div>
  )
}

export default CommentItem;