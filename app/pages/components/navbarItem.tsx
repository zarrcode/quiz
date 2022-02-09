import type { NextPage } from 'next';
import Link from 'next/link';
import { navbarProps } from '../interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMouse } from '@fortawesome/free-solid-svg-icons'





const NavbarItem: NextPage<navbarProps> = ({ icon, text, url }) => (
    <Link href={{ pathname: url }}>
      <div className="navbarItem w-full h-full flex justify-center items-center py-[0.25rem]">
        <div className="w-full h-1/2 flex flex-col items-center justify-center border-x border-black">
          <FontAwesomeIcon className="icons fa-2x" icon={icon} />
          <p className="text-white text-sm" >{text}</p>
        </div>
      </div>
    </Link>
);

export default NavbarItem;
