import back from '../img/back.png';
import photo_select from '../img/photo_select.png';

const DebateWrite = () => {
  return (
    <div className="debateWrite">
      <div className="writeTop">
        <img src = {back} className='writeBack'></img>
        <span class = "topTitle">토론 열기</span>
      </div>
      <div className ="writeMain">
        <div className='writeTitle'>
          <textarea className='titleArea'></textarea>
        </div>
        <div className='writeContent'>
          <textarea className='contentArea'></textarea>
        </div>
        <div className='writeImg'>
          <img src = {photo_select} className='photo_select'></img>
          <span className='photo_name'>사진 추가</span>
        </div>
        <div className='writeBtn'>
          <button classname = "completeBtn">작성 완료</button>
        </div>
      </div>
    </div>
  )
}

export default DebateWrite;