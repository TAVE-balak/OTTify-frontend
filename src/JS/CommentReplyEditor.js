import {useState, useRef} from 'react';
import Modal from './Modal';

import close_gray from '../img/close_gray.png';

const CommentReplyEditor = ({onCreate}) =>{

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
    author: "김영리",
    content: "",
    favorite: "120",
    created_date: "3달 전"
  })

  const handleChangeState = (e)=>{
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => { //저장할 때
    onCreate(state.author, state.content, state.favorite, state.created_date); //onCreate 함수 호출
    setState({ //저장 후 리셋
      author: "김영리",
      content: "",
      favorite: "120",
      created_date: "3달 전"
    })
  }

  return(
    <div>
      <span className='comment_comment' onClick={openModal}>대댓글</span>
      <Modal open={modalOpen} close={closeModal} className="comment_modal">
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
      </Modal>
    </div>
  )
}

export default CommentReplyEditor;