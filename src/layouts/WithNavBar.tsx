import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";

const WithNavBar = () => {

  return (
    <main className="relative">
      <div className="border-b absolute top-0 left-0 right-0 filter backdrop-blur-md">
        <Nav />
      </div>
      <div className="container max-w-screen-2xl mx-auto md:px-6 px-2 h-full">
        <Outlet />
      </div>
    </main>
  );
};

export default WithNavBar;
