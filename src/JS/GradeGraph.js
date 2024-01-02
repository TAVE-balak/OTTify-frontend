import React from 'react';

const GradeGraph = ({reviews }) => {
  // reviews 배열 초기화
  const initializeReviews = () => {
    const initializedReviews = {};
    for (let i = 0.5; i <= 5; i += 0.5) {
      initializedReviews[i.toString()] = 0;
    }
    return initializedReviews;
  };

  // 배열의 각 값의 개수를 세는 함수
  const countReviews = (reviews) => {
    return reviews.reduce((countMap, review) => {
      // 현재 리뷰 값의 개수를 증가시킴
      countMap[review] = (countMap[review] || 0) + 1; //있으면 기존 값에 1 더하고 || 없으면 0에 1 더함
      return countMap;
    }, initializeReviews()); //초기값 설정
  };

   // 리뷰 값의 개수를 가져옴
   const reviewsCountMap = countReviews(reviews);

    // 리뷰 값들을 순서대로 정렬한 배열
   const sortedValues = Object.keys(reviewsCountMap).sort((a, b) => parseFloat(a) - parseFloat(b));

   //최대 높이
   const maxHeight = 30;

   //리뷰 개수 합
   const totalCount = Object.values(reviewsCountMap).reduce((sum, count) => sum + count, 0);

  return (
    <div>
    {sortedValues.map((value) => (
      <div key={value} style={{ display: 'inline-block', width: '15px', marginRight: '5px', backgroundColor: 'var(--orange_200)' }}>
        {reviewsCountMap[value] > 0 ? (
          <div
            style={{
              height: `${Math.min((reviewsCountMap[value] / totalCount) * maxHeight, maxHeight)}px`,
            }}
          ></div>
        ) : (
          <div 
            style={{ 
              height: '0px',
            }}  
          ></div>
       )}
    </div>
    ))}
  </div>
  );
};

export default GradeGraph;