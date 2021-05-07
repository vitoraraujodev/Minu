import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

import AmountInput from '~/components/AmountInput';

import Header from './components/Header';
import ProductInfo from './components/ProductInfo';
import Additional from './components/Additional';
import Observations from './components/Observations';
import AddCartButton from './components/AddCartButton';

import { STANDARD_PLAN } from '~/constants';

import './styles.css';

export default function Product({ location }) {
  const product = location.state.product || {};

  const plan = useSelector((state) => state.serviceSession.plan);
  const tableNumber = useSelector((state) => state.serviceSession.tableNumber);

  const [selectedAdditionals, setSelectedAdditionals] = useState([]);
  const [observation, setObservation] = useState('');
  const [amount, setAmount] = useState(1);

  const totalPrice = useMemo(() => {
    const additionalsPrice =
      selectedAdditionals.length > 0
        ? selectedAdditionals
            .map((additional) => additional.price)
            .reduce((total = 0, price) => total + price)
        : 0;

    return (product.price + additionalsPrice) * amount;
  }, [amount, selectedAdditionals]);

  function handleAddToCart() {}

  return (
    <div id="service-product-page">
      <Header />

      <ProductInfo product={product} />

      <div className="specifications">
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
            <div className="amount">
              <AmountInput amount={amount} onChangeAmount={setAmount} />
            </div>
          </div>
        )}
      </div>

      {!tableNumber && plan === STANDARD_PLAN && (
        <AddCartButton totalPrice={totalPrice} onAddToCart={handleAddToCart} />
      )}
    </div>
  );
}
