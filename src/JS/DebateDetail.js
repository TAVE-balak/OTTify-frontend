import '../CSS/MyDebate.css';
import '../CSS/DebateDetail.css';
import DetailList from './DetailList';

import back from '../img/back.png';
import poster from '../img/debate_poster.png';

const DebateDetail = ({id, author, movie, poster, debateTitle, content, created_date, favorite, comment}) =>{
  const dummyList = [
  {
    id: 1,
    author: "김영리", 
    movie: "나폴레옹",
    poster: "",
    debateTitle: "서울의 봄은 최고의 영화이다",
    content: "봉준호 영화 중에서 가장 음침하고 불편한 영화인 것 같다. <마더>에 가득 찬 오해들은 풀리지 못 한다. 오해를 오해로 해결하더니 끝내는 엉뚱한 사람이 갇힌다. 이 영화에서 해결된 것은 없다. 잊으려 애를 쓸 뿐이다. 하지만 그것도 불안하기 짝이 없어 보인다. 가나다라마바사 아자차카파타하.",
    created_date: "3달 전",
    favorite: 120,
    comment: 4,
  }
]


  return (
    <div className='DebateDetail'>
      <div className = "debatedetail_page">
        <div className = "debatedetail_title">
          <img src = {back} className = "debatedetail_back" alt = "뒤로 가기"/>
          <h2>토론 상세 보기</h2>
        </div>
        <DetailList detailList={dummyList}/>
      </div>
    </div>
  )
}

export default DebateDetail;