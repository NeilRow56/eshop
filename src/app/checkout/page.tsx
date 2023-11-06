import FormWrap from '@/components/FormWrap'
import CheckOutClient from './CheckOutClient'
import Container from '@/components/Container'

const Checkout = () => {
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <CheckOutClient />
        </FormWrap>
      </Container>
    </div>
  )
}

export default Checkout
