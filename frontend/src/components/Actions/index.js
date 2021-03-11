import React, { useState } from 'react';

import { ReactComponent as ActionIcon } from '~/assets/icons/action-icon.svg';
import { ReactComponent as RemoveIcon } from '~/assets/icons/add-icon.svg';

import api from '~/services/api';

import './styles.css';

export default function Actions({
  id,
  available,
  route,
  onChangeAvailable,
  onDelete,
  fill,
  position,
  height = 16,
}) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleAvailability() {
    try {
      const response = await api.put(`${route}/${id}`, {
        available: !available,
      });
      onChangeAvailable(response.data.available);
    } catch (err) {
      alert('Não foi possível atualizar a disponibilidade. Tente mais tarde.');
    }
  }

  async function handleDelete() {
    if (window.confirm('Tem certeza que deseja deletar?')) {
      try {
        await api.delete(`${route}/${id}`);
        onDelete(id);
      } catch (err) {
        alert('Não foi possível deletar. Tente mais tarde.');
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
        <ActionIcon style={{ height }} fill={fill} />
      </button>
      {visible && (
        <div className={position === 'down' ? 'actions-down' : 'actions'}>
          <div className="action-area" onClick={handleAvailability}>
            <div className="action">
              <p>{route === 'menus' ? 'Disponível' : 'Em estoque'} </p>

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
