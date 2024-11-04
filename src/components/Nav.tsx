import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Nav = () => {
  return (
    <nav className="flex items-center justify-between p-2 md:p-6">
      <p className="text-2xl font-bold">
        <Link to={"/"}>Template It</Link>
      </p>
      <Navbar />
    </nav>
  );
};
