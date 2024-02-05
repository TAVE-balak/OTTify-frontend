import CommentItem from './CommentItem';

const CommentList = ({onEditComment, onDelete, commentList, subjectId }) => {
  return (
    <div className='CommentListAll'>
      {commentList.slice(0).reverse().map((comment)=>(  //각각의 요소 
        <CommentItem key = {comment.id} {...comment} 
                    onEditComment = {onEditComment} 
                    onDelete={onDelete} 
                    subjectId ={subjectId}/> 
      ))}
    </div>
  );
};

CommentList.defaultProps = {  //undefined로 전달받을 수 있는 것의 기본값 설정
  commentList: []
};

export default CommentList;