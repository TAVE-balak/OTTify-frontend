import {useState} from 'react';
import '../CSS/DebateDetail.css';
import Modal from './Modal';

import more from '../img/more.png';
import thumb from '../img/thumb_up.png';
import close_gray from '../img/close_gray.png';


const CommentItem = ({author, content, favorite, profile, created_date, id}) =>{
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
        <span className='comment_comment' onClick={openModal}>대댓글</span>
        <Modal open={modalOpen} close={closeModal} className="comment_modal">
          <div className='modal_comment_title'>
            <img src = {close_gray} className="modal_close" onClick={closeModal}></img>
            <span className='second_comment'>대댓글 달기</span>
          </div>
          <textarea className='second_textarea' placeholder='자유롭게 생각을 남겨주세요'
                    onChange={handleContentChange}></textarea>
          <button className={`second_btn ${contentArea ? 'active' : ''}`}>작성 완료</button>
        </Modal>
      </div>
    </div>
  )
}

export default CommentItem;