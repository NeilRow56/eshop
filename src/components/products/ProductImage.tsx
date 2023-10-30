'use client'

import Image from 'next/image'
import { CartProductType, SelectedImgType } from './ProductDetails'

interface ProductImageProps {
  cartProduct: CartProductType
  product: any
  handleColorSelect: (value: SelectedImgType) => void
}

const ProductImage: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div className="grid h-full max-h-[500px] min-h-[300px] grid-cols-6 gap-2 sm:min-h-[300px]">
      <div className="flex h-full max-h-[500pxm] min-h-[300px] cursor-pointer flex-col items-center justify-center gap-4 border sm:min-h-[300px] sm:pb-24">
        {product.images.map((image: SelectedImgType) => {
          return (
            <div
              key={image.color}
              onClick={() => handleColorSelect(image)}
              className={`relative aspect-square w-[80%] rounded border-teal-300 ${
                cartProduct.selectedImg.color === image.color
                  ? 'border-[1.5px]'
                  : 'border-none'
              }`}
            >
              <Image
                src={image.image}
                alt={image.color}
                fill
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                className="object-contain"
              />
            </div>
          )
        })}
      </div>
      <div className="relative col-span-5 aspect-square w-[80%]  ">
        <Image
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          src={cartProduct.selectedImg.image}
          alt={cartProduct.name}
          className=" h-full max-h-[500px] min-h-[300px] w-full gap-4 object-contain sm:min-h-[400px]"
        />
      </div>
    </div>
  )
}

export default ProductImage
