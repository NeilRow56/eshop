'use client'

import { truncateText } from '@/utils/truncateText'
import Image from 'next/image'
import { formatPrice } from '@/utils/formatPrice'
import { Rating } from '@mui/material'
import { useRouter } from 'next/navigation'

interface ProcuctCardProps {
  data: any
}

const ProductCard: React.FC<ProcuctCardProps> = ({ data }) => {
  const router = useRouter()

  const productRating =
    data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    data.reviews.length
  return (
    <div
      onClick={() => router.push(`product/${data.id}`)}
      className="
    dorder-slate-200
    col-span-1
    cursor-pointer
    rounded-lg
    border-[1.2px]
    bg-slate-50
    p-2
    text-center
    text-sm
    transition
    hover:scale-105

    "
    >
      <div
        className="
      flex
      w-full
      flex-col
      items-center
      gap-1
      "
      >
        <div className="relative block aspect-square w-full overflow-hidden">
          <Image
            fill
            src={data.images[0].image}
            sizes="(min-width: 808px) 50vw, 100vw"
            alt={data.name}
            className="h-full w-full object-contain"
          />
        </div>
        <div>
          <p>{truncateText(data.name)}</p>
        </div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>{data.reviews.length} reviews</div>

        <div className="font-semibold">{formatPrice(data.price)}</div>
      </div>
    </div>
  )
}

export default ProductCard
