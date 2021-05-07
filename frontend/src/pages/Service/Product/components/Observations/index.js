import React from 'react';

import './styles.css';

export default function Observations({
  observation = '',
  onChangeObservation = () => {},
}) {
  return (
    <div id="product-observation-component">
      <p className="observation-label">
        Observações <span className="hint">(opcional)</span>
      </p>

      <textarea
        className="observation-input"
        value={observation}
        onChange={(e) => onChangeObservation(e.target.value)}
        maxLength="128"
        placeholder="Observações do seu pedido"
      />
    </div>
  );
}
