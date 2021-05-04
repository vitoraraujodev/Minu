import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import Loader from '~/components/Loader';

import './styles.css';

export default function FormButtons({
  onBack = () => {},
  onNext = () => {},
  filled = false,
  loading = false,
  leftButtonText = '',
  rightButtonText = '',
}) {
  return (
    <div id="form-buttons-container">
      <button type="button" className="button back " onClick={onBack}>
        <FaChevronLeft size={16} color="#6c6c6c" />
        <span style={{ marginLeft: 4 }}>{leftButtonText || 'Voltar'}</span>
      </button>

      <button
        className="button next"
        type="button"
        disabled={!filled}
        onClick={onNext}
      >
        {loading ? (
          <>
            <span style={{ marginRight: 8 }}>Carregando</span>
            <Loader size={16} />
          </>
        ) : (
          <>
            <span style={{ marginRight: 4 }}>
              {rightButtonText || 'Avançar'}
            </span>
            <FaChevronRight color={filled ? '#535BFE' : '#acacac'} />
          </>
        )}
      </button>
    </div>
  );
}
