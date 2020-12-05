import React from 'react';

import './styles.css';

export default function DaySelector({
  availability = '0000000',
  onChangeAvailability,
}) {
  function handleDay(index) {
    let value = availability[index];
    if (parseInt(value, 10)) {
      value = 0;
    } else {
      value = 1;
    }

    onChangeAvailability(
      availability.substr(0, index) + value + availability.substr(index + 1)
    );
  }

  return (
    <div id="day-selector">
      <button
        type="button"
        className={availability[0] === '1' ? 'selected-day' : 'day'}
        onClick={() => handleDay(0)}
      >
        D
      </button>
      <button
        type="button"
        className={availability[1] === '1' ? 'selected-day' : 'day'}
        onClick={() => handleDay(1)}
      >
        S
      </button>
      <button
        type="button"
        className={availability[2] === '1' ? 'selected-day' : 'day'}
        onClick={() => handleDay(2)}
      >
        T
      </button>
      <button
        type="button"
        className={availability[3] === '1' ? 'selected-day' : 'day'}
        onClick={() => handleDay(3)}
      >
        Q
      </button>
      <button
        type="button"
        className={availability[4] === '1' ? 'selected-day' : 'day'}
        onClick={() => handleDay(4)}
      >
        Q
      </button>
      <button
        type="button"
        className={availability[5] === '1' ? 'selected-day' : 'day'}
        onClick={() => handleDay(5)}
      >
        S
      </button>
      <button
        type="button"
        className={availability[6] === '1' ? 'selected-day' : 'day'}
        onClick={() => handleDay(6)}
      >
        S
      </button>
    </div>
  );
}
