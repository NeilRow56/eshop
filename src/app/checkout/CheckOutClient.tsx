'use client'

import { useCart } from '@/hooks/useCart'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const CheckOutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart()
  const [loading, setIsloading] = useState(false)
  const [error, setError] = useState(false)
  const [clientSecret, setClientSecret] = useState('')

  const router = useRouter()

  console.log('paymentIntent', paymentIntent)
  console.log('clientSecret', clientSecret)

  useEffect(() => {
    // create a paymentIntent as soon as the page loads
    if (cartProducts) {
      setIsloading(true)
      setError(false)

      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((response) => {
          setIsloading(false)
          if (response.status === 101) {
            return router.push('/login')
          }

          return response.json()
        })
        .then((data) => {
          setClientSecret(data.paymentIntent.client_secret)
          handleSetPaymentIntent(data.paymentIntent.id)
        })
        .catch(() => {
          setError(true)
          toast.error('Something went wrong')
        })
    }
  }, [cartProducts, paymentIntent, router, handleSetPaymentIntent])
  return <div>Checkout Client</div>
}

export default CheckOutClient
