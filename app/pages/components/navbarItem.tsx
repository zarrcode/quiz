import type { NextPage } from 'next'
import { navbarProps } from '../interfaces'
import Link from 'next/link'

const NavbarItem: NextPage<navbarProps> = ({text, url}) => {
  return (
    <Link href={{ pathname: url}}>
      <div className="navbarItem w-full h-full flex justify-center items-center py-[0.25rem]">
        <div className="w-full h-1/2 flex flex-col items-center justify-center border-x border-black">
          <p className="text-white fontSizeMedium" >{text}</p>
        </div>
      </div>
    </Link>
  )
}

export default NavbarItem
