import React, { useState, useEffect } from 'react';

import PinCodeInput from '~/components/PinCodeInput';

import '../styles.css';

export default function AdmPin({
  adminPin,
  onChangeAdminPin,
  onBackPage,
  onNextPage,
}) {
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (adminPin.length === 4) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, [adminPin]);

  return (
    <>
      <form id="form">
        <p className="label">Para finalizar</p>
        <p style={{ fontWeight: 600, marginTop: 28 }} className="input-label">
          Crie o PIN dos administradores
        </p>
        <p className="sub-label">
          Será necessária para fazer alterações em configurações e cardápios
        </p>

        <PinCodeInput adminPin={adminPin} onChangeAdminPin={onChangeAdminPin} />
      </form>

      <div className="buttons-container">
        <button
          style={{ color: '#9C9C9C' }}
          className="page-button"
          type="button"
          onClick={onBackPage}
        >
          Voltar
        </button>
        <button
          style={filled ? { color: '#535BFE' } : { color: '#9C9C9C' }}
          className="page-button"
          type="button"
          disabled={!filled}
          onClick={onNextPage}
        >
          Avançar
        </button>
      </div>
    </>
  );
}
