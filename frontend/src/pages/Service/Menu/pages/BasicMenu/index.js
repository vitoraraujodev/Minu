import React, { useRef } from 'react';

import EstablishmentInfo from '../../components/EstablishmentInfo';
import ProductList from '../../components/ProductList';

function BasicMenu({ establishment, loading }) {
  const pageRef = useRef();

  return (
    <div id="service-menu-page" ref={pageRef}>
      <EstablishmentInfo establishment={establishment} loading={loading} />

      <ProductList
        establishment={establishment}
        loading={loading}
        pageRef={pageRef}
      />
    </div>
  );
}

export default BasicMenu;
