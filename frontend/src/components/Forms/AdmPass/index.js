import React from 'react';

import '../styles.css';

export default function AdmPass({ adminPassword, onChangeAdminPassword }) {
  return (
    <form>
      <p className="label">Para finalizar</p>
      <p style={{ fontWeight: 600, marginTop: 28 }} className="input-label">
        Crie a senha dos administradores
      </p>
      <p className="sub-label">
        Será necessária para fazer alterações em configurações e cardápios
      </p>
      <input
        name="admin_password"
        type="password"
        className="form-input"
        value={adminPassword}
        autoFocus //eslint-disable-line
        onChange={(e) => onChangeAdminPassword(e.target.value)}
        placeholder="Senha"
      />
    </form>
  );
}
