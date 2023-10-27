import Container from '@/components/Container'
import HomeBanner from '@/components/nav/HomeBanner'
import ProductCard from '@/components/products/ProductCard'
import { products } from '@/utils/products'

export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {products.map((product: any) => {
            // eslint-disable-next-line react/jsx-key
            return <ProductCard data={product} />
          })}
        </div>
      </Container>
    </div>
  )
}
