import {useState, useEffect, useRef} from 'react';
import Wonmodal from './Wonmodal';

import close_gray from '../img/close_gray.png';

import {createDiscussionReComment, fetchDiscussionEach} from './WonAPI';

const CommentReplyEditor = ({onCreate, subjectId, commentId}) =>{
  const [forRecomment, setForRecomment] = useState();

  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }

  const [contentArea, setContentArea] = useState("");

  const handleContentChange = (event) => {
    setContentArea(event.target.value);
  };

  //대댓글 작성
  const commentReplyInput = useRef();

  const [state, setState] = useState({
    author: "",
    content: "",
    favorite: "",
    created_date: ""
  })

  const handleChangeState = (e)=>{
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async() => { //저장할 때
    try {
      const replyRecommentCreateDTO = {
        subjectId: subjectId,
        commentId: commentId,
        content: state.content
      };

      const recommentData = await createDiscussionReComment(replyRecommentCreateDTO);
      console.log(recommentData)
      
      const CommentListData = await fetchDiscussionEach(subjectId);
      const testhyun = CommentListData.data.commentListsDTOList;
      const specificComment = testhyun.filter(comment => comment.commentId === replyRecommentCreateDTO.commentId);
      const retesthyun = specificComment[0].replyListsDTOList;
      const lastComment = retesthyun && retesthyun[retesthyun.length - 1];
      console.log(lastComment);
 
      const targetDate = new Date(lastComment.createdAt);
      const currentDate = new Date();
      const timeDiff = currentDate - targetDate;
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      let displayDate;
      if (daysDiff < 30) {
        displayDate = `${daysDiff}일 전`;
      } else if (daysDiff < 365) {
        const monthsDiff = Math.floor(daysDiff / 30);
        displayDate = `${monthsDiff}달 전`;
      } else {
        const yearsDiff = Math.floor(daysDiff / 365);
        displayDate = `${yearsDiff}년 전`;
      }

      setState((prev) => ({
        ...prev,
        author: lastComment.nickName,
        content: lastComment.comment,
        favorite: lastComment.likeCount,
        created_date: displayDate,
      }));

      onCreate(lastComment.nickName, lastComment.content, lastComment.likeCount, displayDate);
      setContentArea("");
    } catch (error) {
      console.log('Error creating comment:', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const CommentListData = await fetchDiscussionEach(subjectId);
        const testhyun = CommentListData.data.commentListsDTOList;
        const specificComment = testhyun.filter(comment => comment.commentId === forRecomment);
        if(specificComment.length > 0){
          const retesthyun = specificComment[0].replyListsDTOList;
          const lastComment = retesthyun && retesthyun[retesthyun.length - 1];

          setState((prev) => ({
            ...prev,
            author: lastComment.nickName,
            content: lastComment.comment,
            favorite: lastComment.likeCount,
            created_date: lastComment.createdAt,
          }));
        }
        
      } catch (error) {
      }
    };

    fetchData(); // 컴포넌트가 처음 마운트될 때 한 번만 데이터를 불러오도록 설정
  }, []);


  return(
    <div>
      <span className='comment_comment' onClick={()=>{openModal(); setForRecomment(commentId)}}>대댓글</span>
      <Wonmodal open={modalOpen} close={closeModal} className="comment_modal">
        <div className='modal_comment_title'>
          <img src = {close_gray} className="modal_close" onClick={closeModal}></img>
          <span className='second_comment'>대댓글 달기</span>
        </div>
        <textarea className='second_textarea' placeholder='자유롭게 생각을 남겨주세요'
                  ref = {commentReplyInput}  name="content"
                  onChange={(e) => {
                    handleChangeState(e);
                    handleContentChange(e);
                  }}></textarea>
        <button className={`second_btn ${contentArea ? 'active' : ''}`} 
                onClick={(e) => {handleSubmit(e); closeModal(e);}}>작성 완료</button>
      </Wonmodal>
    </div>
  )
}

export default CommentReplyEditor;