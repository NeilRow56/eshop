import Container from '@/components/Container'
import ManageProductsClient from './ManageProductsClient'

import { getCurrentUser } from '@/app/actions/getCurrentUser'
import NullData from '@/components/NullData'
import { getProducts } from '@/app/actions/getProducts'

const ManageProducts = async () => {
  const products = await getProducts({ category: null })
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return <NullData title="Oops! Access denied" />
  }
  return (
    <div className="pt-8">
      <Container>
        <ManageProductsClient products={products} />
      </Container>
    </div>
  )
}

export default ManageProducts
