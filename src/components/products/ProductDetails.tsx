'use client'

import { Rating } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import SetColor from './SetColor'
import SetQuantity from './SetQuantity'
import Button from '../Button'
import ProductImage from './ProductImage'
import { useCart } from '@/hooks/useCart'
import { MdCheckCircle } from 'react-icons/md'
import { useRouter } from 'next/navigation'

interface ProductDetailsProps {
  product: any
}

export type CartProductType = {
  id: string
  name: string
  description: string
  category: string
  brand: string
  selectedImg: SelectedImgType
  quantity: number
  price: number
}

export type SelectedImgType = {
  color: string
  colorCode: string
  image: string
}

const Horizontal = () => {
  return (
    <hr className="my-2 h-px w-[30%] border-0 bg-gray-200 dark:bg-gray-700"></hr>
  )
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart()
  const [isProductInCart, setIsProductInCart] = useState(false)

  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  })

  const router = useRouter()

  console.log(cartProducts)

  useEffect(() => {
    setIsProductInCart(false)

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      )

      if (existingIndex > -1) {
        setIsProductInCart(true)
      }
    }
  }, [cartProducts, product.id])

  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length

  const plural = product.reviews.length > 1 ? 's' : ''

  const inStock = product.inStock ? 'In stock' : 'Out of stock'

  const handleColorSelect = useCallback((value: SelectedImgType) => {
    setCartProduct((prev) => {
      return { ...prev, selectedImg: value }
    })
  }, [])

  const handleQuantityIncrease = useCallback(() => {
    if (cartProduct.quantity === 99) {
      return
    }

    setCartProduct((prev) => {
      return { ...prev, quantity: 1 + prev.quantity }
    })
  }, [cartProduct.quantity])

  const handleQuantityDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return
    }

    setCartProduct((prev) => {
      return { ...prev, quantity: -1 + prev.quantity }
    })
  }, [cartProduct.quantity])

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />
      <div className="flex flex-col gap-1 text-sm text-slate-500">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>

        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div className="">
            {product.reviews.length}

            <span className="px-1">review{plural}</span>
          </div>
        </div>
        <Horizontal />
        <div className="pr-2  text-justify">{product.description}</div>

        <Horizontal />
        <div>
          <span className="mr-1 font-semibold">CATEGORY:</span>
          {product.category}
        </div>
        <div>
          <span className="mr-1 font-semibold">BRAND:</span>
          {product.brand}
        </div>
        <div
          className={
            product.inStock
              ? 'font-semibold text-teal-400 '
              : 'font-semibold text-rose-400'
          }
        >
          {product.inStock ? 'In stock' : 'Out of stock'}
        </div>
        <Horizontal />
        {isProductInCart ? (
          <>
            <p className="mb-2 flex items-center gap-1 text-slate-500">
              <MdCheckCircle className="text-teal-400" size={20} />
              <span>Product added to cart</span>
            </p>
            <div className="max-w-[300px]">
              <Button
                label="View Cart"
                outline
                onClick={() => router.push('/cart')}
              ></Button>
            </div>
          </>
        ) : (
          <>
            <SetColor
              cartProduct={cartProduct}
              images={product.images}
              handleColorSelect={handleColorSelect}
            />
            <Horizontal />
            <SetQuantity
              cartProduct={cartProduct}
              handleQuantityDecrease={handleQuantityDecrease}
              handleQuantityIncrease={handleQuantityIncrease}
            />
            <Horizontal />
            <div className="max-w-[300px]">
              <Button
                label="Add to Cart"
                onClick={() => handleAddProductToCart(cartProduct)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductDetails
