import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div
        className="flex flex-row justify-around mt-5  w-[60%] lg:place-content-center lg:gap-10 
                    absolute left-1/2 transform -translate-x-1/2 top-0 
                    sm:top-0 md:top-0 "
      >
        <NavLink className="text-lg sm:text-xl md:text-2xl  font-semibold px-5 py-1  border rounded-md hover:text-white"
          to='/'
        >

          Home
        </NavLink>

        <NavLink className="text-lg sm:text-xl md:text-2xl font-semibold px-5 py-1 border rounded-md hover:text-white"
           to='/pastes'
        >
          Pastes
        </NavLink>
      </div>
    </>
  );
}

export default Navbar;
