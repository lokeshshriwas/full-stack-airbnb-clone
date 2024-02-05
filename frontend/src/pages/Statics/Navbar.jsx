import React, { useContext } from "react";
import icons from "../../assets/icons/icons";
import { Link } from "react-router-dom";
import userContext from "../../Context/Usercontext";

const Navbar = () => {
  const { user } = useContext(userContext);
  return (
    <header className="flex justify-between">
      <a href="/" className="flex items-center gap-1 max-[380px]:hidden">
        {icons.logo}
        <span className="font-bold text-xl max-[630px]:hidden">Skystay</span>
      </a>
      <div className="flex border border-gray-300 rounded-full py-2 px-4 gap-2 shadow-md shadow-gray-300 max-[500px]:hidden">
        <a href={"/"}>
          <div>Anywhere</div>
        </a>
        <div className="border-l border-gray-300"></div>
        <div>Any week</div>
        <div className="border-l border-gray-300"></div>
        <div className="text-gray-500 ">Add guests</div>
        <button className="bg-primary text-white p-1 rounded-full">
          {icons.search}
        </button>
      </div>
      <div className="flex items-center min-[500px]:hidden ">
        <input
          type="text"
          className="py-1 px-1 min-[300px]:px-2 rounded-full border text-sm"
          placeholder="Find your destination"
        />
        <div className="bg-primary py-1 px-1 rounded-full text-white ml-0 min-[300px]:ml-2">
          {icons.search}
        </div>
      </div>
      <div className="flex items-center border border-gray-300 rounded-full py-1 px-2 md:py-2 md:px-4 gap-2 overflow-hidden text-xs md:text-md">
        {icons.hamburger}
        {!user && (
          <Link
            to={"/login"}
            className="bg-gray-500 rounded-full border border-gray-500  max-[350px]:text-xs"
          >
            {icons.profile}
          </Link>
        )}
        {!!user && (
          <Link to={"/account"}>
            <div className="text-sm max-[350px]:text-xs">{user.username}</div>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
