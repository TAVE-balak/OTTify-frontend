import React, {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { createDiscussionSubject } from './WonAPI';

import back from '../img/back.png';
import photo_select from '../img/photo_select.png';

import '../CSS/DebateWrite.css';

const DebateWrite = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');  
  const programId = location.state?.programId;

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleFileChange = (e) => {
    // 파일 선택 시 호출되는 이벤트 핸들러
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleWriteComplete = async () => {
    try {
      // 여기서 API 호출
      const formData = new FormData();
      const dto = {"programId": programId, "subjectName": title, "content": content}
      formData.append('dto', new Blob([JSON.stringify(dto)], {
        type: "application/json"
      }));
      
      formData.append('file', selectedImage? (selectedImage):(""));

      console.log(JSON.stringify(dto))
      // API 호출
      const response = await createDiscussionSubject(formData);

      setImageUrl(response.data.imageUrl);
      
      // API 호출이 성공하면 다음 동작을 정의하세요
      console.log('Discussion subject created:', response);
      navigate(-1)
    } catch (error) {
      console.error('Error creating discussion subject:', error);
      // 에러 처리 또는 사용자에게 알리는 등의 추가 작업을 수행할 수 있습니다.
    }
  };


  return (
    <div className="debateWrite">
      <div className='debateAuto'>
        <div className="writeTop">
          <img src = {back} className='writeBack' onClick={() => navigate(-1)}></img>
          <span className = "topTitle">토론 열기</span>
        </div>
        <div className ="writeMain">
          <div className='writeTitle'>
            <input className='titleArea' 
                    placeholder="제목"
                    value = {title}
                    onChange={handleTitleChange}>        
            </input>
          </div>
          <div className='writeContent'>
            <textarea className='contentArea' 
                      placeholder="작품에 대한 감상을 다른 분들과 공유해 보세요."
                      value={content}
                      onChange={handleContentChange}>          
            </textarea>
          </div>
          <div className='writeImg'>
            <img src = {photo_select} className='photo_select'></img>
            <span className='photo_name'>사진 추가</span>
            <input
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <div className='writeBtn'>
            <button className = {`completeBtn ${title && content ? 'active' : ''}`}
                    onClick={handleWriteComplete}>작성 완료</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DebateWrite;