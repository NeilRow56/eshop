import { getCurrentUser } from '@/app/actions/getCurrentUser'
import { CartProductType } from '@/components/products/ProductDetails'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
})

const calculatedOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity

    return acc + itemTotal
  }, 0)

  return totalPrice
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()

  const { items, payment_intent_id } = body

  const total = calculatedOrderAmount(items) * 100

  const orderData = {
    user: { connect: { id: currentUser } },
    amount: total,
    currency: 'GBP',
    status: 'pending',
    deliveryStaus: 'pending',
    paymentIntentId: payment_intent_id,
    products: items,
  }

  if (payment_intent_id) {
    //Update order
  } else {
    // Create the intent

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'GBP',
      automatic_payment_methods: { enabled: true },
    })
    //Create the order
  }
}
