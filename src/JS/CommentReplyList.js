import CommentReplyItem from './CommentReplyItem';

const CommentReplyList = ({commentReplyList}) =>{
  return (
    <div className='CommentReplyListAll'>
      {commentReplyList.slice(0).reverse().map((it)=>(  //각각의 요소
        <CommentReplyItem key = {it.id} {...it} /> 
      ))}
    </div>
  );
}

CommentReplyList.defaultProps = {  //undefined로 전달받을 수 있는 것의 기본값 설정
  commentReplyList: []
};

export default CommentReplyList;