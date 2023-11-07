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
  const currentUser: any = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()

  const { items, payment_intent_id } = body

  const total = calculatedOrderAmount(items) * 100

  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: 'GBP',
    status: 'pending',
    deliveryStatus: 'pending',
    paymentIntentId: payment_intent_id,
    products: items,
  }

  if (payment_intent_id) {
    //Update order
    const current_intent =
      await stripe.paymentIntents.retrieve(payment_intent_id)

    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: total }
      )

      // update the order

      const [existing_order, update_order] = await Promise.all([
        prisma.order.findFirst({
          where: { paymentIntentId: payment_intent_id },
        }),
        prisma.order.update({
          where: { paymentIntentId: payment_intent_id },
          data: {
            amount: total,
            products: items,
          },
        }),
      ])

      if (!existing_order) {
        return NextResponse.json(
          { error: 'Invalid Payment Intent' },
          { status: 400 }
        )
      }
      return NextResponse.json({ paymentIntent: updated_intent })
    }
  } else {
    // Create the intent

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'GBP',
      automatic_payment_methods: { enabled: true },
    })
    //Create the order
    // orderData.paymentIntentId = paymentIntent.id
    orderData.paymentIntentId = paymentIntent.id

    await prisma.order.create({
      data: orderData,
    })

    return NextResponse.json({ paymentIntent })
  }
}
