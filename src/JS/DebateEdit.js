import {useState} from 'react';
import { useNavigate, useLocation, Form } from 'react-router-dom';

import { editDiscussionSubject } from './WonAPI';

import '../CSS/DebateWrite.css';

import back from '../img/back.png';
import photo_select from '../img/photo_select.png';
const DebateEdit = () =>{
  const location = useLocation();
  const { debateTitle, content, posterUrl } = location.state;
  const navigate = useNavigate();
  const [title, setTitle] = useState(debateTitle);
  const [contentArea, setContentArea] = useState(content);
  const [isTitleChanged, setIsTitleChanged] = useState(false);
  const [isContentChanged, setIsContentChanged] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(''); 
  const subjectId = location.state?.subjectId;
  const imageEditUrl = location.state?.imageUrl;
  console.log("원래 이미지임", imageEditUrl)

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setIsTitleChanged(true);
  };

  const handleContentChange = (event) =>{
    setContentArea(event.target.value);
    setIsContentChanged(true);
  }

  const handleFileChange = (e) => {
    // 파일 선택 시 호출되는 이벤트 핸들러
    const file = e.target.files[0];
    if (file){
      setSelectedImage(file);
    }
  };

  const handleEditComplete = async () => {
    try {
      const formData = new FormData();
      if (selectedImage){
        const dto = {"subjectId": subjectId, "subjectName": title, "content": contentArea}
        formData.append('dto', new Blob([JSON.stringify(dto)], {
          type: "application/json"
        }));
        formData.append('file', selectedImage);
      }else{
        const dto = {"subjectId": subjectId, "subjectName": title, "content": contentArea, "imageUrl": imageEditUrl}
        formData.append('dto', new Blob([JSON.stringify(dto)], {
          type: "application/json"
        }));
      }

      // API 호출
      const response = await editDiscussionSubject(formData);

      setImageUrl(response.data.imageUrl);
      
      // API 호출이 성공하면 다음 동작을 정의하세요
      console.log('Discussion subject edited:', response);
      navigate(-1)
    } catch (error) {
      console.error('Error editing discussion subject:', error);
      // 에러 처리 또는 사용자에게 알리는 등의 추가 작업을 수행할 수 있습니다.
    }
  };

  return(
    
    <div className="debateWrite Edit">
      <div className='debateAuto Edit'>
        <div className="writeTop Edit">
          <img src = {back} className='writeBack Edit' onClick={() => navigate(-1)}></img>
          <span className = "topTitle Edit">토론 수정</span>
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
                      defaultValue = {contentArea}
                      onChange={handleContentChange}>          
            </textarea>
          </div>
          <div className='writeImg Edit'>
            <img src = {photo_select} className='photo_select Edit'></img>
            <span className='photo_name Edit'>사진 변경 or 추가</span>
            <img src = {selectedImage? (URL.createObjectURL(selectedImage)):(imageEditUrl)} className="photo_debate Edit"></img>
            <input
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <div className='writeBtn Edit'>
            <button className = {`completeBtn Edit ${title && (isTitleChanged || isContentChanged) ? 'active' : ''}`}
                    onClick={handleEditComplete}>수정 완료</button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default DebateEdit;