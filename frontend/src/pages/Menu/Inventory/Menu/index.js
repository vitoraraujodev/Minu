import React from 'react';

import './styles.css';

export default function Menu({ menu, index }) {
  function menuColor() {
    let rest = index % 5;
    while (rest > 5) {
      rest %= 5;
    }

    switch (rest) {
      case 0:
        return '#24D18A';
      case 1:
        return '#FF8736';
      case 2:
        return '#FF3636';
      case 3:
        return '#535BFE';
      case 4:
        return '#252525';
      default:
        return '#fff';
    }
  }

  return (
    <div className="item-container">
      <div className="img-container" style={{ background: menuColor(index) }}>
        {index + 1}
      </div>
      <div className="item-info">
        <p className="item-title">{menu.title}</p>
        <div className="item-date">
          <div className="week-line" />
          <p
            className="item-day"
            style={menu.availability[0] === '1' ? { color: '#535BFE' } : null}
          >
            D
          </p>
          <p
            className="item-day"
            style={menu.availability[1] === '1' ? { color: '#535BFE' } : null}
          >
            S
          </p>
          <p
            className="item-day"
            style={menu.availability[2] === '1' ? { color: '#535BFE' } : null}
          >
            T
          </p>
          <p
            className="item-day"
            style={menu.availability[3] === '1' ? { color: '#535BFE' } : null}
          >
            Q
          </p>
          <p
            className="item-day"
            style={menu.availability[4] === '1' ? { color: '#535BFE' } : null}
          >
            Q
          </p>
          <p
            className="item-day"
            style={menu.availability[5] === '1' ? { color: '#535BFE' } : null}
          >
            S
          </p>
          <p
            className="item-day"
            style={menu.availability[6] === '1' ? { color: '#535BFE' } : null}
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
