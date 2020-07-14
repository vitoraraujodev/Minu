import React from 'react';

import emptyStar from '~/assets/icons/empty-star.svg';
import filledStar from '~/assets/icons/filled-star.svg';

import './styles.css';

export default function StarRating({ rating, raters }) {
  const width = (87.11 * rating) / 10;

  return (
    <div className="star-rating-container">
      <div id="star-rating">
        <div className="star-rating-top" style={{ width }}>
          <img src={filledStar} style={{ marginRight: 4 }} alt="" />
          <img src={filledStar} style={{ marginRight: 4 }} alt="" />
          <img src={filledStar} style={{ marginRight: 4 }} alt="" />
          <img src={filledStar} style={{ marginRight: 4 }} alt="" />
          <img src={filledStar} style={{ marginRight: 4 }} alt="" />
        </div>
        <div className="star-rating-bottom">
          <img src={emptyStar} className="star" alt="" />
          <img src={emptyStar} className="star" alt="" />
          <img src={emptyStar} className="star" alt="" />
          <img src={emptyStar} className="star" alt="" />
          <img src={emptyStar} className="star" alt="" />
        </div>
      </div>
      <span className="raters-text">({raters})</span>
    </div>
  );
}
