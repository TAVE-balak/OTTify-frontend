import back from '../img/back.png';
import photo_select from '../img/photo_select.png';

import '../CSS/DebateWrite.css';

const DebateWrite = () => {
  return (
    <div className="debateWrite">
      <div className="writeTop">
        <img src = {back} className='writeBack'></img>
        <span class = "topTitle">토론 열기</span>
      </div>
      <div className ="writeMain">
        <div className='writeTitle'>
          <input className='titleArea' value={"제목"}></input>
        </div>
        <div className='writeContent'>
          <input className='contentArea' value={"작품에 대한 감상을 다른 분들과 공유해 보세요."}></input>
        </div>
        <div className='writeImg'>
          <img src = {photo_select} className='photo_select'></img>
          <span className='photo_name'>사진 추가</span>
        </div>
        <div className='writeBtn'>
          <button className = "completeBtn">작성 완료</button>
        </div>
      </div>
    </div>
  )
}

export default DebateWrite;