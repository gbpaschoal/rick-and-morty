import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import NavFooter from "./components/NavFooter";
import { SearchPortal } from "./components/Search";

export default function App() {
  return (
    <div className="w-full px-2">
      <SearchPortal />
      <Header />
      <div className="my-20">
        <Outlet />
        <NavFooter />
      </div>
    </div>
  );
}
