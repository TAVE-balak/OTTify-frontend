import '../CSS/MyCollect.css';
import star from '../img/star1.png'
import thumb from '../img/thumb_up.png';
const ReviewItem = ({author, profileimg, movie, poster, tag, content, created_date, evaluation, favorite, id}) =>{
  return (
    <div className = "ReviewItem">
      <div className="reviewInfo">
        <div className="writerInfo">
          <img src = {profileimg.img1} className="writer_profile" alt = "프로필 이미지"></img>
          <span className="writer">{author}님의 평가</span>
        </div>
        <span className="writeDate">{created_date}</span>
      </div>

      <div className="reviewMovie">
        <img src = {poster.poster} className="reviewPoster" alt = "포스터 이미지"></img>
        <div className="reviewMain">
          <span className="reviewName">{movie}</span>
          <div className="reviewPick">
            <img src = {star} className='star' alt = "별점"></img>
            <span className='reviewNum'>{evaluation}</span>
            <div className='tags'>
              <span className='tag_1'>{tag[0]}</span>
              <span className='tag_2'>{tag[1]}</span>
            </div>
          </div>
          <div className='reviewContent'>
            {content}
          </div>
          <div className='reviewFavorite'>
            <img src = {thumb} className='reviewthumb' alt = "좋아요"></img>
            <span className='thumbNum'>{favorite}</span>
          </div>
        </div>
      </div>


      <div className='FavoriteBtn'>
        <img src = {thumb} className='thumbBtn' alt = "좋아요 버튼"></img>
        <span className='nameBtn'>좋아요</span>
      </div>
    </div>
  )
}

export default ReviewItem;