import { Header } from "./components/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { NavFooter } from "./components/NavFooter";

export default function App() {
  return (
    <div className="px-2">
      <Header />
      <div className="my-16">
        <ScrollRestoration />
        <Outlet />
      </div>
      <NavFooter />
    </div>
  );
}
