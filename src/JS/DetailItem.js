import {useState} from 'react';
import thumb from '../img/thumb_up.png';
import thumb_orange from '../img/thumb_up_orange.png';
import chat from '../img/chat.png';
import more from '../img/more.png';

const DetailItem = ({debateTitle, movie, poster, content, created_date, comment, favorite, id}) =>{
  const imgClassName = poster.poster ? 'debateImg' : 'withoutImg';
  const MainClassName = poster.poster ? 'debateImgMain' : 'debateMain';

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <div className = "DetailItem">
      <div className="debateInfo">
        <div className="movieInfo">
          <span className='movie'>{movie}</span>
          <span className="debateTitle">{debateTitle}</span>
        </div>
        <div className="movieInfoRight">
          <span className="writeDate">{created_date}</span>
          <img src = {more} className='more' onClick={handleMenuClick}></img>
          {isMenuOpen && (
              <div className='menu_list_debate'>
                <div className='menu_edit'>
                    토론 수정</div>
                <div className='menu_delete'>
                   토론 삭제</div>
              </div>
            )}
        </div>
      </div>

      <div className={`${MainClassName}`}>
        <img src = {poster.poster} className={`${imgClassName}`}></img>
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