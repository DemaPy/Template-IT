import { Nav } from "../components/Nav";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const WithNavBar = () => {
  return (
    <main className="h-full flex flex-col">
      <div className="border-b fixed top-0 left-0 right-0 filter backdrop-blur-md z-50 bg-white">
        <Nav />
      </div>
      <Outlet />
      <Toaster />
    </main>
  );
};

export default WithNavBar;
