import type { NextPage } from 'next'
import { NavbarProps } from '../interfaces'

const NavbarItem: NextPage<NavbarProps> = ({text}) => {
  return (
    <div>
      <p className="text-green-500" >{text}</p>
    </div>
  )
}

export default NavbarItem
