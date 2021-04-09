import React, { useState, useEffect } from 'react';

import Input from '~/components/Input';

import FormButtons from '~/pages/Auth/Access/components/FormButtons';

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
    <div className="form-container">
      <p className="label">Qual o nome do seu restaurante?</p>
      <Input
        value={establishmentName}
        variant="tertiary"
        onChange={(e) => onChangeEstablishmentName(e.target.value)}
        placeholder="Restaurante X"
      />

      <p className="label">Qual o seu nome?</p>
      <Input
        style={{ textTransform: 'capitalize' }}
        variant="tertiary"
        value={managerName}
        onKeyDown={(e) => {
          if (e.key === ' ' || (e.key >= 0 && e.key <= 9)) e.preventDefault();
        }}
        onChange={(e) => onChangeManagerName(e.target.value)}
        placeholder="Nome"
      />
      <Input
        value={managerLastName}
        variant="tertiary"
        style={{ marginTop: 16, textTransform: 'capitalize' }}
        onKeyDown={(e) => {
          if (e.key === ' ' || (e.key >= 0 && e.key <= 9)) e.preventDefault();
          else if (e.keyCode === 13 && filled) {
            onNextPage();
          }
        }}
        onChange={(e) => onChangeManagerLastName(e.target.value)}
        placeholder="Sobrenome"
      />

      <FormButtons onBack={onBackPage} onNext={onNextPage} filled={filled} />
    </div>
  );
}
