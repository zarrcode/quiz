import type { NextPage } from 'next'
import NavbarItem from './components/navbarItem'

const Navbar: NextPage = () => {

  return (
    <div className="navbar">
      <NavbarItem  text="Rules" url="/rules"  />
      <NavbarItem  text="Home"  url="/" />
      <NavbarItem  text="Quiz" url="/quiz"  />
    </div>
  )
}

export default Navbar