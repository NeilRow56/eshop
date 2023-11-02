import Link from 'next/link'
import Container from '../Container'
import { Redressed } from 'next/font/google'
import CartCount from './CartCount'

const redressed = Redressed({ subsets: ['latin'], weight: ['400'] })

const Navbar = () => {
  return (
    <div className="sticky top-0 z-30 w-full bg-slate-200 shadow-sm ">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex items-center justify-between gap-3  md:gap-0">
            <Link
              href="/"
              className={`${redressed.className} text-2xl font-bold`}
            >
              E-Shop
            </Link>
            <div className="hidden md:block">Search</div>
            <div className="flex items-center gap-8 md:gap-12">
              <div>
                <CartCount />
              </div>
              <div>User Menu</div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
