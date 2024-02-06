import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Login,
  Register,
  Account,
  Home,
  ListingDetail,
  Profile,
  Places,
  BookingsPage,
  Bookingpage,
  Notfound
} from "./pages";

import Layout from "./Layout";
import axios from "axios";
import userContext from "./Context/Usercontext";
import Formpage from "./pages/Account/AccountComps/Formpage";
import { useContext } from "react";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  const {user} = useContext(userContext)
  return (
        <Routes>
          <Route path={"/"} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/listings/:id" element={<ListingDetail />} />
            <Route path="/account" element={user ? <Profile/>: <Navigate to={"/login"}/>} />
            <Route path="/account/booking" element={user ? <BookingsPage/>: <Navigate to={"/login"}/>} />
            <Route path="/account/booking/:id" element={user ? <Bookingpage /> : <Navigate to={"/login"}/> } />
            <Route path="/account/places" element={user ? <Places />: <Navigate to={"/login"}/>} />
            <Route path="/account/places/new" element={user ? <Formpage />: <Navigate to={"/login"}/>} />
            <Route path="/account/places/:id" element={user ? <Formpage />: <Navigate to={"/login"}/>} />
            <Route path="/account/:subpage/:action" element={user ? <Account />: <Navigate to={"/login"}/>} />
            <Route path= "*" element={<Notfound/>}/>
          </Route>
        </Routes>
      
  );
}

export default App;
