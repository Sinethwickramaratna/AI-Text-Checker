import { Outlet } from "react-router-dom";
import NavBar from "./navbar.jsx";
import Footer from "./footer";

export default function Layout() {
  return(
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}