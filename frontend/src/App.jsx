import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login, Register, Account, Home, ListingDetail, Profile, Places, BookingsPage, Bookingpage } from "./pages";
import Layout from "./Layout";
import axios from "axios";
import { UserContextProvider } from "./Context/Usercontext";
import Formpage from "./pages/Account/AccountComps/Formpage";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/account/booking" element={<BookingsPage />} />
          <Route path="/account/booking/:id" element={<Bookingpage />} />
          <Route path="/account/places" element={<Places />} />
          <Route path="/account/places/new" element={<Formpage />} />
          <Route path="/account/places/:id" element={<Formpage />} />
          <Route path="/account/:subpage/:action" element={<Account />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
