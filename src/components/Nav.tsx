import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../store/login";
import { Button } from "./ui/button";

const Nav = () => {
    const navigate = useNavigate()
    const { isLogged, setIsLoggedOut } = useAuth()
    const location = useLocation()

    // const requestToExtension = () => {
    //     // The ID of the extension we want to talk to.
    //     var editorExtensionId = "jpncjjhjgbbjlglddfjeldbeojhbimmk";

    //     // Make a simple request:
    //     chrome.runtime.sendMessage(editorExtensionId, { name: "Dema", id: 385843 }, (response) => {
    //         console.log(response);
    //     })
    // }

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
                    <Link to={'/templates'}>
                        <li style={{ background: location.pathname.includes('/templates') ? "#a78bfa" : "#ffffff", color: location.pathname.includes("/templates") ? "#ffffff" : "#a78bfa" }} className="font-semibold text-sm rounded-md border-2 border-violet-300 cursor-pointer px-3 py-2 transition text-violet-400">
                            Templates
                        </li>
                    </Link>
                    <Link to={'/campaigns'}>
                        <li style={{ background: location.pathname.includes("/campaigns") ? "#a78bfa" : "#ffffff", color: location.pathname.includes("/campaigns") ? "#ffffff" : "#a78bfa" }} className="font-semibold text-sm rounded-md border-2 border-violet-300 cursor-pointer px-3 py-2 transition text-violet-400">
                            Campaigns
                        </li>
                    </Link>
                    <Link to={'/components'}>
                        <li style={{ background: location.pathname.includes("/components") ? "#a78bfa" : "#ffffff", color: location.pathname.includes("/components") ? "#ffffff" : "#a78bfa" }} className="font-semibold text-sm rounded-md border-2 border-violet-300 cursor-pointer px-3 py-2 transition text-violet-400">
                            Components
                        </li>
                    </Link>
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
