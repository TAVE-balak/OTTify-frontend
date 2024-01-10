import {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import '../CSS/DebateWrite.css';

import back from '../img/back.png';
import photo_select from '../img/photo_select.png';
const DebateEdit = () =>{
  const location = useLocation();
  const { debateTitle, content, posterUrl } = location.state;

  const navigate = useNavigate();
  const [title, setTitle] = useState(debateTitle);
  const [isTitleChanged, setIsTitleChanged] = useState(false);
  const [isContentChanged, setIsContentChanged] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setIsTitleChanged(true);
  };

  const handleContentChange = (event) =>{
    setIsContentChanged(true);
  }


  return(
    
    <div className="debateWrite Edit">
      <div className='debateAuto Edit'>
        <div className="writeTop Edit">
          <img src = {back} className='writeBack Edit' onClick={() => navigate(-1)}></img>
          <span class = "topTitle Edit">토론 수정</span>
        </div>
        <div className ="writeMain Edit">
          <div className='writeTitle Edit'>
            <input className='titleArea Edit' 
                    placeholder="제목"
                    defaultValue = {debateTitle}
                    value={title}
                    onChange={handleTitleChange}>        
            </input>
          </div>
          <div className='writeContent Edit'>
            <textarea className='contentArea Edit' 
                      placeholder="작품에 대한 감상을 다른 분들과 공유해 보세요."
                      defaultValue = {content}
                      onChange={handleContentChange}>          
            </textarea>
          </div>
          <div className='writeImg Edit'>
            <img src = {photo_select} className='photo_select Edit'></img>
            <span className='photo_name Edit'>사진 추가</span>
            <img src = {posterUrl} className="photo_debate Edit"></img>
          </div>
          <div className='writeBtn Edit'>
            <button className = {`completeBtn Edit ${title && (isTitleChanged || isContentChanged) ? 'active' : ''}`}>수정 완료</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DebateEdit;