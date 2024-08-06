import { Outlet } from "react-router-dom";
import Header from "./Components/Header";

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
