import {useRef, useCallback, useState} from 'react';
import '../CSS/DebateDetail.css';

import CommentList from './CommentList';

const CommentEditor = ({onCreate})=>{
  const commentInput = useRef();
  const handleResizeHeight = useCallback(() => {
    commentInput.current.style.height = commentInput.current.scrollHeight + "px";
  }, []);


  const [state, setState] = useState({
    author: "김영리",
    content: "",
    created_date: "3달 전"
  })

  const handleChangeState = (e)=>{
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => { // 저장할 때
    if(state.content.length < 1){
      commentInput.current.focus();
      return;
    }
    onCreate(state.author, state.content, state.created_date); //onCreate 함수 호출
    setState({ //저장 후 리셋
      author: "김영리",
      content: "",
      created_date: "3달 전"
    })
  }
  

  return(
    <div className='commentEditor'>
      <div className='debatedetail_comment'>
        <textarea ref = {commentInput} name="content" value = {state.content}
                  className='debate_comment' name = "content" placeholder='댓글을 작성해주세요' 
                  onInput = {handleResizeHeight} onChange = {handleChangeState}
        ></textarea>
        <button className='comment_enroll' onClick={handleSubmit}>등록</button>
      </div>

      <div className='wrap-comment'>
        <CommentList/>
      </div>
    </div>
  )
}

export default CommentEditor;