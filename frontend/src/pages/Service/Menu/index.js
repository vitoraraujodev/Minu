import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useParams } from 'react-router-dom';

import BasicMenu from './pages/BasicMenu';
import DeliveryMenu from './pages/DeliveryMenu';
import TableMenu from './pages/TableMenu';

import LoadingScreen from './components/LoadingScreen';

import { setSession } from '~/store/modules/serviceSession/actions';

import api from '~/services/api';
import history from '~/services/history';

import { BASIC_PLAN, STANDARD_PLAN } from '~/constants';

import './styles.css';

export default function Menu() {
  const dispatch = useDispatch();

  const stateEstablishment = useSelector(
    (state) => state.serviceSession.establishment
  );

  // Gets session code from url
  const { code } = useParams();
  const establishmentId = code.substr(0, 3);
  const tableNumber = code.substr(3);

  const [loading, setLoading] = useState(false);

  const [establishment, setEstablishment] = useState();

  async function loadEstablishment() {
    setLoading(true);

    try {
      const response = await api.get(`establishments/${establishmentId}`);

      setEstablishment(response.data);
      dispatch(setSession(response.data, tableNumber));

      setLoading(false);
    } catch (err) {
      setLoading(false);

      history.push('/');

      if (err.response) alert(err.response.data.error);
    }
  }

  useEffect(() => {
    if (stateEstablishment) {
      setEstablishment(stateEstablishment);
    } else {
      loadEstablishment();
    }
  }, [stateEstablishment]);

  function HandleMenu() {
    if (establishment && !loading) {
      if (establishment.plan.title === BASIC_PLAN) {
        return <BasicMenu establishment={establishment} loading={loading} />;
      }

      if (establishment.plan.title === STANDARD_PLAN) {
        if (tableNumber) {
          return (
            <TableMenu
              establishment={establishment}
              tableNumber={tableNumber}
              loading={loading}
            />
          );
        }

        return <DeliveryMenu establishment={establishment} loading={loading} />;
      }
    } else {
      return <LoadingScreen />;
    }
  }

  return <HandleMenu />;
}
