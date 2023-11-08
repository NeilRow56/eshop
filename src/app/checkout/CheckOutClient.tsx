'use client'

import { useCart } from '@/hooks/useCart'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import Button from '@/components/Button'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
)

const CheckOutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart()
  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [clientSecret, setClientSecret] = useState('')
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const router = useRouter()

  useEffect(() => {
    // create a paymentIntent as soon as the page loads
    if (cartProducts) {
      setIsLoading(true)
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
          setIsLoading(false)
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

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      labels: 'floating',
    },
  }

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value)
  }, [])

  return (
    <div className="w-full">
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handleSetPaymentSuccess}
          />
        </Elements>
      )}
      {loading && <div className="text-center">Loading Checkout</div>}
      {error && (
        <div className="text-center text-rose-400">Something went wrong!</div>
      )}
      {paymentSuccess && (
        <div className="flex flex-col items-center gap-4">
          <div className="text-center text-teal-500">Payment Success</div>
          <div className="w-full max-w-[220px]">
            <Button
              label="View YourOrders"
              onClick={() => router.push('/orders')}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckOutClient
