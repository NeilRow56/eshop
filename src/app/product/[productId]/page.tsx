import Container from '@/components/Container'
import ListRating from '@/components/products/ListRating'
import ProductDetails from '@/components/products/ProductDetails'
import { products } from '@/utils/products'

interface Iparams {
  productId?: string
}

const Product = ({ params }: { params: Iparams }) => {
  const product = products.find((item) => item.id === params.productId)
  return (
    <div>
      <Container>
        <ProductDetails product={product} />
        <div className=" mt-20 flex flex-col gap-4">
          <div>Add Rating</div>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  )
}

export default Product
