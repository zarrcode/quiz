import type { NextPage } from 'next';
import NavbarItem from './components/navbarItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const Navbar: NextPage = () => (
    <div className="navbar">
      <NavbarItem text="Rules" icon={faBook} url="/rules" />
      <NavbarItem text="Home"  icon={faHouseUser} url="/" />
      <NavbarItem text="Quiz" icon={faCheck} url="/quiz" />
    </div>
);

export default Navbar;
