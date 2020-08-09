import React, { useState } from 'react';

import { ReactComponent as ActionIcon } from '~/assets/icons/action-icon.svg';
import { ReactComponent as RemoveIcon } from '~/assets/icons/add-icon.svg';

import api from '~/services/api';

import './styles.css';

export default function Actions({ item, route, onDelete, fill, position }) {
  const [visible, setVisible] = useState(false);
  const [available, setAvailable] = useState(item.available);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleAvailability() {
    try {
      const response = await api.put(`${route}/${item.id}`, {
        available: !available,
      });
      setAvailable(response.data.available);
    } catch (err) {
      alert(
        'Não foi possível atualizar a disponibilidade. Por favor, tente mais tarde.'
      );
    }
  }

  async function handleDelete() {
    if (window.confirm('Tem certeza que deseja deletar?')) {
      try {
        await api.delete(`${route}/${item.id}`);
        onDelete(item.id);
      } catch (err) {
        alert('Não foi possível deletar. Por favor, tente mais tarde.');
      }
    }
  }

  return (
    <div id="actions-container">
      <button
        className="actions-button"
        type="button"
        onClick={handleToggleVisible}
      >
        <ActionIcon style={{ height: 16 }} fill={fill} />
      </button>
      {visible && (
        <div className={position === 'down' ? 'actions-down' : 'actions'}>
          <div className="action-area" onClick={handleAvailability}>
            <div className="action">
              <p>Em estoque</p>

              <button type="button" className="toggle-button">
                <div className="toggle-background">
                  <div
                    className={
                      available ? 'toggle-circle-on' : 'toggle-circle-off'
                    }
                  />
                </div>
              </button>
            </div>
          </div>
          <div className="action-area" onClick={handleDelete}>
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
