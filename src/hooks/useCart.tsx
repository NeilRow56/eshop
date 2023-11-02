'use client'

import { CartProductType } from '@/components/products/ProductDetails'
import { toast } from 'react-hot-toast'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

type CartContextType = {
  cartTotalQty: number
  cartProducts: CartProductType[] | null
  handleAddProductToCart: (product: CartProductType) => void
  handleRemoveProductFromCart: (product: CartProductType) => void
  handleQtyIncrease: (product: CartProductType) => void
  handleCartQtyDecrease: (product: CartProductType) => void
  handleClearCart: () => void
}

export const CartContext = createContext<CartContextType | null>(null)

interface Props {
  [propName: string]: any
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQTY] = useState(0)
  const [cartTotalAmount, setCartTotalAmount] = useState(0)
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  )

  useEffect(() => {
    const cartItems: any = localStorage.getItem('eShopCartItems')
    const cProducts: CartProductType[] | null = JSON.parse(cartItems)

    setCartProducts(cProducts)
  }, [])

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity

            acc.total = acc.total + itemTotal
            acc.qty = acc.qty + item.quantity

            return acc
          },
          { total: 0, qty: 0 }
        )

        setCartTotalQTY(qty)
        setCartTotalAmount(total)
      }
    }
    getTotals()
  }, [cartProducts])

  console.log('qty', cartTotalQty)
  console.log('amount', cartTotalAmount)

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart

      if (prev) {
        updatedCart = [...prev, product]
      } else {
        updatedCart = [product]
      }

      localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
      return updatedCart
    })
  }, [])

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter((item) => {
          return item.id !== product.id
        })

        setCartProducts(filteredProducts)
        toast.success('Product removed')
        localStorage.setItem('eShopCartItems', JSON.stringify(filteredProducts))
      }
    },
    [cartProducts]
  )

  const handleQtyIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart

      if (product.quantity === 99) {
        return toast.error('Oops! Maximimun reached')
      }

      if (cartProducts) {
        updatedCart = [...cartProducts]

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        )

        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = ++updatedCart[existingIndex]
            .quantity
        }

        setCartProducts(updatedCart)

        localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
      }
    },
    [cartProducts]
  )

  const handleCartQtyDecrease = useCallback(
    (product: CartProductType) => {
      let updatedCart

      if (product.quantity === 1) {
        return toast.error('Ooops! Minimum reached')
      }

      if (cartProducts) {
        updatedCart = [...cartProducts]

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        )

        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = --updatedCart[existingIndex]
            .quantity
        }

        setCartProducts(updatedCart)

        localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
      }
    },
    [cartProducts]
  )

  const handleClearCart = useCallback(() => {
    setCartProducts(null)
    setCartTotalQTY(0)

    localStorage.setItem('eShopCartItems', JSON.stringify(null))
  }, [])

  const value = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
  }
  return <CartContext.Provider value={value} {...props} />
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (context === null) {
    throw new Error(' useCart must be used within a CartContextProvider ')
  }

  return context
}
