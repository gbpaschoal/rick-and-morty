import { Header } from "./components/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { NavFooter } from "./components/NavFooter";

export function App() {
  return (
    <div className="relative">
      <Header />
      <main className="my-16 px-2">
        <ScrollRestoration />
        <Outlet />
      </main>
      <NavFooter />
    </div>
  );
}
