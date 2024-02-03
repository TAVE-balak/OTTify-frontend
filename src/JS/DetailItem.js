import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import DebateEdit from './DebateEdit';

import { deleteDiscussionSubject } from './WonAPI';

import thumb from '../img/thumb_up.png';
import thumb_orange from '../img/thumb_up_orange.png';
import chat from '../img/chat.png';
import more from '../img/more.png';

const DetailItem = ({debateTitle, movie, poster, content, created_date, comment, favorite, id, subjectId, imageUrl}) =>{
  const imgClassName = poster ? 'debateImg' : 'withoutImg';
  const MainClassName = poster ? 'debateImgMain' : 'debateMain';

  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goToDebateEdit = () =>{
    console.log(subjectId)
    console.log(imageUrl)
    navigate(`/DebateEdit/${id}`, {
      state: {
        debateTitle,
        content,
        posterUrl: poster,
        subjectId: subjectId,
        imageUrl: imageUrl
      },
    });
  }

  const deleteDebate = async()=>{
    try{
      const userConfirmed = window.confirm("토론을 삭제하시겠습니까?");
      if (userConfirmed) {
        // 사용자가 확인을 눌렀을 때만 삭제 작업 수행
        const deleteData = await deleteDiscussionSubject(id);
        navigate(-1);
        console.log(deleteData);
      }else{
        handleMenuClick()
      }
    }catch (error) {
      console.error("Error deleting discussion:", error);
    }
  }

  return (
    <div className = "DetailItem">
      <div className="debateInfo">
        <div className="movieInfo">
          <span className='movieDebate'>{movie}</span>
          <span className="debateTitle">{debateTitle}</span>
        </div>
        <div className="movieInfoRight">
          <span className="writeDate">{created_date}</span>
          <img src = {more} className='more' onClick={handleMenuClick}></img>
          {isMenuOpen && (
              <div className='menu_list_debate'>
                <div className='menu_edit' onClick={goToDebateEdit}>
                    토론 수정</div>
                <div className='menu_delete' onClick={deleteDebate}>
                   토론 삭제</div>
              </div>
            )}
        </div>
      </div>

      <div className={`${MainClassName}`}>
        <img src = {poster} className={`${imgClassName}`}></img>
        <div className='debateContent'>{content}</div>  
      </div>

      <div className='debateReaction'>
        <div className='debateFavorite'>
          <img src = {thumb} className='debatethumb' alt = "좋아요"></img>
          <span className='debatethumbNum'>{favorite}</span>
        </div>
        <div className='debateComment'>
          <img src = {chat} className='debatereply' alt = "댓글"></img>
          <span className='debatecommentNum'>{comment}</span>
        </div>
      </div>
    </div>
  )
}

export default DetailItem;