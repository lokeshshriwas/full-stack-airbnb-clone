import React, { useContext, useState } from "react";
import userContext from "../../Context/Usercontext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { Profile, Places} from "./AccountComps";
import icons from "../../assets/icons/icons";


const Account = () => {
  const { user, ready, setUser } = useContext(userContext);
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  // logout functionality

  async function handleLogout() {
    await axios.post("/logout");
    setUser(null);
    setRedirect("/");
  }

  if (!ready) return <div>loading...</div>;

  // redirect to login page if no user and ready=true and redirect=null

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  // defining the active route styling
  function linkClasses(type = null) {
    let classes = "py-2 px-6 inline-flex gap-2";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    } else{
      classes += " bg-gray-200 text-black rounded-full"
    }
    return classes;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
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
      {subpage === "profile" && (
        <Profile user={user} handleLogout={handleLogout}/>
      )}
      {subpage === "places" && (
        <Places/>
      )}
    </div>
  );
};

export default Account;
