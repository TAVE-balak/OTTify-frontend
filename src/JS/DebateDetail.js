import { useNavigate } from 'react-router-dom';

import '../CSS/MyDebate.css';
import '../CSS/DebateDetail.css';
import DetailList from './DetailList';

import back from '../img/back.png';

const DebateDetail = () =>{
  const navigate = useNavigate();
 
  return (
    <div className='DebateDetail'>
      <div className = "debatedetail_page">
        <div className = "debatedetail_title">
          <img src = {back} className = "debatedetail_back" alt = "뒤로 가기" onClick={() => navigate(-1)}/>
          <h2>토론 상세 보기</h2>
        </div>
        <DetailList/>
      </div>
    </div>
  )
}

export default DebateDetail;