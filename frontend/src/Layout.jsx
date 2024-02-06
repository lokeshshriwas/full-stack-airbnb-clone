import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "./pages";


const Layout = () => {
  return (
    <div className="py-4 px-2 sm:p-4 overflow-hidden">
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout