import React from 'react';

import emptyStar from '~/assets/images/empty-star.svg';
import filledStar from '~/assets/images/filled-star.svg';

import './styles.css';

export default function StarRating() {
  return (
    <div className="star-rating-container">
      <div id="star-rating">
        <div className="star-rating-top">
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
      <span className="raters-text">(32)</span>
    </div>
  );
}
