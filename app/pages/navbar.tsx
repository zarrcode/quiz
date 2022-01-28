import type { NextPage } from 'next'
import NavbarItem from './components/navbarItem'

const Navbar: NextPage = () => {

  return (
    <div className="navbar">
      <NavbarItem  text="rules! :D"  />
      <NavbarItem  text="Home! :D"  />
      <NavbarItem  text="Quiz! :D"  />
    </div>
  )
}

export default Navbar
