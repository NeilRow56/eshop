import Container from '@/components/Container'
import HomeBanner from '@/components/nav/HomeBanner'
import { products } from '@/utils/products'
import { truncateText } from '@/utils/truncateText'

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
            return <div>{truncateText(product.name)}</div>
          })}
        </div>
      </Container>
    </div>
  )
}
