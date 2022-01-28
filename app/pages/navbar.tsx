import type { NextPage } from 'next'
import NavbarItem from './components/navbarItem'

const Navbar: NextPage = () => {

  return (
    <div className="navbar">
      <NavbarItem  text="rules"  />
      <NavbarItem  text="Home"  />
      <NavbarItem  text="Quiz"  />
    </div>
  )
}

export default Navbar
