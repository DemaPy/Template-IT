import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/login";
import { Button } from "./ui/button";
import { ROUTES } from "@/constance/routes";
import NavItem from "./NavItem";


const Nav = () => {
    const navigate = useNavigate()
    const { isLogged, setIsLoggedOut } = useAuth()

    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsLoggedOut()
        navigate('/')
    }

    return (
        <nav className="flex items-center justify-between p-4">
            <p className="text-2xl font-bold">
                <Link to={"/"}>Template It</Link>
            </p>
            {isLogged && (
                <ol className="flex items-center gap-2">
                    {
                        ROUTES.map(item => <NavItem key={item.path} route={item} />)
                    }
                    <Button onClick={handleLogout} variant={"outline"} size={"sm"}>Logout</Button>
                </ol>
            )}
            {
                !isLogged && (
                    <Button variant={"outline"} size={"sm"} asChild>
                        <Link to={'/login'}>Login</Link>
                    </Button>
                )
            }
        </nav >
    );
};

export default Nav;
