import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login, Register, Account } from "./pages";
import Layout from "./Layout";
import axios from "axios";
import { UserContextProvider } from "./Context/Usercontext";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/:subpage" element={<Account />} />
          <Route path="/account/:subpage/:action" element={<Account />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
