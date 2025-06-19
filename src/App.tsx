import { Header } from "./components/Header";
import { Outlet } from "react-router-dom";
import NavFooter from "./components/NavFooter";

export default function App() {
  return (
    <div className="w-full px-2">
      <Header />
      <div className="my-20">
        <Outlet />
        <NavFooter />
      </div>
    </div>
  );
}
