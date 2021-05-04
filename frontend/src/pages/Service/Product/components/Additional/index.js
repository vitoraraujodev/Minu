import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaCheck } from 'react-icons/fa';

import { formatPrice } from '~/util/formatPrice';

import { STANDARD_PLAN } from '~/constants';

import history from '~/services/history';

import './styles.css';

export default function Additional({
  additionals = [],
  selectedAdditionals = [],
  onSelect = () => {},
}) {
  const plan = useSelector((state) => state.serviceSession.plan);
  const tableNumber = useSelector((state) => state.serviceSession.tableNumber);

  useEffect(() => {
    if (!plan) history.goBack();
  });

  function handleAdditional(additional) {
    if (plan === STANDARD_PLAN && !tableNumber) {
      if (selectedAdditionals.includes(additional)) {
        onSelect(
          selectedAdditionals.filter(
            (selectedAdd) => selectedAdd.id !== additional.id
          )
        );
      } else {
        onSelect([...selectedAdditionals, additional]);
      }
    }
  }

  return (
    <div id="product-additional-component">
      <p className="additional-label">Adicionais</p>

      {additionals.map((additional) => (
        <div
          className="additional"
          key={additional.id}
          style={{ cursor: !tableNumber ? 'pointer' : 'default' }}
          onClick={() => handleAdditional(additional)}
        >
          {!tableNumber && plan && (
            <div className="check-box">
              {selectedAdditionals.includes(additional) && (
                <div className="check-box-selected">
                  <FaCheck size={12} color="white" />
                </div>
              )}
            </div>
          )}

          <p className="additional-title">{additional.title}</p>

          <div className="additional-dots" />

          <p className="additional-price">{formatPrice(additional.price)}</p>
        </div>
      ))}
    </div>
  );
}
