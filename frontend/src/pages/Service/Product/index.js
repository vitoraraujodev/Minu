import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import AmountInput from '~/components/AmountInput';
import { FooterButton } from '~/components/Buttons';

import Header from './components/Header';
import ProductInfo from './components/ProductInfo';
import Additional from './components/Additional';
import Observations from './components/Observations';

import { STANDARD_PLAN } from '~/constants';

import './styles.css';

export default function Product({ location }) {
  const product = location.state.product || {};

  const plan = useSelector((state) => state.serviceSession.plan);
  const tableNumber = useSelector((state) => state.serviceSession.tableNumber);

  const [selectedAdditionals, setSelectedAdditionals] = useState([]);
  const [observation, setObservation] = useState('');
  const [amount, setAmount] = useState(1);

  return (
    <div id="service-product-page">
      <Header />

      <ProductInfo product={product} />

      {product.additionals.length > 0 && (
        <Additional
          additionals={product.additionals}
          selectedAdditionals={selectedAdditionals}
          onSelect={setSelectedAdditionals}
        />
      )}

      {!tableNumber && plan === STANDARD_PLAN && (
        <Observations
          observation={observation}
          onChangeObservation={setObservation}
        />
      )}

      {!tableNumber && plan === STANDARD_PLAN && (
        <div className="amount-container">
          <AmountInput amount={amount} onChangeAmount={setAmount} />
        </div>
      )}

      {!tableNumber && plan === STANDARD_PLAN && (
        <FooterButton color="#24D18A" onClick={() => {}}>
          Adicionar ao carrinho
        </FooterButton>
      )}
    </div>
  );
}
