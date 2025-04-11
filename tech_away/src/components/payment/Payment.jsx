import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import api from '../../utils/axios';
import PaymentForm from './PaymentForm';

export default function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (!stripePromise) {
      api.get('/api/payment/config').then(async (r) => {
        const { publishableKey } = await r.data;

        
        const stripe = await loadStripe(publishableKey);
        setStripePromise(stripe);
      });
    }

    api.post('/api/payment/create-payment-intent').then(async (r) => {
      const { clientSecret } = await r.data;
      setClientSecret(clientSecret);
    });
  }, [stripePromise]);

  return (
    <>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm />
        </Elements>
      )}
    </>
  );
}
