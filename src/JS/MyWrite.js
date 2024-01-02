import { useNavigate } from "react-router-dom";
import ReviewList from './ReviewList';
import '../CSS/MyCollect.css'

import back from '../img/back.png';
import img1 from '../img/사진.jpg';

const MyWrite = () =>{
  const navigate = useNavigate();
  const goToMypage = () => {
    navigate('/');
  }
  const dummyList = [
  {
    id: 1,
    author: "김영리", 
    profileimg: {img1},
    movie: "나폴레옹",
    tag: ["시간 가는 줄 몰랐어요", "심장질환자 관람유의"],
    content: "봉준호 영화 중에서 가장 음침하고 불편한 영화인 것 같다. 봉준호 영화 중에서 가장 음침하고 불편한 영화인 것 같다.봉준호 영화 중에서 가장 음침하고 불편한 영화인 것 같다.봉준호 영화 중에서 가장 음침하고 불편한 영화인 것 같다.<마더>에 가득 찬 오해들은 풀리지 못 한다. 오해를 오해로 해결하더니 끝내는 엉뚱한 사람이 갇힌다. 이 영화에서 해결된 것은 없다. 잊으려 애를 쓸 뿐이다. 하지만 그것도 불안하기 짝이 없어 보인다. 가나다라마바사 아자차카파타하.",
    evaluation: 3.5,
    created_date: "3달 전",
    favorite: 120,
  }, 

  {
    id: 2,
    author: "김영리", 
    profileimg: {img1},
    movie: "나폴레옹",
    tag: ["시간 가는 줄 몰랐어요", "심장질환자 관람유의"],
    content: "봉준호 영화 중에서 가장 음침하고 불편한 영화인 것 같다. <마더>에 가득 찬 오해들은 풀리지 못 한다. 오해를 오해로 해결하더니 끝내는 엉뚱한 사람이 갇힌다. 이 영화에서 해결된 것은 없다. 잊으려 애를 쓸 뿐이다. 하지만 그것도 불안하기 짝이 없어 보인다. 가나다라마바사 아자차카파타하.",
    evaluation: 3.5,
    created_date: "3달 전",
    favorite: 120,
  }, 

  {
    id: 3,
    author: "김영리", 
    profileimg: {img1},
    movie: "나폴레옹",
    tag: ["시간 가는 줄 몰랐어요", "심장질환자 관람유의"],
    content: "봉준호 영화 중에서 가장 음침하고 불편한 영화인 것 같다. <마더>에 가득 찬 오해들은 풀리지 못 한다. 오해를 오해로 해결하더니 끝내는 엉뚱한 사람이 갇힌다. 이 영화에서 해결된 것은 없다. 잊으려 애를 쓸 뿐이다. 하지만 그것도 불안하기 짝이 없어 보인다. 가나다라마바사 아자차카파타하.",
    evaluation: 3.5,
    created_date: "3달 전",
    favorite: 120,
  }
]


  return (
    <div className='MyWrite'>
      <div className = "mywrite_page">
        <div className = "mywrite_title">
          <img src = {back} className = "mywrite_back" alt = "뒤로 가기" onClick={goToMypage}/>
          <h2>내가 쓴 리뷰</h2>
        </div>
        <ReviewList reviewList={dummyList}/>
      </div>
    </div>
  )
}

export default MyWrite;