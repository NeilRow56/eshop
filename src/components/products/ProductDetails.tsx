'use client'

import { Rating } from '@mui/material'
import { useCallback, useState } from 'react'
import SetColor from './SetColor'

interface ProductDetailsProps {
  product: any
}

export type CartProductType = {
  id: string
  name: string
  description: string
  catergory: string
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
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    catergory: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  })
  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length

  console.log(cartProduct)

  const plural = product.reviews.length > 1 ? 's' : ''

  const inStock = product.inStock ? 'In stock' : 'Out of stock'

  const handleColorSelect = useCallback((value: SelectedImgType) => {
    setCartProduct((prev) => {
      return { ...prev, selectedImg: value }
    })
  }, [])

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
      <div>Images</div>
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
        <SetColor
          cartProduct={cartProduct}
          images={product.images}
          handleColorSelect={handleColorSelect}
        />
        <Horizontal />
        <div>Quantity</div>
        <Horizontal />
        <div>Add to cart</div>
      </div>
    </div>
  )
}

export default ProductDetails
