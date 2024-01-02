import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../redux/api';
import ReviewCard from './ReviewCard';

const API_KEY = process.env.REACT_APP_API_KEY;

const Reviews = ({ item }) => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]); // Renamed 'review' to 'reviews'

  const getReviews = async () => {
    let url = `/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`;
    let response = await api.get(url);
    let data = response.data;
    setReviews(data.results); // Set only the 'results' array into state
    console.log('리뷰?', data);
  };

  useEffect(() => {
    getReviews();
  }, [id]); // Added 'id' to the dependency array for re-fetching reviews when 'id' changes

  return (
    <div>
      <div className='review-tag'>
        REVIEWS&#160;({reviews.length})
      </div>
      <div className='review-total'>
        {/* Check if 'reviews' is not empty before mapping */}
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
