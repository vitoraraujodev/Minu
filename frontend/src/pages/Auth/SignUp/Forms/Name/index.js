import React, { useState, useEffect } from 'react';

import '../styles.css';

export default function Name({
  establishmentName,
  onChangeEstablishmentName,
  managerName,
  onChangeManagerName,
  managerLastName,
  onChangeManagerLastName,
  onBackPage,
  onNextPage,
}) {
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (establishmentName && managerName && managerLastName) {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, [establishmentName, managerName, managerLastName]);

  return (
    <>
      <form>
        <p className="label">Qual o nome do seu restaurante?</p>
        <input
          name="establishmentName"
          className="form-input"
          value={establishmentName}
        autoFocus //eslint-disable-line
          onChange={(e) => onChangeEstablishmentName(e.target.value)}
          placeholder="Restaurante X"
        />

        <p className="label">Qual o seu nome?</p>
        <input
          name="managerName"
          className="form-input"
          value={managerName}
          onChange={(e) => onChangeManagerName(e.target.value)}
          placeholder="Nome"
        />
        <input
          name="managerLastName"
          className="form-input"
          value={managerLastName}
          style={{ marginBottom: 0 }}
          onKeyDown={(e) => {
            if (e.keyCode === 13 && filled) {
              onNextPage();
            }
          }}
          onChange={(e) => onChangeManagerLastName(e.target.value)}
          placeholder="Sobrenome"
        />
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
