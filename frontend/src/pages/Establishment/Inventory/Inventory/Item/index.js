import React from 'react';

import defaultPicture from '~/assets/images/default-picture.png';

import './styles.css';

export default function Item({ item }) {
  return (
    <>
      <div className="img-container">
        <img
          src={item.photo ? item.photo.url : defaultPicture}
          onError={(e) => {
            e.target.src = defaultPicture;
          }}
          className={item.available ? 'item-img' : 'item-img-disabled'}
          alt="item-img"
        />
      </div>

      <div
        className="item-info"
        style={item.available ? { opacity: 1 } : { opacity: 0.6 }}
      >
        <p className="item-title">{item.title}</p>
        {item.code && <p className="item-code">{item.code}</p>}
      </div>
    </>
  );
}
