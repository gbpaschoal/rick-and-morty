import { Header } from "./components/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { NavFooter } from "./components/NavFooter";

export function App() {
  return (
    <div className="relative px-2">
      <Header />
      <main className="my-16 flex-y">
        <ScrollRestoration />
        <Outlet />
      </main>
      <NavFooter />
    </div>
  );
}
