import Link from 'next/link'
import Container from '../Container'
import FooterList from './FooterList'
import { MdFacebook } from 'react-icons/md'
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillYoutube,
} from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className="mt-16 bg-slate-700 text-sm text-slate-200 ">
      <Container>
        <div className=" flex flex-col justify-between pb-8 pt-16 md:flex-row ">
          <FooterList>
            <h3 className="text-bold mb-2 text-base">Shop Categories</h3>
            <Link href="\phones">Phones</Link>
            <Link href="\laptops">Laptops</Link>
            <Link href="\desktops">Desktops</Link>
            <Link href="\watches">Watches</Link>
            <Link href="\tvs">TVs</Link>
            <Link href="\accessories">Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-bold mb-2 text-base">Customer Services</h3>
            <Link href="\phones">Contact Us</Link>
            <Link href="\laptops">Shipping Policy</Link>
            <Link href="\desktops">Returns & Exchanges</Link>
            <Link href="\watches">Warranties</Link>
            <Link href="\tvs">FAQs</Link>
            <Link href="\accessories">Accessories</Link>
          </FooterList>
          <div className="mb-6 w-full md:mb-0 md:w-1/3">
            <h3 className="text-bold mb-2 text-base">About Us</h3>
            <p className="mb-2">
              At our electronics store we are dedicated to providing the latest
              and greatest devices and accessories to our customers. With a wide
              selection of phones, laptops, desktops, watches and accessories.
            </p>
            <p>
              &#169; {new Date().getFullYear()} E-Shop. All rights reserved.
            </p>
          </div>
          <FooterList>
            <h3 className="text-bold mb-2 text-base">Follow Us</h3>
            <div className="flex gap-2">
              <Link href="\accessories">
                <MdFacebook size={24} />
              </Link>
              <Link href="\accessories">
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href="\accessories">
                <AiFillInstagram size={24} />
              </Link>
              <Link href="\accessories">
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
