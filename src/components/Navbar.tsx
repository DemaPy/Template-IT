import { ROUTES } from "@/constance/routes";
import { useAuth } from "@/store/login";
import { Link, useNavigate } from "react-router-dom";
import NavItem from "./NavItem";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Menu } from "lucide-react";
import Flex from "./Layout/Flex";
import Title from "./Title";
import { useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const { isLogged, setIsLoggedOut } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedOut();
    navigate("/");
  };

  return (
    <>
      {isLogged && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant={"default"} size={"sm"}>
              <Menu className="w-4 h-4" /> Menu
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-md">
            <DialogTitle className="hidden"></DialogTitle>
            <Flex direction="col" align="start" justify="between">
              <Title size="md" title="Navigation" />
              <ol className="flex flex-col gap-2">
                {ROUTES.map((item) => (
                  <li key={item.path} onClick={() => setIsOpen(false)}>
                    <NavItem route={item} />
                  </li>
                ))}
              </ol>
            </Flex>
            <Flex direction="col" align="start" justify="between">
              <Title size="md" title="Account" />
              <Button onClick={handleLogout} variant={"outline"} size={"sm"}>
                Logout
              </Button>
            </Flex>
          </DialogContent>
        </Dialog>
      )}
      {!isLogged && (
        <Button variant={"outline"} size={"sm"} asChild>
          <Link to={"/login"}>Login</Link>
        </Button>
      )}
    </>
  );
};
