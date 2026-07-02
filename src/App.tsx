import { Outlet, ScrollRestoration } from "react-router";
import { Header } from "./components/Header";
import { NavBar } from "./components/NavBar";

export function App() {
  return (
    <div className="px-2">
      <Header />
      <main className="my-16">
        <ScrollRestoration />

        <Outlet />
      </main>
      <NavBar />
    </div>
  );
}
