import React from "react";
import icons from "../../../assets/icons/icons";
import { Link, useLocation } from "react-router-dom";


const AccountNav = () => {

    const {pathname }= useLocation()
    let subpage = pathname.split("/")?.[2]
    if(subpage === undefined){
        subpage = "profile";
    }

  function linkClasses(type = null) {
    let classes = "py-2 px-6 inline-flex gap-2";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    } else {
      classes += " bg-gray-200 text-black rounded-full";
    }
    return classes;
  }

  return (
    <nav className="w-full flex justify-center items-center mt-8 gap-2">
      <Link to={"/account"} className={linkClasses("profile")}>
        {icons.accountProfile}
        My Profile
      </Link>
      <Link to={"/account/booking"} className={linkClasses("booking")}>
        {icons.bookings}
        My bookings
      </Link>
      <Link to={"/account/places"} className={linkClasses("places")}>
        {icons.places}
        My accommodations
      </Link>
    </nav>
  );
};

export default AccountNav;
