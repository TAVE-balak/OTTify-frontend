import CommentItem from './CommentItem';

const CommentList = ({commentList}) => {
  return (
    <div>
      {commentList.map((it)=>(  //각각의 요소
        <CommentItem key = {it.id} {...it} /> 
      ))}
    </div>
  );
};

CommentList.defaultProps = {  //undefined로 전달받을 수 있는 것의 기본값 설정
  commentList: []
};

export default CommentList;