'use client'

import { useCallback, useState } from 'react'
import Avatar from '../Avatar'
import { AiFillCaretDown } from 'react-icons/ai'
import MenuItem from '@/components/nav/MenuItem'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import BackDrop from './BackDrop'
import { SafeUser } from '../../../types'

interface UserMenuProps {
  currentUser: any
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])
  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className=" flex  cursor-pointer flex-row items-center gap-1 rounded-full border-[1px] border-slate-400 p-2 text-slate-700 transition hover:shadow-md "
        >
          <Avatar />
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div className="absolute right-0 top-12 flex w-[170px] cursor-pointer flex-col overflow-hidden rounded-md bg-white text-sm shadow-md  ">
            {currentUser ? (
              <div>
                <Link href="/orders">
                  <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                </Link>
                <Link href="/admin">
                  <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                </Link>
                <hr />
                <MenuItem
                  onClick={() => {
                    toggleOpen()
                    signOut()
                  }}
                >
                  Logout
                </MenuItem>
              </div>
            ) : (
              <div>
                <Link href="/login">
                  <MenuItem onClick={toggleOpen}>Login</MenuItem>
                </Link>
                <Link href="/register">
                  <MenuItem onClick={toggleOpen}>Register</MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  )
}

export default UserMenu
