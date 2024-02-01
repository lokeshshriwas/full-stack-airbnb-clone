import React, { useContext } from "react";
import icons from "../../assets/icons/icons";
import { Link } from "react-router-dom";
import userContext from "../../Context/Usercontext";

const Navbar = () => {
  const { user } = useContext(userContext);
  return (
    <header className="flex justify-between">
      <a href="" className="flex items-center gap-1">
        {icons.logo}
        <span className="font-bold text-xl">Skystay</span>
      </a>
      <div className="flex border border-gray-300 rounded-full py-2 px-4 gap-2 shadow-md shadow-gray-300 ">
        <div>Anywhere</div>
        <div className="border-l border-gray-300"></div>
        <div>Any week</div>
        <div className="border-l border-gray-300"></div>
        <div className="text-gray-500 ">Add guests</div>
        <button className="bg-primary text-white p-1 rounded-full">
          {icons.search}
        </button>
      </div>
      <div className="flex border border-gray-300 rounded-full py-2 px-4 gap-2 overflow-hidden">
        {icons.hamburger}
        <Link
          to={"/login"}
          className="bg-gray-500 rounded-full border border-gray-500"
        >
          {icons.profile}
        </Link>
        {!!user && (
          <Link to={"/account"}>
            <div>{user.username}</div>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
