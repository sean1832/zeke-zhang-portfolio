import { useContext } from "react";
import { navLinks } from "../constants";
import { CursorContext } from "../util";

const Navbar = () => {
  const { updateCursorVariant } = useContext(CursorContext);

  return (
    <nav className="w-full flex justify-between py-6 items-top navbar">
      <h1
        className=" text-white text-[28px]"
        onMouseEnter={() => updateCursorVariant("hover")}
        onMouseLeave={() => updateCursorVariant("default")}
      >
        <a href="#home">ZZ</a>
      </h1>

      <ul
        className="list-none sm:flex hidden justify-end items-center flex-1"
        onMouseEnter={() => updateCursorVariant("hover")}
        onMouseLeave={() => updateCursorVariant("default")}
      >
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-white text-[16px]
          ${index === navLinks.length - 1 ? `mr-0` : `mr-10`}`}
          >
            {/* if last element, remove margin right */}
            <a href={`#${nav.id}`}>{nav.name}</a>
          </li>
        ))}
      </ul>

      {/* Mobile Nav */}
      <div className="sm:hidden flex items-center justify-end">
        <ul className="list-none flex flex-col justify-end items-end flex-1">
          {navLinks.map((nav, index) => (
            <li
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-white text-[16px]
            ${index === navLinks.length - 1 ? `mb-0` : `mb-3`}`}
            >
              {/* if last element, remove margin right */}
              <a href={`#${nav.id}`}>{nav.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
