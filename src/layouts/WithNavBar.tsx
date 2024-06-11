import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";

const WithNavBar = () => {
  return (
    <main className="container max-w-screen-2xl mx-auto md:px-6 px-2 h-full flex flex-col">
      <Nav />
      <Outlet />
    </main>
  );
};

export default WithNavBar;
