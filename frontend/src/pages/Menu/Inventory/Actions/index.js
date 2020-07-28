import React, { useState } from 'react';

import { ReactComponent as ActionIcon } from '~/assets/icons/action-icon.svg';
import { ReactComponent as RemoveIcon } from '~/assets/icons/add-icon.svg';

import './styles.css';

export default function Actions() {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <div id="actions-container">
      <button
        className="actions-button"
        type="button"
        onClick={handleToggleVisible}
      >
        <ActionIcon style={{ height: 16 }} />
      </button>
      {visible && (
        <div className="actions">
          <div className="action-area">
            <div className="action">
              <p>Em estoque</p>
            </div>
          </div>
          <div className="action-area">
            <div className="action" style={{ border: 0 }}>
              <p>Excluir</p>
              <div className="remove-icon">
                <RemoveIcon fill="#FF3636" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
