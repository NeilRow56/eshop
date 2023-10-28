import Container from '@/components/Container'
import ProductDetails from '@/components/products/ProductDetails'
import { product } from '@/utils/product'

interface Iparams {
  productId?: string
}

const Product = ({ params }: { params: Iparams }) => {
  return (
    <div>
      <Container>
        <ProductDetails product={product} />
      </Container>
    </div>
  )
}

export default Product
