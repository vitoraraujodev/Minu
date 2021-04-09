import React, { useState, useEffect } from 'react';

import PinCodeInput from '~/components/PinCodeInput';

import FormButtons from '~/pages/Auth/Access/components/FormButtons';

export default function AdmPin({
  adminPin,
  onChangeAdminPin,
  loading,
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
    <div className="form-container">
      <p className="label">Para finalizar...</p>

      <p style={{ fontWeight: 600, marginTop: 28 }} className="input-label">
        Crie o PIN dos administradores
      </p>

      <p className="sub-label">
        Será necessário para fazer alterações em configurações e cardápios
      </p>

      <PinCodeInput adminPin={adminPin} onChangeAdminPin={onChangeAdminPin} />

      <p className="terms-text">
        Ao clicar em concluir, você aceita nossos{' '}
        <span style={{ color: '#535BFE', textDecoration: 'underline' }}>
          termos de serviço
        </span>
      </p>

      <FormButtons
        onBack={onBackPage}
        onNext={onNextPage}
        filled={filled}
        loading={loading}
        finalStep
      />
    </div>
  );
}
