import React, { useState, useRef } from 'react';

import SuccessCover from '~/components/SuccessCover';

import EstablishmentInfo from '../../components/EstablishmentInfo';
import ProductList from '../../components/ProductList';
import MenuButtons from '../../components/MenuButtons';
import WaiterModal from '../../components/WaiterModal';

export default function TableMenu({ establishment, tableNumber, loading }) {
  const pageRef = useRef();

  const [waiterCall, setWaiterCall] = useState(); // 'waiter' or 'bill'
  const [waiterModal, setWaiterModal] = useState();
  const [successScreen, setSuccessScreen] = useState(false);

  function handleSuccessText() {
    if (waiterCall === 'waiter') return 'Você chamou o garçom';
    if (waiterCall === 'bill') return 'Você pediu a conta';
  }

  function handleSuccessColor() {
    if (waiterCall === 'waiter') return '#535BFE';
    if (waiterCall === 'bill') return '#24D18A';
  }

  return (
    <div id="service-menu-page" ref={pageRef}>
      {successScreen && (
        <SuccessCover
          successText={handleSuccessText()}
          successSubtext="Aguarde, você já será atendido!"
          background={handleSuccessColor()}
          onClose={() => {
            setSuccessScreen(false);
            setWaiterModal();
          }}
        />
      )}

      {waiterModal && (
        <WaiterModal
          call={waiterCall}
          establishmentId={establishment.id}
          tableNumber={tableNumber}
          onCall={() => setSuccessScreen(true)}
          onClose={() => setWaiterModal(false)}
        />
      )}

      <EstablishmentInfo establishment={establishment} loading={loading} />

      <ProductList
        establishment={establishment}
        loading={loading}
        pageRef={pageRef}
      />

      <MenuButtons
        waiter={{
          onClick: () => {
            setWaiterCall('waiter');
            setWaiterModal(true);
          },
        }}
        billCall={{
          onClick: () => {
            setWaiterCall('bill');
            setWaiterModal(true);
          },
        }}
      />
    </div>
  );
}
