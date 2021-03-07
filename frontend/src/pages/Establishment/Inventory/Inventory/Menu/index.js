import React from 'react';

import './styles.css';

export default function Menu({ menu, index }) {
  // function handleMenuColor() {
  //   let rest = index % 5;
  //   while (rest > 5) {
  //     rest %= 5;
  //   }

  //   switch (rest) {
  //     case 0:
  //       return '#24D18A';
  //     case 1:
  //       return '#FF8736';
  //     case 2:
  //       return '#FF3636';
  //     case 3:
  //       return '#535BFE';
  //     case 4:
  //       return '#252525';
  //     default:
  //       return '#fff';
  //   }
  // }

  function handleMenuColor() {
    if (menu.available) {
      return '#24D18A';
    }
    return '#DDD';
  }

  function handleDayColor(availability) {
    if (availability === '1' && menu.available) return '#535BFE';
  }

  return (
    <div className="item-container">
      <div
        className="img-container"
        style={{ background: handleMenuColor(index) }}
      >
        {index + 1}
      </div>
      <div
        className="item-info"
        style={menu.available ? { opacity: 1 } : { opacity: 0.6 }}
      >
        <p className="item-title">{menu.title}</p>
        <div className="item-date">
          <div className="week-line" />
          <p
            className="item-day"
            style={{ color: handleDayColor(menu.availability[0]) }}
          >
            D
          </p>
          <p
            className="item-day"
            style={{ color: handleDayColor(menu.availability[1]) }}
          >
            S
          </p>
          <p
            className="item-day"
            style={{ color: handleDayColor(menu.availability[2]) }}
          >
            T
          </p>
          <p
            className="item-day"
            style={{ color: handleDayColor(menu.availability[3]) }}
          >
            Q
          </p>
          <p
            className="item-day"
            style={{ color: handleDayColor(menu.availability[4]) }}
          >
            Q
          </p>
          <p
            className="item-day"
            style={{ color: handleDayColor(menu.availability[5]) }}
          >
            S
          </p>
          <p
            className="item-day"
            style={{ color: handleDayColor(menu.availability[6]) }}
          >
            S
          </p>
          <div className="week-line" />
          <p className="item-hour">{`${menu.start_at}h-${menu.end_at}h`}</p>
        </div>
      </div>
    </div>
  );
}
