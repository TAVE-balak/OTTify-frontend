const CommentReplyItem = ({author, content, favorite, created_date, id}) =>{
  

  return (
    <div className = "CommentReplyItem">
      <div>{author}</div>
      <div>{content}</div>
      <div>{favorite}</div>
      <div>{created_date}</div>

    </div>
  )
}

export default CommentReplyItem;