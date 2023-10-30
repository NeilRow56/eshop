'use client'

import moment from 'moment'
import Heading from '../Heading'
import { Rating } from '@mui/material'
import Avatar from '../Avatar'

interface ListRatingProps {
  product: any
}

const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  return (
    <div className="">
      <Heading title="Product Reviews" />
      <div className=" mt-2 text-sm">
        {product.reviews &&
          product.reviews.map((review: any) => {
            return (
              <div key={review.id} className="max-w-[300px]">
                <div className="flex items-center gap-2">
                  <Avatar src={review?.user.image} />
                  <div className=" font-semibold">{review.user.name}</div>
                  <div className=" font-light">
                    {moment(review.createdDate).fromNow()}
                  </div>
                </div>
                <div className="mt-2">
                  <Rating value={review.rating} readOnly />
                  <div className="ml-2">{review.comment}</div>
                  <hr className="mb-4 mt-4" />
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default ListRating
