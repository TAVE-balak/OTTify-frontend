import thumb from '../img/thumb_up.png';
import chat from '../img/chat.png';
const DebateItem = ({debateTitle, movie, poster, content, created_date, comment, favorite, id, onClick}) =>{
  const imgClassName = poster.poster ? 'debateImg' : 'withoutImg';
  const MainClassName = poster.poster ? 'debateImgMain' : 'debateMain';
  return (
    <div className = "DebateItem" onClick={onClick}>
      <div className="debateInfo">
        <div className="movieInfo">
          <span className='movieDebate'>{movie}</span>
          <span className="debateTitle">{debateTitle}</span>
        </div>
        <span className="writeDate">{created_date}</span>
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

export default DebateItem;