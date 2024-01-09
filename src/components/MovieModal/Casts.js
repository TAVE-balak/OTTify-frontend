import React from 'react';

const Casts = ({ castList }) => {
  return (
    <div className="cast-list">
      {castList.map((castMember, index) => (
        <div key={index} className="cast-member">
          <img
            src={`https://image.tmdb.org/t/p/original/${castMember.profile_path}`} 
            alt={`${castMember.name} as ${castMember.character}`}
            className="cast-member__image"
          />
          <div className="cast-member__info">
            <h4 className="cast-member__name">{castMember.name}</h4>
            <p className="cast-member__character">{castMember.character}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Casts;
