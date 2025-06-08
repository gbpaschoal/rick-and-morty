import Header from "./components/Header";
import * as Router from "react-router-dom";
import NavFooter from "./components/NavFooter";
import { SearchPortal } from "./components/Search";

export default function App() {
  return (
    <div className="w-full px-4 max-sm:px-3">
      <SearchPortal />
      <Header />
      <div className="my-24">
        <Router.Outlet />
      </div>

      <NavFooter />
    </div>
  );
}
