import {useState, useRef} from 'react';
import Wonmodal from './Wonmodal';
import '../CSS/Wonmodal.css';
import '../CSS/DebateDetail.css';

import commentreply_img from '../img/second_comment_vector.png';
import more from '../img/more.png';
import thumb from '../img/thumb_up.png';
import close_gray from '../img/close_gray.png';

const CommentReplyItem = ({onEdit, onDelete, author, content, favorite, created_date, id}) =>{
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //모달
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }

  //대댓글 수정
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit); //false & true 계속 변경됨

  const [localContent, setLocalContent] = useState(content);

  const localContentInput = useRef();

  const handleQuitEdit = () =>{
    setIsEdit(false);
    setLocalContent(content);
  }

  const handleEdit = () =>{
    if(localContent.length < 5){
      localContentInput.current.focus();
      return;
    }

    if(window.confirm("댓글을 수정하시겠습니까?")){
      onEdit(id, localContent);
      toggleIsEdit();
    }
  }

  return (
    <div className = "CommentReplyItem">
      <img src = {commentreply_img} className='commentreply_img'></img>
      <div className='commentreply_all'>
        <div className='commentreply_info'>
          <span className='commentreply_author'>{author}님</span>
          <div className='commentreply_right'>
            <span className='commentreply_date'>{created_date}</span>
            <img src = {more} className='comment_more' onClick={handleMenuClick}></img>
            {isMenuOpen && (
              <div className='menu_list'>
                <div className='menu_edit' onClick={(e)=>{openModal(e); toggleIsEdit(e)}}>댓글 수정</div>
                <Wonmodal open={modalOpen} close={closeModal} className="comment_modal">
                  <div className='modal_comment_title'>
                    <img src = {close_gray} className="modal_close" onClick={(e)=>{handleQuitEdit(e); closeModal(e);}}></img>
                    <span className='second_comment'>대댓글 수정</span>
                  </div>
                  <textarea className='second_textarea' placeholder='자유롭게 생각을 남겨주세요'
                             name="content" ref = {localContentInput} value={localContent}
                             onChange = {(e) => setLocalContent(e.target.value)}></textarea>
                  <button className="second_btn active"
                          onClick={(e) => {
                            handleEdit(e);
                            closeModal(e);
                            handleMenuClick(e);
                          }}>수정 완료</button>
                </Wonmodal>
                <div className='menu_delete'
                      onClick={()=>{
                        if(window.confirm("댓글을 삭제하시겠습니까?")){
                          onDelete(id);
                        }
                      }}>댓글 삭제</div>
              </div>
            )}
          </div>
        </div>

        <div className='commentreply_content'>
          {content}
        </div>

        <div className='commentreply_reaction'>
          <img src = {thumb} className='comment_thumb'></img>
          <span className='commentreply_favoriteNum'>{favorite}</span>
        </div>
      </div>

    </div>
  )
}

export default CommentReplyItem;