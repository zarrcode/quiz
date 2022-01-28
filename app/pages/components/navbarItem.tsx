import type { NextPage } from 'next'
import { textProp } from '../interfaces'

const NavbarItem: NextPage<textProp> = ({text}) => {
  return (
    <div className="navbarItem w-[100%] flex justify-center border-x border-black py-[0.25rem]">
      <p className="text-white text-xl" >{text}</p>
    </div>
  )
}

export default NavbarItem
