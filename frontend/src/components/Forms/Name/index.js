import React from 'react';

import '../styles.css';

export default function Name({
  onChangeEstablishmentName,
  onChangeCnpj,
  onChangeManagerName,
  onChangeManagerLastName,
}) {
  return (
    <form>
      <p className="label">Qual o nome do seu restaurante?</p>
      <input
        name="establishmentName"
        className="form-input"
        autoFocus //eslint-disable-line
        onChange={(e) => onChangeEstablishmentName(e.target.value)}
        placeholder="Restaurante X"
      />
      <p className="label">Qual o CNPJ?</p>
      <input
        name="cnpj"
        className="form-input"
        onChange={(e) => onChangeCnpj(e.target.value)}
        placeholder="00.000.000/000-00"
      />
      <p className="label">Qual o seu nome?</p>
      <input
        name="managerName"
        className="form-input"
        onChange={(e) => onChangeManagerName(e.target.value)}
        placeholder="Nome"
      />
      <input
        name="managerLastName"
        className="form-input"
        style={{ marginBottom: 0 }}
        onChange={(e) => onChangeManagerLastName(e.target.value)}
        placeholder="Sobrenome"
      />
    </form>
  );
}
