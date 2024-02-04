import React, { useContext, useState } from "react";
import userContext from "../../Context/Usercontext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { Profile, Places} from "./AccountComps";
import AccountNav from "./AccountComps/AccountNav";


const Account = () => {
  const { user, ready, setUser } = useContext(userContext);
  const [redirect, setRedirect] = useState(null);


  if (!ready) return <div>loading...</div>;

  // redirect to login page if no user and ready=true and redirect=null

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  // defining the active route styling


  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav/>
    </div>
  );
};

export default Account;
