'use client'

import { formatPrice } from '@/utils/formatPrice'
import { CartProductType } from '../products/ProductDetails'
import Link from 'next/link'
import { truncateText } from '@/utils/truncateText'

import Image from 'next/image'
import SetQuantity from '../products/SetQuantity'

interface ItemContentProps {
  item: CartProductType
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  return (
    <div className="grid grid-cols-5 items-center gap-4 border-t-[1.5px] border-slate-200 py-4 text-xs md:text-sm">
      <div className="col-span-2 flex gap-2 justify-self-start md:gap-4">
        <Link href={`/product/${item.id}`}>
          <div className="relative aspect-square w-[70px]">
            <Image
              src={item.selectedImg.image}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`}>{truncateText(item.name)}</Link>
          <div>{item.selectedImg.color}</div>
          <div className="w=[70px]">
            <button onClick={() => {}} className="text-slate-500 underline">
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center">
        <SetQuantity
          cartCounter={true}
          cartProduct={item}
          handleQuantityIncrease={() => {}}
          handleQuantityDecrease={() => {}}
        />
      </div>
      <div className="justify-self-end font-semibold">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  )
}

export default ItemContent
